import React, { Component } from 'react';
import { View, Image, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { FormLabel, FormInput, FormValidationMessage, Button, Text } from 'react-native-elements'
import { initLogin, sendbirdLogin, kakaoLogin, getCurrentUserInfo } from '../actions';
import {sbRegisterPushToken} from '../sendbirdActions';
import { Spinner } from '../components';
import SendBird from 'sendbird';



class Login extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            userId: '',
            password: ''
        };
    }

    async componentDidMount() {
        this.props.initLogin();
      }

      componentWillReceiveProps(props) {
          async () => await getCurrentUserInfo();
          let { user, error, userInfo } = props;
          if (user) {
              AsyncStorage.getItem('pushToken', (err, pushToken) => {
                  if (pushToken) {
                      sbRegisterPushToken(pushToken)
                          .then(res => {})
                          .catch(err => {})
                    }
                  this.checkUsers()
                  .then((currentUserNickname)=>{
                    if(currentUserNickname!=="") {
                      this.props.navigation.navigate('MainStack')
                    }
                    else{
                      this.props.navigation.navigate('ProfileInitStack')
                    }
                      })
                    })
                  }
          if (error) {
              this.setState({ isLoading: false,password:''})
              this.props.initLogin();
          }
      }
      async checkUsers(){
      const sb = SendBird.getInstance();
      const currentUserNickname = sb.currentUser.nickname
      return currentUserNickname
    }



    _onUserIdChanged = (userId) => {
        this.setState({ userId });
    }

    _onPasswordChanged =(password) => {
        this.setState({ password });
    }

    _onButtonPress = () => {
        const { userId, password } = this.state;
        console.log('아이디',userId)
        console.log('비번',password)
        if (userId=="" || password==""){
          return;
        }
        else{
        this.setState({ isLoading: true }, () => {
            this.props.sendbirdLogin({ userId, password });
        });
      }
    }

    _onKakaoButtonPress = () => {
      this.setState({ isLoading: true }, () => {
        this.props.kakaoLogin();
      });
    }


    render() {
        return (
          <KeyboardAvoidingView
              style={styles.containerStyle}
              behavior="padding"
              enabled
          >
                <Spinner visible={this.state.isLoading} />
                <View style={styles.logoContainer}>
                    <Image
                        style={{ width: 150, height: 150 }}
                        source={require('../img/logo.png')}
                    />
                </View>

                <View style={styles.formContainer}>
                      <FormLabel
                        labelStyle={{color:'#dfe6e9'}}
                        fontFamily='BMHANNA11yrsold'
                      >이메일
                      </FormLabel>
                      <FormInput
                          placeholder="user@email.com"
                          placeholderTextColor="rgba(255,255,255,0.5)"
                          autoCapitalize="none"
                          inputStyle={{fontFamily:'BMHANNA11yrsold',color:'#FFFFFF'}}
                          returnKeyType="next"
                          keyboardType="email-address"
                          autoCorrect={false}
                          maxLength={40}
                          underlineColorAndroid='transparent'
                          value={this.state.userId}
                          onChangeText={this._onUserIdChanged}
                      />

                      <FormLabel
                        labelStyle={{color:'#dfe6e9'}}
                        fontFamily='BMHANNA11yrsold'
                      >비밀번호
                      </FormLabel>
                      <FormInput
                          placeholder="password"
                          placeholderTextColor="rgba(255,255,255,0.5)"
                          secureTextEntry
                          autoCapitalize="none"
                          inputStyle={{fontFamily:'BMHANNA11yrsold',color:'#FFFFFF'}}
                          returnKeyType="next"
                          autoCorrect={false}
                          maxLength={30}
                          underlineColorAndroid='transparent'
                          value={this.state.password}
                          onChangeText={this._onPasswordChanged}
                      />
                      <Button
                        title='회원가입'
                        style={{marginTop:5}}
                        textStyle={{fontFamily:'BMHANNA11yrsold',fontSize:20}}
                        icon={{name:'ios-log-in', color:'black' , type: 'ionicon'}}
                        backgroundColor='#54a0ff'
                        onPress={() => this.props.navigation.navigate('Register')}
                        disabled={this.state.isLoading}
                        borderRadius={5}
                      />
                      <Button
                        title='로그인'
                        style={{marginTop:5}}
                        textStyle={{fontFamily:'BMHANNA11yrsold',fontSize:20}}
                        icon={{name:'ios-log-in', color:'black' , type: 'ionicon'}}
                        backgroundColor='#54a0ff'
                        onPress={this._onButtonPress}
                        disabled={this.state.isLoading}
                        borderRadius={5}
                      />
                      <Button
                        title='카카오톡으로 로그인'
                        style={{marginTop:5}}
                        textStyle={{fontFamily:'BMHANNA11yrsold',fontSize:20}}
                        backgroundColor='#fcd411'
                        onPress={this._onKakaoButtonPress.bind(this)}
                        borderRadius={5}/>
                <Text style={styles.errorTextStyle}>{this.props.error}</Text>
              </View>
          </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps({ login, profile }) {
    const { error, user } = login;
    const { userInfo } = profile;
    return { error, user, userInfo };
}

export default connect(mapStateToProps, { initLogin, sendbirdLogin, kakaoLogin, getCurrentUserInfo })(Login);

const styles = {
    containerStyle: {
        backgroundColor: '#74b9ff',
        flex: 1
    },
    logoContainer: {
        flex: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    formContainer: {
      flex: 4,
    },
    errorTextStyle: {
        alignSelf: 'center',
        fontSize: 12,
        color: '#e03131'
    },
    footerViewStyle: {
        paddingLeft: 28,
        paddingRight: 28,
        marginTop: 15,
        flexDirection: 'column'
    },
    footerTextStyle: {
        alignSelf: 'center',
        fontSize: 12,
        color: '#8e8e8e'
    }
}
