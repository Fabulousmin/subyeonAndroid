import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Alert,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Button,
} from 'react-native';
import { initUserlist,
  getUserlist,
  createGroupChannel,
  initInvite,
  groupChannelProgress,
  addGroupChannelItem,
  onGroupChannelPress,
  getCurrentUserInfo,
  initHeart,
  getHeart,
} from '../actions';
import { UserList } from '../UserList';
import { CardImage, Spinner, SHeader} from '../components';
import {sbGetChannelTitle,
  sbCreateGroupChannelListQuery,
  sbGetGroupChannelList,
  sbCreateGroupChannel,
} from '../sendbirdActions';
import { connect } from 'react-redux';
import { sOnPressLike, sGetCurrentUserInfo } from '../subyeonActions';
import { Header, Icon, Text } from 'react-native-elements';
import firebase from '@firebase/app'
import Modal from "react-native-modal";
const { width,height } = Dimensions.get('window');
import CheckAlert from "react-native-awesome-alert"
class List extends Component {

  state = {
      refreshing: false,
      isLoading: false,
      data: [],
      error: '',
      heart: null,
      modal:null,
      inviteUserIdList:null,
    }
    onEndReached = async () => {
   };

   onRefresh = async () => {
   }

   async checkChannel(sendId){
     const arr = [];
     const query = sbCreateGroupChannelListQuery();
     const channelList = await sbGetGroupChannelList(query);
     const channel = await sbCreateGroupChannel([sendId],true)
     const channelUrl = channel.url
     for (var i=0; i<channelList.length;i++){
       arr.push(channelList[i].lastMessage.channelUrl)
     }
    const check = arr.includes(channelUrl)
    return check
   }

   onCreateButtonPress = (sendId) => {
    const inviteUserIdList = [sendId]
    this.setState({inviteUserIdList:sendId})
    const arr=[];
    const currentuser  = firebase.auth().currentUser.uid
    const database = firebase.database();
    const heart = database.ref().child("users/"+currentuser)
    this.checkChannel(sendId)
      .then((check) =>{
        if(check == false){
    heart.on('child_added',function(snap){
      arr.push(snap.val())})
    const userheart = arr[2]
    if (userheart >= 5) {
      this.setState({modal:'열기'})
      }
    else{
    this.setState({modal: '스토어가기'})

          }
        }
        else{
            this.props.createGroupChannel(inviteUserIdList, true);
        }

        })
      }

  _reduceHeart(sendId){
    const inviteUserIdList = [sendId]
    const arr=[];
    const currentuser  = firebase.auth().currentUser.uid
    const database = firebase.database();
    const heart = database.ref().child("users/"+currentuser)
    heart.on('child_added',function(snap){
      arr.push(snap.val())})
    const userheart = arr[2]
    const updatedheart = userheart - 5
    database.ref('users/'+currentuser).update({heart:updatedheart})
    this.setState({modal:null})
    const isDistinct = true;
    this.props.createGroupChannel(inviteUserIdList, isDistinct);
  }








 _OpenChatting(){
   return(
     <Modal
       animationType="fade "
       transparent={true}
       backdropColor={"red"}
       visible={this.state.modal == '열기'}>
       <View style={{flex:1, flexDirection: 'column-reverse',justifyContent: 'center', alignItems: 'center'}}>
         <View style={{width:width , height: height/3, backgroundColor: '#FFFFFF' }}>
          <View style={{flex: 1,
                     flexDirection: 'row',
                     alignItems: 'center',
                     justifyContent: 'center',}}>
          <View style={{flex: 1}}>
           <Button
             title='닫기'
             style={{flex: 1}}
             textStyle={{fontFamily:'BMHANNA11yrsold'}}
             backgroundColor='#74b9ff'
             borderRadius={5}
             onPress={() => this.setState({modal:null})}/>
              </View>
              <View style={{flex: 1}}>
                <Button
                  title='확인'
                  textStyle={{fontFamily:'BMHANNA11yrsold'}}
                  style={{flex: 1}}
                  backgroundColor='#74b9ff'
                  borderRadius={5}
                  onPress={() =>this._reduceHeart(this.state.inviteUserIdList)}
                  />
                </View>
              </View>
             </View>
             </View>
           </Modal>
   )
 }

 _goToStore(){
   this.setState({modal:null})
   this.props.navigation.navigate('StoreStack')
 }




 _OpenStore(){
   return(
    <View style>
     <Modal
       animationType="fade "
       transparent={true}
       backdropColor="black"
       visible={this.state.modal == '스토어가기'}>
       <View style={{flex:1, flexDirection: 'column-reverse',justifyContent: 'center'}}>
         <View style={{width:width , height: height/3, backgroundColor: '#FFFFFF' }}>
         <View>
         <Text style={{fontFamily:'BMHANNA11yrsold',
         textAlign: 'center',
         color:'#74b9ff',
         marginTop:10,
       fontSize:20}}>
       하트가 부족합니다.</Text>
         </View>
         <View>
         <Text style={{fontFamily:'BMHANNA11yrsold',
         textAlign: 'center',
         marginTop:20,
         color:'#708090',
       fontSize:20}}>
       하트5개를 사용합니다</Text>
         </View>
          <View style={{flex: 1,
                     flexDirection: 'row',
                     alignItems: 'center',
                     justifyContent: 'center',
                   marginTop:130,}}>
          <View style={{flex:1}}>
           <Button
             title='취소하기'
             textStyle={{fontFamily:'BMHANNA11yrsold'}}
             backgroundColor='#74b9ff'
             onPress={() => this.setState({modal:null})}/>
              </View>
              <View style={{flex:1}}>
                <Button
                  title='충전하기'
                  textStyle={{fontFamily:'BMHANNA11yrsold'}}
                  backgroundColor='#74b9ff'
                  onPress={() => this._goToStore()}
                  />
                </View>
              </View>
             </View>
             </View>
           </Modal>
          </View>
   )
 }




    getUpdatedBefore(updatedAt) {
      const now = new Date();
      const before = new Date(updatedAt);
      if(before.getDate() == now.getDate())
      {let result = (now - before)/60000
        result = result /60
        result = Math.floor(result*10)/10
        return Math.round(result) + ' 시간전'
      }
      else
      return '1일전'
    }
//

    getLocation(city,updatedAt){
      const location = city;
      const now = new Date();
      const before = new Date(updatedAt);
      let result = (now - before)/60000
      result = result /60
      result = Math.floor(result*10)/10
      result = Math.round(result)
      console.log('결과보기',result)

      if(location ==='광안리'){
        if(result <5){
        return 'IN'
          }
        else{
          return 'OUT'
          }
        }
      else{
        return 'OUT'
      }
   }

   getLocationColor(city,updatedAt){
     const location = city;
     const now = new Date();
     const before = new Date(updatedAt);
     let result = (now - before)/60000
     result = result /60
     result = Math.floor(result*10)/10
     result = Math.round(result)

     if(location ==='광안리'&& result <5){
       return '#1E90FF'
     }
     else{
       return 'red'
     }
   }



   renderFlatList(isLoading) {
     return (
       <FlatList
      data={this.state.data}
      initialNumToRender={1}
      onEndReachedThreshold={1}
      onEndReached={this.onEndReached}
      refreshing={this.state.refreshing}
      onRefresh={this.onRefresh}
      keyExtractor={this._keyExtractor}
      renderItem={({ item }) => {
        return (
          <CardImage
            source={{ uri: item.profileUrl }}
            nickname={item.nickname}
            city={item.city}
            sex={item.sex}
            number={item.number}
            selfIntro={item.selfIntro}
            age={item.age}
            onpress={()=>this.onCreateButtonPress(item.sendId)}
            updatedAt={this.getUpdatedBefore(item.updatedAt)}
            location={this.getLocation(item.city,item.updatedAt)}
            color ={this.getLocationColor(item.city,item.updatedAt)}
          />
        );
      }}
    />
  )
   }

   onPressLike(uid) {
     sGetCurrentUserInfo()
     .then((userInfo)=> {
       const { nickname } = userInfo;
       sOnPressLike(uid, nickname);
     })
   }

   componentDidMount() {
        this.props.initUserlist();
        this.props.initInvite();
        this.props.initHeart();
        this.props.getCurrentUserInfo();
        this.props.getHeart();
        this.setState({ isLoading: true }, () => {
          this.props.getUserlist();
        });
    }

    componentWillReceiveProps(props){
      const { userlist, error, channel, userInfo, heart} = props;
        if(userInfo){
        this.setState({heart: heart})
      }
        if (userlist) {
            this.setState({data: userlist.reverse(), isLoading: false})
        }
        if (channel) {
            this.props.groupChannelProgress(true);
            this.props.addGroupChannelItem(channel);
            this.props.onGroupChannelPress(channel.url);
            this.props.initInvite();
        }
    }


   _keyExtractor(item, index) {
     return item.nickname;
   }



  render() {
    return (
      <View>
        <Spinner visible={this.state.isLoading} />
        <SHeader
          onLeftPress={()=>this.props.navigation.navigate('StoreStack')}
          onRightPress={()=>this.props.navigation.navigate('MenuStack')}
          heart={this.state.heart}
        />
        {this.renderFlatList()}
        {this._OpenChatting()}
        {this._OpenStore()}
      </View>
    );
  }
}

const mapStateToProps = ({ list, groupChannelInvite, profile , store}) => {
  const { userlist, error } = list;
  const { channel } = groupChannelInvite;
  const { userInfo } = profile;
  const { heart } = store;
  return {userlist, error, channel, userInfo, heart};
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  buttonContainer: {
      flex: 1,
      marginHorizontal: 10,
      marginTop:10,
      justifyContent:'space-between',
  },
});

export default connect(
    mapStateToProps,
    { initUserlist,
      initInvite,
      getUserlist,
      createGroupChannel,
      groupChannelProgress,
      addGroupChannelItem,
      onGroupChannelPress,
      getCurrentUserInfo,
      initHeart,
      getHeart,
    }
)(List);
