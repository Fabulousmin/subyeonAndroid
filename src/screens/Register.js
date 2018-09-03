import React, { Component } from 'react';
import { View, Image, AsyncStorage, KeyboardAvoidingView,Alert } from 'react-native';
import { connect } from 'react-redux';
import { FormLabel, FormInput, FormValidationMessage, Button, Text, Header, Icon } from 'react-native-elements'
import { initregister,userRegister,getCurrentUserInfo } from '../actions';
import {sbRegisterPushToken,sbCreateUserListQuery,sbGetUserList} from '../sendbirdActions';
import { Spinner } from '../components';
import SendBird from 'sendbird';
import firebase from '@firebase/app'




class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            userId: '',
            password: '',
            paswordCheck:'',
        };
    }

    componentDidMount() {
        this.props.initregister();
      }

      componentWillReceiveProps(props) {
          let {user, error} = props;
          if (user) {
              AsyncStorage.getItem('pushToken', (err, pushToken) => {
                  if (pushToken) {
                      sbRegisterPushToken(pushToken)
                          .then(res => { this.props.navigation.navigate('ProfileInitStack')})
                          .catch(err => {})}
                    })
                  }
          if (error) {
              this.setState({isLoading: false,userId:'',password:'',paswordCheck:''})
              this.props.initregister();
              Alert.alert(
          '이메일을 확인해주세요',
           '중복된 이메일이 있습니다.',
           [
               {text: '확인'}
           ])
          }
      }



    _onUserIdChanged = (userId) => {
        this.setState({ userId });
    }

    _onPasswordChanged =(password) => {
        this.setState({ password });
    }

    _onPasswordCheckChanged =(paswordCheck) =>{
      this.setState({paswordCheck})
    }


    _onReigserButtonPress = () => {
      const {userId, password,paswordCheck} = this.state;
      if(userId==''||password==""){
        return;
      }
      else{
        if (password === paswordCheck){
          this.setState({ isLoading: true }, () => {
              this.props.userRegister({userId, password });
        })}
        else{
          console.log(this.state);
          this.setState({isLoading: false,password:'',paswordCheck:''})
          console.log(this.state);
          Alert.alert(
      '비밀번호를 확인해주세요',
       '비밀번호가 다릅니다',
       [
           {text: '확인'}
       ])
        }
      }
    }







    render() {
        return (
            <View
              style={styles.container}
              behavior="padding"
              enabled>
              <Spinner visible={this.state.isLoading}/>
              <Header
                leftComponent={<Icon
                  name= 'clear'
                  color='#8395a7'
                  onPress={() => this.props.navigation.goBack()}
                />}
                outerContainerStyles={{ borderBottomWidth: 0 }}
                backgroundColor='transparent'
              />
                <View style={styles.titleContainer}>
                  <Text h3 style={styles.title}>회원가입</Text>
                </View>
                <View style={styles.formContainer}>
                      <FormLabel
                        fontFamily='BMHANNA11yrsold'
                      >이메일
                      </FormLabel>
                      <FormInput
                          placeholder="user@email.com"
                          autoCapitalize="none"
                          inputStyle={{fontFamily:'BMHANNA11yrsold'}}
                          returnKeyType="next"
                          keyboardType="email-address"
                          autoCorrect={false}
                          maxLength={40}
                          underlineColorAndroid='transparent'
                          value={this.state.userId}
                          onChangeText={this._onUserIdChanged}
                      />
                      <FormLabel
                        fontFamily='BMHANNA11yrsold'
                      >비밀번호
                      </FormLabel>
                      <FormInput
                          placeholder="password"
                          secureTextEntry
                          autoCapitalize="none"
                          inputStyle={{fontFamily:'BMHANNA11yrsold'}}
                          returnKeyType="next"
                          autoCorrect={false}
                          maxLength={30}
                          underlineColorAndroid='transparent'
                          value={this.state.password}
                          onChangeText={this._onPasswordChanged}
                      />
                      <FormLabel
                        fontFamily='BMHANNA11yrsold'
                      >비밀번호 확인
                      </FormLabel>
                      <FormInput
                          placeholder="password"
                          secureTextEntry
                          autoCapitalize="none"
                          inputStyle={{fontFamily:'BMHANNA11yrsold'}}
                          returnKeyType="next"
                          autoCorrect={false}
                          maxLength={30}
                          underlineColorAndroid='transparent'
                          value={this.state.paswordCheck}
                          onChangeText={this._onPasswordCheckChanged}
                      />
                <Text style={styles.errorTextStyle}>{this.props.error}</Text>
              </View>
              <View style={styles.footerContainer}>
                <Button
                  title='회원가입'
                  style={{marginTop:5}}
                  textStyle={{fontFamily:'BMHANNA11yrsold',fontSize:20}}
                  backgroundColor='#54a0ff'
                  onPress={this._onReigserButtonPress}
                  disabled={this.state.isLoading}
                  borderRadius={5}
                />
              </View>
          </View>
        );
    }
}

function mapStateToProps({ register }) {
    const { error, user } = register;
    return { error, user };
}

export default connect(mapStateToProps, {userRegister,initregister})(Register);

const styles = {
    container: {
        flex: 1,
        paddingHorizontal:10
    },
    titleContainer:{
      flex:1,
      paddingHorizontal:15,
      justifyContent:'center'
    },
    title:{
      fontFamily:'BMHANNA11yrsold'
    },
    formContainer:{
      flex:7
    },
    footerContainer:{
      flex:1
    },
    errorTextStyle: {
        alignSelf: 'center',
        fontSize: 12,
        color: '#e03131'
    }
}
