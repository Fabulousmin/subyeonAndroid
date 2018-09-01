import React, { Component } from 'react';
import { View, Image, AsyncStorage, KeyboardAvoidingView,Alert } from 'react-native';
import { connect } from 'react-redux';
import { FormLabel, FormInput, FormValidationMessage, Button, Text } from 'react-native-elements'
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

    async componentDidMount() {
        this.props.initregister();
      }

      componentWillReceiveProps(props) {
          let {user, error} = props;
          if (user) {
              AsyncStorage.getItem('pushToken', (err, pushToken) => {
                  if (pushToken) {
                      sbRegisterPushToken(pushToken)
                          .then(res => {})
                          .catch(err => {})}
                      this.props.navigation.navigate('ProfileInitStack')
                    })
                  }
          if (error) {
              this.setState({ isLoading: false,userId:'',password:'',paswordCheck:''})
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
          <KeyboardAvoidingView
              style={styles.containerStyle}
              behavior="padding"
              enabled>
                <Spinner visible={this.state.isLoading} />
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
                      <FormLabel
                        labelStyle={{color:'#dfe6e9'}}
                        fontFamily='BMHANNA11yrsold'
                      >비밀번호 확인
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
                          value={this.state.paswordCheck}
                          onChangeText={this._onPasswordCheckChanged}
                      />
                      <Button
                        title='뒤로가기'
                        style={{marginTop:5}}
                        textStyle={{fontFamily:'BMHANNA11yrsold',fontSize:20}}
                        icon={{name:'ios-log-in', color:'black' , type: 'ionicon'}}
                        backgroundColor='#54a0ff'
                        onPress={() => this.props.navigation.navigate('LoginStack')}
                        disabled={this.state.isLoading}
                        borderRadius={5}
                      />
                      <Button
                        title='회원가입'
                        style={{marginTop:5}}
                        textStyle={{fontFamily:'BMHANNA11yrsold',fontSize:20}}
                        icon={{name:'ios-log-in', color:'black' , type: 'ionicon'}}
                        backgroundColor='#54a0ff'
                        onPress={this._onReigserButtonPress}
                        disabled={this.state.isLoading}
                        borderRadius={5}
                      />
                <Text style={styles.errorTextStyle}>{this.props.error}</Text>
              </View>
          </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps({ register }) {
    const { error, user } = register;
    return { error, user };
}

export default connect(mapStateToProps, {userRegister,initregister})(Register);

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
