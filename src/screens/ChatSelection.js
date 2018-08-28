/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableHighlight,
  Alert
} from 'react-native';
import { SHeader, Spinner } from '../components';
import { connect } from 'react-redux';
import { initHeart,
   getHeart,
   initOpenChannel,
   getOpenChannelList,
   onOpenChannelPress,
   clearCreatedOpenChannel,
   clearSeletedOpenChannel,
   openChannelProgress,
   initGroupChannel,
   groupChannelProgress,
   getGroupChannelList,
   onGroupChannelPress,
   onLeaveChannelPress,
   onHideChannelPress,
   clearSelectedGroupChannel,
   createGroupChannelListHandler
  } from '../actions';
import { Text, ListItem, Avatar, Button} from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import { sbCreateOpenChannelListQuery,
  sbCreateGroupChannelListQuery,
  sbUnixTimestampToDate,
  sbGetChannelTitle
 } from '../sendbirdActions';
class ChatSelection extends Component {
static navigationOptions = ({ navigation }) => {
  return {header: null}
}
  constructor(props) {
      super(props);
      this.state = {
          heart: 0,
          enterChannel: false,
          openChannelListQuery: null,
          list: [],
          joinChannel: false,
          groupChannelListQuery: null
      }
  }
  async componentDidMount() {
    this.props.initHeart();
    this._initOpenChannelList();
    this._initGroupChannelList();
    await this.props.getHeart();
  }


  componentWillReceiveProps(props) {
    const { heart , error, list, channel, createdChannel, groupChannel } = props;
    if(heart) {
      this.setState({heart: heart});
    }
    if (createdChannel) {
        const newList = [...[createdChannel], ...list];
        this.setState({ list: newList }, () => {
            this.props.clearCreatedOpenChannel();
        });
    }

    if (channel) {
          this.props.clearSeletedOpenChannel();
          this.props.navigation.navigate(
              'Chat',
              {
                  channelUrl: channel.url,
                  title: channel.name,
                  memberCount: channel.participantCount,
                  isOpenChannel: channel.isOpenChannel(),
                  _initListState: this._initEnterState
              }
          );
        }

    if (groupChannel.channel){
      this.props.clearSelectedGroupChannel();
      this.props.navigation.navigate(
          'Chat',
          {
              channelUrl: groupChannel.channel.url,
              title: sbGetChannelTitle(groupChannel.channel),
              memberCount: groupChannel.channel.memberCount,
              isOpenChannel: groupChannel.channel.isOpenChannel(),
              _initListState: this._initJoinState
          }
      );
    }
  }

// 오픈채널
  _initEnterState = () => {
      this.setState({ enterChannel: false });
  }


  _initOpenChannelList = () => {
      this.props.initOpenChannel();
      this._getOpenChannelList(true);
  }

  _getOpenChannelList = (init) => {
      this.props.openChannelProgress(true);
      if (init) {
          const openChannelListQuery = sbCreateOpenChannelListQuery();
          this.setState({ openChannelListQuery }, () => {
              this.props.getOpenChannelList(this.state.openChannelListQuery);
          });
      } else {
          this.props.getOpenChannelList(this.state.openChannelListQuery);
      }
  }

  _onListItemPress = (channelUrl) => {
      if (!this.state.enterChannel) {
          this.setState({ enterChannel: true }, () => {
              this.props.onOpenChannelPress(channelUrl);
          })
      }
  }

  _renderList = (rowData) => {
      const channel = rowData.item;
      return (
          <ListItem
              component={TouchableHighlight}
              containerStyle={{ backgroundColor: '#fff' }}
              key={channel.url}
              avatar={(
                  <Avatar
                  rounded
                      source={channel.coverUrl ? { uri: channel.coverUrl } : require('../img/icon_sb_68.png')}
                  />
              )}
              title={channel.name.length > 30 ? channel.name.substring(0, 26) + '...' : channel.name}
              titleStyle={{fontFamily:'BMHANNA_11yrs_ttf' ,fontWeight: '500', fontSize: 14 }}
              subtitle={channel.participantCount + ' Participant'}
              subtitleStyle={{ fontFamily:'BMHANNA_11yrs_ttf',fontWeight: '300', fontSize: 11 }}
              onPress={() => this._onListItemPress(channel.url)}
          />
      )
  }

// 그룹채널
  _initJoinState = () => {
      this.setState({ joinChannel: false });
  }

  _initGroupChannelList = () => {
      this.props.initGroupChannel();
      this.props.createGroupChannelListHandler();
      this._getGroupChannelList(true);
  }

  _getGroupChannelList = (init) => {
      this.props.groupChannelProgress(true);
      if (init) {
          const groupChannelListQuery = sbCreateGroupChannelListQuery();
          this.setState({ groupChannelListQuery }, () => {
              this.props.getGroupChannelList(this.state.groupChannelListQuery);
          });
      } else {
          this.props.getGroupChannelList(this.state.groupChannelListQuery);
      }
  }

  _ongListItemPress = (channelUrl) => {
      if (!this.state.joinChannel) {
          this.setState({ joinChannel: true }, () => {
              this.props.onGroupChannelPress(channelUrl);
          });
      }
  }
  _handleScroll = (e) => {
      if (e.nativeEvent.contentOffset.y < -100 && !this.props.isLoading && !this.state.groupChannelListQuery.isLoading) {
          this._initGroupChannelList();
      }
  }

  _renderLastMessageTime = (message) => {
      return message ? sbUnixTimestampToDate(message.createdAt) : null;
  }

  _renderTitle = (channel) => {
      const { lastMessage } = channel;
      return (
          <View style={styles.renderTitleViewStyle}>
              <View style={{flexDirection: 'row'}}>
                  <Text style={{fontFamily:'BMHANNA_11yrs_ttf',fontSize:16}}>{sbGetChannelTitle(channel)}</Text>
              </View>
              <View>
                  <Text style={styles.renderTitleTextStyle}>
                      {this._renderLastMessageTime(lastMessage)}
                  </Text>
              </View>
          </View>
      )
  }

  _renderMessage = (message) => {
      if (message) {
          const lastMessage = message.isFileMessage() ? message.name : message.message;
          if (lastMessage.length > 30) {
              return lastMessage.substring(0, 27) + '...';
          } else {
              return lastMessage;
          }
      } else {
          return null;
      }
  }

  _renderUnreadCount = (count) => {
      if (count > 0) {
          count = (count > 9) ? '+9' : count.toString();
      } else {
          count = null;
      }

      return count ? (
          <View style={styles.unreadCountViewStyle}>
              <Text style={styles.unreadCountTextStyle}>{count}</Text>
          </View>
      ) : null;
  }

  _renderLastMessage = (channel) => {
      const { lastMessage, unreadMessageCount } = channel;
      return (
          <View style={styles.renderLastMessageViewStyle}>
              <Text style={styles.renderLastMessageTextStyle}>
                  {this._renderMessage(lastMessage)}
              </Text>
              {this._renderUnreadCount(unreadMessageCount)}
          </View>
      )
  }

  _onChannelLeave = (channelUrl) => {
      Alert.alert(
          'Leave',
          'Are you sure want to leave channel?',
          [
              {text: 'Cancel'},
              {text: 'OK', onPress: () => this.props.onLeaveChannelPress(channelUrl)},
          ]
      )
  }

  _onChannelHide = (channelUrl) => {
      Alert.alert(
          'Hide',
          'Are you sure want to hide channel?',
          [
              {text: 'Cancel'},
              {text: 'OK', onPress: () => this.props.onHideChannelPress(channelUrl)},
          ]
      )
  }

  _rendergList = (rowData) => {
      const channel = rowData.item;
      let swipeoutBtns = [
          {
              text: '나가기',
              type: 'delete',
              onPress: () => { this._onChannelLeave(channel.url) },
          },
          {
              text: '숨기기',
              type: 'default',
              onPress: () => { this._onChannelHide(channel.url) },
          }
      ]


      return (
          <Swipeout
              right={swipeoutBtns}
              autoClose={true}>
              <ListItem
                  component={TouchableHighlight}
                  containerStyle={{backgroundColor: '#fff'}}
                  key={channel.url}
                  avatar={<Avatar rounded source={{uri: channel.coverUrl}} />}
                  title={this._renderTitle(channel)}
                  titleStyle={{fontFamily:'BMHANNA_11yrs_ttf',fontWeight: '500', fontSize: 16}}
                  subtitle={this._renderLastMessage(channel)}
                  subtitleStyle={{fontFamily:'BMHANNA_11yrs_ttf',fontWeight: '300', fontSize: 11}}
                  onPress={ () => this._ongListItemPress(channel.url) }
              />
          </Swipeout>
      )
  }



  render() {
    return (
      <View style={styles.container}>
        <SHeader
          onLeftPress={()=>this.props.navigation.navigate('StoreStack')}
          onRightPress={()=>this.props.navigation.navigate('MenuStack')}
          heart={this.state.heart}
        />
        <ScrollView>
          <View style={styles.divider}>
            <Text style ={{fontFamily:'BMHANNA_11yrs_ttf',fontSize:20,color:'black'}}>오 픈 채 팅 방</Text>
          </View>
          <View>
              <Spinner visible={this.props.isLoading} />
              <FlatList
                  renderItem={this._renderList}
                  data={this.props.list}
                  extraData={this.state}
                  inverted={false}
                  keyExtractor={(item, index) => item.url}
                  onEndReached={() => this._getOpenChannelList(false)}
                  onEndReachedThreshold={0}
              />
          </View>
          <View style={styles.divider}>
            <Text style ={{fontFamily:'BMHANNA_11yrs_ttf',fontSize:20,color:'black'}}>1 : 1 채 팅</Text>
          </View>
          <View>
              <Spinner visible={this.props.groupChannel.isLoading} />
              <FlatList
                  renderItem={this._rendergList}
                  data={this.props.groupChannel.list}
                  extraData={this.state}
                  keyExtractor={(item, index) => item.url}
                  onEndReached={() => this._getGroupChannelList(false)}
                  onEndReachedThreshold={0}
                  onScroll={this._handleScroll}
              />
          </View>

        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({store, openChannel, groupChannel }) => {
  const { heart, error } = store;
  const { isLoading, list, createdChannel, channel } = openChannel;
  return { heart ,error, isLoading, list, createdChannel, channel, groupChannel }
}

export default connect(mapStateToProps,
  {
    initHeart,
    getHeart,
    initOpenChannel,
    getOpenChannelList,
    onOpenChannelPress,
    clearCreatedOpenChannel,
    clearSeletedOpenChannel,
    openChannelProgress,
    initGroupChannel,
    groupChannelProgress,
    getGroupChannelList,
    onGroupChannelPress,
    onLeaveChannelPress,
    onHideChannelPress,
    clearSelectedGroupChannel,
    createGroupChannelListHandler
   })(ChatSelection)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {
    backgroundColor: '#FFFAFA',
    paddingVertical: 9,
    alignItems: 'center'
  },
  title:{
    color:'#2d3436'
  },
  subtitle:{
    color: '#636e72'
  },
  renderTitleViewStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 10
  },
  renderTitleMemberCountViewStyle: {
      backgroundColor: '#e3e3e3',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingLeft: 4,
      paddingRight: 4,
      marginLeft: 4,
  },
  renderTitleTextStyle: {
      fontSize: 10,
      color: '#878D99'
  },
  unreadCountViewStyle: {
      width: 18,
      height: 18,
      padding: 3,
      backgroundColor: '#e03131',
      borderRadius: 9,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
  },
  unreadCountTextStyle: {
      fontSize: 8,
      fontWeight: '500',
      color: '#fff'
  },
  renderLastMessageViewStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 10
  },
  renderLastMessageTextStyle: {
      fontSize: 12,
      color: '#878D99',
      marginTop: 3,
  }
});
