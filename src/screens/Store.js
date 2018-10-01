import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  NativeModules,
  ScrollView,
  Platform
} from 'react-native';
import { ListItem, Divider, Button, Text } from 'react-native-elements'
import NativeButton from 'apsl-react-native-button';
import { connect } from 'react-redux';
import { initHeart, getHeart, updateHeart } from '../actions';
import { SHeader } from '../components';
import * as RNIap from 'react-native-iap';


const itemSkus = Platform.select({
  ios: [
    'com.reactnative.subyeon.heart20',
    'com.reactnative.subyeon.heart50',
    'com.reactnative.subyeon.heart100',
    'com.reactnative.subyeon.heart200',
    'com.reactnative.subyeon.heart500'
  ],
  android: [
    'test.sub1', // subscription
  ],
});

const renderRightButton = (dallars) => {
  return (
    <View
       style={{width:100, height:45, marginRight:15, borderWidth:1,  borderRadius: 10, borderColor: '#74b9ff'
       ,alignItems: 'center', justifyContent: 'center'
    }}>
      <Text style={{fontFamily:'BMHANNA11yrsold',color: '#74b9ff', fontSize: 15}}>US{dallars}$</Text>
      </View>
  )
}


const list = [
  {
    name: '   20 하트',
    element: renderRightButton(2),
    heart: 20
  },
  {
    name: '   50 하트',
    element:renderRightButton(5),
    heart: 50
  },
  {
    name: '   100 하트',
    element: renderRightButton(8),
    heart: 100
  },
  {
    name: '   200 하트',
    element: renderRightButton(14),
    heart: 200
  },
  {
    name: '   500 하트',
    element: renderRightButton(30),
    heart: 500
  },
]


class Store extends Component {


  state = {
    heart: 0,
    error: '',
    productList: [],
    receipt: '',
    availableItemsMessage: '',
  }


  async componentDidMount() {
    try {
    const result = await RNIap.initConnection();
    this.getItems();
    console.log('result', result);
  } catch (err) {
    console.warn(err.code, err.message);
  }


    this.props.initHeart();
    this.setState( () => { this.props.getHeart();});

  }



  componentWillReceiveProps(props) {
    const { error , heart } = props;
    if(heart){
      this.setState({heart: heart});
      console.log(this.props.navigation.state)
    }
  }

  goToNext = () => {
    this.props.navigation.navigate('Second', {
      receipt: this.state.receipt,
    });
  }

  getItems = async() => {
    try {
      const products = await RNIap.getProducts(itemSkus);
      console.log('Products', products);
      this.setState({ productList: products });
    } catch (err) {
      console.warn(err.code, err.message);
    }
  }

  buyItem = async(sku) => {
    try {
      console.info('buyItem: ' + sku);
      // const purchase = await RNIap.buyProduct(sku);
      const purchase = await RNIap.buyProductWithoutFinishTransaction(sku);
      console.info(purchase);
      this.setState({ receipt: purchase.transactionReceipt }, () => this.goToNext());
    } catch (err) {
      console.warn(err.code, err.message);
      Alert.alert(err.message);
    }
  }

  getAvailablePurchases = async() => {
    try {
      console.info('Get available purchases (non-consumable or unconsumed consumable)');
      const purchases = await RNIap.getAvailablePurchases();
      console.info('Available purchases :: ', purchases);
      if (purchases && purchases.length > 0) {
        this.setState({
          availableItemsMessage: `Got ${purchases.length} items.`,
          receipt: purchases[0].transactionReceipt,
        });
      }
    } catch (err) {
      console.warn(err.code, err.message);
      Alert.alert(err.message);
    }
  }

  onButtonBuyHeart = async (heart) => {
    const currentHeart = this.state.heart;
    await this.props.updateHeart(currentHeart + heart);
    await this.props.getHeart();
  }

  render() {
    const { productList, receipt, availableItemsMessage } = this.state;
    return (
      <View style={styles.container}>
        <SHeader
          onLeftPress={()=>this.props.navigation.navigate('StoreStack')}
          onRightPress={()=>this.props.navigation.navigate('MenuStack')}
          heart={this.state.heart}
        />
        <ScrollView>
          <View style={styles.divider}>
            <Text style={{fontFamily:'BMHANNA11yrsold',color:'#FFFFFF',fontSize:17}}>매시지를 보내려면 하트가 필요해요</Text>
          </View>
          {
          list.map((item, i) => (
          <ListItem
            key={i}
            leftIcon={{type:'font-awesome', name: 'heart', color:'#74b9ff'}}
            title={item.name}
            titleStyle={{fontFamily:'BMHANNA11yrsold',fontSize: 17}}
            containerStyle={{paddingTop: 20, paddingBottom: 20, paddingLeft:10, borderBottomColor: '#dfe6e9'}}
            badge={{ element: item.element }}
            hideChevron
            onPress={async () => {this.onButtonBuyHeart(item.heart)}}
          />
        ))
        }

        <NativeButton
              onPress={() => this.getItems()}
              activeOpacity={0.5}
              style={styles.btn}
              textStyle={styles.txt}
            >Get Products ({productList.length})</NativeButton>
            {
              productList.map((product, i) => {
                return (
                  <View key={i} style={{
                    flexDirection: 'column',
                  }}>
                    <Text style={{
                      marginTop: 20,
                      fontSize: 12,
                      color: 'black',
                      alignSelf: 'center',
                    }} >{JSON.stringify(product)}</Text>
                    <NativeButton
                      onPress={() => this.buyItem(product.productId)}
                      activeOpacity={0.5}
                      style={styles.btn}
                      textStyle={styles.txt}
                    >Buy Above Product</NativeButton>
                  </View>
                );
              })
            }

      </ScrollView>
    </View>
    );
  }


}

const mapStateToProps = ({store}) =>{
  const { heart, error } = store;
  return { heart , error };
}

export default connect(mapStateToProps, {initHeart , getHeart, updateHeart})(Store);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {
    backgroundColor: '#B0C4DE',
    paddingVertical: 10,
    alignItems: 'center'
  },
  title:{
    color:'#2d3436'
  },
  subtitle:{
    color: '#636e72'
  }
});
