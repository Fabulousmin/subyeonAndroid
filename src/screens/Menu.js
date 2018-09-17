import React, { Component } from 'react';
import { View, AsyncStorage, ScrollView, ImageBackground, Dimensions, Modal, TouchableOpacity, Text } from 'react-native';
import { Picker } from 'native-base'
import { connect } from 'react-redux';
import { sendbirdLogout, initMenu, fbLogOut, initProfile, getCurrentUserInfo, updateProfile, updateProfileWithoutImg } from '../actions';
import {
    sbUnregisterPushToken
  } from '../sendbirdActions';
import ImagePicker from 'react-native-image-picker';
import { NavigationActions } from 'react-navigation';
import { HR, Spinner } from '../components';
import { Header, Icon, Button, ListItem, List } from 'react-native-elements';

const {width, height} = Dimensions.get('window')
class Menu extends Component {
  static navigationOptions = ({ navigation }) => {
    return {header: null}
  }

    state = {
            isLoading: false,
            profileUrl:'',
            profileImgData:'',
            isProfileImgChanged:false,
            sex:'',
            age:'',
            selfIntro:'',
            city:'',
            number:'',
            nickname:'',
            modal:null,
          }

          _imagePick() {
            const pickerOptions = {
              title: '프로필 사진 변경',
              customButtons: [
              ],
              storageOptions: {
                skipBackup: true,
                path: 'subyeon/images',
              },
              quility: 0.5,
              allowsEditing: true,
            };

            ImagePicker.showImagePicker(pickerOptions, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
              console.log('User cancelled image picker');
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            }
            else {
              this.setState({
                profileUrl: response.uri,
                profileImgData: response.data,
                isProfileImgChanged: true
              })
            }
            });
            }

    async componentDidMount() {
        this.props.initProfile();
        this.props.initMenu();
        await this.props.getCurrentUserInfo()
    }

    componentWillReceiveProps(props) {
      const { isDisconnected, userInfo, isSaved } = props;
      if(isSaved){
        this.setState({isLoading:false})
        this.props.navigation.navigate('MainTab')
      }
      if(userInfo) {
        const { profileUrl, sex, age, selfIntro, city, number, nickname} = userInfo;
        this.setState({
          profileUrl, sex, age, selfIntro, city, number, nickname
        })
      }
      AsyncStorage.getItem("user", (err, result) => {
            if(!result){
            this.props.navigation.navigate('Start');
          }
        }
      )
    }

    _onDisconnectButtonPress = () => {
        this.setState({ isLoading: true }, () => {
            sbUnregisterPushToken()
                .then(res => {
                    this.props.fbLogOut();
                    this.props.sendbirdLogout();
                    console.log('')
                })
               .catch(err => {});
        });
    }

    _onSaveButtonPress= async () => {
      this.setState({isLoading:true})
      let userInfo = this.props.userInfo;
      const { number, city ,selfIntro, profileUrl } = this.state;
      userInfo = { ...userInfo, number ,city, selfIntro, profileUrl };
      if(this.state.isProfileImgChanged){
        await this.props.updateProfile(userInfo);
      }
      else{
        await this.props.updateProfileWithoutImg(userInfo);
      }
    }

    _renderList = () => {
      const list = [
        {
          title: '닉네임',
          icon: {type: 'font-awesome', name: 'user', color: '#b2bec3'},
          value: this.state.nickname,
          amend: false
        },
        {
          title: '성별',
          icon: {type: 'font-awesome', name: 'transgender', color: '#b2bec3'},
          value: this.state.sex,
          amend: false
        },
        {
          title: '나이',
          icon: {type: 'font-awesome', name: 'sort-numeric-desc', color: '#b2bec3'},
          value: this.state.age,
          amend: false
        },
        {
          title: '현재위치',
          icon: {type: 'font-awesome', name: 'location-arrow', color: '#b2bec3'},
          value: this.state.city,
          amend: true,
          rightIcon: {type: 'font-awesome', name:'edit' , color:'#636e72' },
          onPress: this._chooseModal.bind(this, '현재위치')
        },
        {
          title: '동행',
          icon: {type: 'font-awesome', name: 'users', color: '#b2bec3'},
          value: this.state.number + ' 명',
          amend: true,
          rightIcon: {type: 'font-awesome', name:'edit' , color:'#636e72' },
          onPress: this._chooseModal.bind(this, '동행')
        }
      ]
      return(<List containerStyle={{marginBottom: 10}}>
                  {
          list.map((item) => (
            <ListItem
              leftIcon={item.icon}
              key={item.title}
              title={item.title}
              titleStyle={{fontFamily:'BMHANNA11yrsold',fontSize: 17}}
              rightTitle={<Text>{item.value}</Text>}
              rightIcon={item.rightIcon}
              hideChevron={!item.amend}
              onPressRightIcon={item.amend ? item.onPress : null}
            />
          ))
          }
          </List>)
    }

    _renderHeader() {
      return (
        <Header
          leftComponent=
          {<Icon
            type='Ionicons'
            name='arrow-back'
            color='white'
            onPress={()=>this.props.navigation.navigate('MainTab')}
           />}
          centerComponent=
          {
           <Text style={{color:'white',fontFamily:'BMHANNA11yrsold',fontSize:23}}>설정</Text>
          }
          rightComponent={
            <Text onPress={() => this._onSaveButtonPress()} style={{color:'white',fontFamily:'BMHANNA11yrsold',fontSize:17}}>저장</Text>
          }
          backgroundColor='#74b9ff'
        />
      )
    }

    _chooseModal(title) {
      this.setState({modal: title});
    }

    _renderProfileImg() {
      return(<ImageBackground
        source={this.state.profileUrl ? {uri:this.state.profileUrl} : require('../img/default.png')}
       style={{width:width, height: 300, flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end'}}
      >
        <View
         style={{marginRight: 20, marginBottom:20}}
        >
          <Button
            title='사진변경'
            textStyle={{fontFamily:'BMHANNA11yrsold'}}
            leftIcon={{type:'font-awesome', name:'user'}}
            backgroundColor='#74b9ff'
            borderRadius={10}
            onPress={this._imagePick.bind(this)}
          />
        </View>
      </ImageBackground>)
    }

    _renderLogoutButton(){
      return(<Button
          containerViewStyle={styles.menuViewStyle}
          buttonStyle={styles.buttonStyle}
          backgroundColor='#fff'
          color='#000000'
          icon={{name: 'sign-out', type: 'font-awesome' , color: '#000000', size: 16}}
          title='로그아웃'
          textStyle={{fontFamily:'BMHANNA11yrsold'}}
          onPress={this._onDisconnectButtonPress}
      />)
    }

    _renderConditionButton(){
      return(<Button
          containerViewStyle={styles.menuViewStyle}
          buttonStyle={styles.buttonStyle}
          backgroundColor='#fff'
          color='#000000'
          icon={{name: 'sign-out', type: 'font-awesome' , color: '#000000', size: 16}}
          title='이용약관'
          textStyle={{fontFamily:'BMHANNA11yrsold'}}
          onPress={()=>this.props.navigation.navigate('Condition')}
      />)
    }

    _renderLocationPicker(){
      return(
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modal == '현재위치'}>
          <View style={{flex:1, flexDirection: 'column-reverse'}}>
            <View style={{width:width , height: height/3, backgroundColor: '#dfe6e9' }}>
                  <TouchableOpacity
                    style={{width: 60, height:50, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end'}}
                    onPress={() => {
                      this.setState({modal: null})
                    }}>
                    <Text style={{fontFamily:'BMHANNA11yrsold'}}>닫기</Text>
                  </TouchableOpacity>
                  <Button
                    title='광안리'
                    textStyle={{fontFamily:'BMHANNA11yrsold',fontSize: 17}}
                    style={{marginBottom: 10}}
                    backgroundColor='#74b9ff'
                    borderRadius={5}
                    onPress={() => this.setState({modal:null, city:'광안리'})}
                  />
                  <Button
                    title='부산'
                    textStyle={{fontFamily:'BMHANNA11yrsold',fontSize: 17}}
                    style={{marginBottom: 10}}
                    backgroundColor='#74b9ff'
                    borderRadius={5}
                    onPress={() => this.setState({modal:null, city:'부산'})}
                  />
                  <Button
                    title='부산 외 지역'
                    textStyle={{fontFamily:'BMHANNA11yrsold',fontSize: 17}}
                    style={{marginBottom: 10}}
                    backgroundColor='#74b9ff'
                    borderRadius={5}
                    onPress={() =>this.setState({modal:null, city:'부산 외 지역'})}
                  />
            </View>
          </View>
        </Modal>
      )
    }

    _renderNumberPicker(){
      return(
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modal == '동행'}>
          <View style={{flex:1, flexDirection: 'column-reverse'}}>
            <View style={{width:width , height: height/2.5, backgroundColor: '#dfe6e9' }}>
                  <TouchableOpacity
                    style={{width: 60, height:50, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end'}}
                    onPress={() => {
                      this.setState({modal: null})
                    }}>
                    <Text style={{fontFamily:'BMHANNA11yrsold',fontSize: 17}}>닫기</Text>
                  </TouchableOpacity>
                  <Button
                    title='1명'
                    textStyle={{fontFamily:'BMHANNA11yrsold'}}
                    style={{marginBottom: 10}}
                    backgroundColor='#74b9ff'
                    borderRadius={5}
                    onPress={() => this.setState({modal:null, number:1})}
                  />
                  <Button
                    title='2명'
                    textStyle={{fontFamily:'BMHANNA11yrsold'}}
                    style={{marginBottom: 10}}
                    backgroundColor='#74b9ff'
                    borderRadius={5}
                    onPress={() => this.setState({modal:null, number:2})}
                  />
                  <Button
                    title='3명'
                    textStyle={{fontFamily:'BMHANNA11yrsold'}}
                    style={{marginBottom: 10}}
                    backgroundColor='#74b9ff'
                    borderRadius={5}
                    onPress={() =>this.setState({modal:null, number:3})}
                  />
                  <Button
                    title='4명'
                    textStyle={{fontFamily:'BMHANNA11yrsold'}}
                    style={{marginBottom: 10}}
                    backgroundColor='#74b9ff'
                    borderRadius={5}
                    onPress={() =>this.setState({modal:null, number:4})}
                  />
            </View>
          </View>
        </Modal>
      )
    }

    render() {
        return (
            <View style={styles.containerViewStyle}>
                <Spinner visible={this.state.isLoading} />
                {this._renderHeader()}
                <ScrollView>
                  {this._renderProfileImg()}
                  {this._renderList()}
                  <View style={{height:25}}>
                  <Text style={{fontSize:18,fontFamily:'BMHANNA11yrsold',color:'black'}}>  계정</Text>
                  </View>
                  {this._renderConditionButton()}
                  {this._renderLogoutButton()}
                  {this._renderLocationPicker()}
                  {this._renderNumberPicker()}
                </ScrollView>
            </View>
        )
    }
}

function mapStateToProps({ menu, profile }) {
    const { isDisconnected } = menu;
    const { userInfo, isSaved } = profile;
    return { isDisconnected, userInfo, isSaved };
};

export default connect(mapStateToProps, { sendbirdLogout, initMenu, fbLogOut, initProfile, getCurrentUserInfo, updateProfile, updateProfileWithoutImg })(Menu);

const styles = {
    containerViewStyle: {
        backgroundColor: '#fff',
        flex: 1
    },
    menuViewStyle: {
        marginLeft: 0,
        marginRight: 0
    },
    buttonStyle: {
        justifyContent: 'flex-start',
        paddingLeft: 14
    }
};
