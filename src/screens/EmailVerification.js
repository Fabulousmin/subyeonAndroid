import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Text, Button, Header, Icon,FormLabel, FormValidationMessage } from 'react-native-elements'
import firebase from '@firebase/app'


export default class EmailVerification extends Component {

  state = {
    email:'',
    message:'',
  }

  componentDidMount() {
    const currentUser = firebase.auth().currentUser;
    console.log(currentUser.email);
    this.setState({email: currentUser.email});
  }

  onSendVerificationPressed(){
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function() {
      this.setState({message:'메일이 전송되었습니다'});
      console.log('verification sent')
    }.bind(this)).catch(function(error) {
      this.setState({message:error.message});
      console.log('fail to send mail')
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
          <Text h3 style={styles.title}>이메일 인증</Text>
          <Text style={styles.subtitle}>이메일 인증을 완료해주세요.</Text>
        </View>
        <View style={styles.formContainer}>
          <FormLabel>'{this.state.email}' 로 인증메일을 전송합니다.</FormLabel>
          <FormValidationMessage>
            {this.state.message}
          </FormValidationMessage>
        </View>
        <View style={styles.footerContainer}>
          <Button
            title='인증메일 재전송'
            backgroundColor='#74b9ff'
            onPress={this.onSendVerificationPressed.bind(this)}
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
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'BMHANNA11yrsold'
  },
  subtitle: {
    color:'#636e72'
  },
  message:{
  },
  formContainer: {
    flex: 7,
  },
  footerContainer:{
    flex: 1,
  }


});
