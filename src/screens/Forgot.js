import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Text, Button, Header, FormLabel, FormInput, FormValidationMessage, Icon } from 'react-native-elements';
import firebase from '@firebase/app';

export default class Forgot extends Component {

  state = {
    email:'',
    message:'',
    isLoading:false
  }

  onEmailChanged(value: String) {
    this.setState({email:value})
  }

  onEmailSendButtonPressed(email) {
    const auth = firebase.auth();
    auth.sendPasswordResetEmail(email)
    .then(function() {
      console.log('email sent');
      this.setState({message:'비밀번호 변경 이메일이 발송되었습니다.'})
    }.bind(this))
    .catch(function(error) {
      console.log('fail to send email');
      this.setState({message:error.message})
      console.log(error)
    }.bind(this));
  }

  render() {
    return (
      <View style={styles.container}>
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
          <Text h3 style={styles.title}>비밀번호 찾기</Text>
        </View>
        <View style={styles.formContainer}>
          <FormLabel>이메일을 입력해주세요.</FormLabel>
          <FormInput
            value={this.state.isLoading}
            onChangeText={this.onEmailChanged.bind(this)}
            autoCapitalize={false}
            autoCompletion={false}
          />
          <FormValidationMessage>
            {this.state.message}
          </FormValidationMessage>
        </View>
        <View style={styles.footerContainer}>
          <Button
            title='확인'
            onPress={this.onEmailSendButtonPressed.bind(this, this.state.email)}
            backgroundColor='#74b9ff'
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfe6e9',
    paddingHorizontal: 10,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  title: {
    fontFamily:'BMHANNA11yrsold'
  },
  formContainer:{
    flex: 7,
  },
  footerContainer:{
    flex: 1,
  }
});
