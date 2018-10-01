import React, { Component } from 'react';
import { View, Image, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { FormLabel, FormInput, FormValidationMessage, Button, Text } from 'react-native-elements'
import { initLogin, sendbirdLogin, kakaoLogin, getCurrentUserInfo } from '../actions';
import {sbRegisterPushToken} from '../sendbirdActions';
import { Spinner, SAlert } from '../components';
import SendBird from 'sendbird';



class Login extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            userId: '',
            password: '',
            modal:null,
        };
    }

    async componentDidMount() {
        this.props.initLogin();
      }

      componentWillReceiveProps(props) {
          let { user, error, userInfo } = props;
          if (user) {
              this.setState({isLoading: false});
              AsyncStorage.getItem('pushToken', (err, pushToken) => {
                  if (pushToken) {
                      sbRegisterPushToken(pushToken)
                          .then(res => {this.props.navigation.navigate('Start')})
                          .catch(err => {})
                    }
                      })
                  }
          if (error) {
              this.setState({ isLoading: false, password:'', modal:error.code})
              this.props.initLogin();
          }
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

    _renderAlert = (modal) => {
      let message = ''
      let visible = false
      switch(modal) {
        case 'auth/user-disabled':
          message='이용 정지된 계정입니다.'
          visible=true
          break
        case 'auth/invalid-email':
          message='유효하지 않은 이메일입니다.'
          visible=true
          break
        case 'auth/weak-password':
          message='영문 숫자조합 8글자이상의 패스워드를 입력해주세요.'
          visible=true
          break
        case 'auth/user-not-found':
          message='존재하지 않는 계정입니다.'
          visible=true
          break
        default:
          meesage=''
          break
      }
      return(
      <SAlert
        title='오류'
        visible={visible}
        subtitle={message}
        onPressLeftButton={() => this.setState({modal: null})}
        onPressRightButton={() => this.setState({modal: null})}
      />)
    }


    render() {
        return (
          <KeyboardAvoidingView
              style={styles.containerStyle}
              keyboardVerticalOffset={0}
              behavior="padding"
              enabled
          >

                <Spinner visible={this.state.isLoading} />
                <View style={styles.headerContainer}>
                  <Button
                    title='회원가입'
                    backgroundColor='transparent'
                    onPress={() => this.props.navigation.navigate('Register')}
                  />
                  <Button
                    title='비밀번호 찾기'
                    backgroundColor='transparent'
                    onPress={() => this.props.navigation.navigate('Forgot')}
                    style={{width:115}}
                  />
                </View>
                <View style={styles.logoContainer}>
                    <Image
                        style={{ width: 180, height: 180 }}
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
                        title='로그인'
                        style={{marginTop:20}}
                        textStyle={{fontFamily:'BMHANNA11yrsold',fontSize:20}}
                        icon={{name:'ios-log-in', color:'black' , type: 'ionicon'}}
                        backgroundColor='#54a0ff'
                        onPress={this._onButtonPress}
                        disabled={this.state.isLoading}
                        borderRadius={5}
                      />
                      <Button
                        title='카카오톡으로 로그인'
                        style={{marginTop:10}}
                        textStyle={{fontFamily:'BMHANNA11yrsold',fontSize:20}}
                        backgroundColor='#fcd411'
                        onPress={this._onKakaoButtonPress.bind(this)}
                        borderRadius={5}/>
              </View>
              {this._renderAlert(this.state.modal)}

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
    headerContainer:{
        flex: 1,
        marginTop: 15,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    logoContainer: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    formContainer: {
      flex: 5,
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
