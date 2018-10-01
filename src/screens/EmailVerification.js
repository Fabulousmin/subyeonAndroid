import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { Text, Button, Header, Icon,FormLabel, FormValidationMessage } from 'react-native-elements'
import { sbUnregisterPushToken } from '../sendbirdActions';
import { sendbirdLogout, initMenu, fbLogOut} from '../actions';
import { components } from '../components';
import firebase from '@firebase/app';


class EmailVerification extends Component {

  state = {
    email:'',
    message:'',
    isLoading:false
  }

  componentDidMount() {
    const currentUser = firebase.auth().currentUser;
    this.props.initMenu();
    console.log(currentUser.email);
    this.setState({email: currentUser.email});
    this.props.initMenu;
  }
  componentWillReceiveProps(props){
    const { isDisconnected } = props;
    if(isDisconnected){
      this.setState({isLoading: false});
      this.setState(() => {this.props.navigation.navigate('Start')})
    }
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

  onLogoutPressed(){
        this.setState({isLoading: true});
        this.props.fbLogOut();
    }

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={
            <TouchableOpacity onPress={() => this.onLogoutPressed()}>
              <Icon
              name= 'clear'
              color='#8395a7'
            />
            </TouchableOpacity>
          }
          outerContainerStyles={{ borderBottomWidth: 0 }}
          backgroundColor='transparent'
        />
        <View style={styles.titleContainer}>
          <Text h3 style={styles.title}>이메일 인증</Text>
          <Text style={styles.subtitle}>이메일 인증을 완료해주세요.</Text>
        </View>
        <View style={styles.formContainer}>
          <FormLabel>'{this.state.email}' 로 인증메일을 전송합니다.
            이메일 인증 후 뒤로가기 버튼을 눌러 다시 로그인해주세요.
          </FormLabel>

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

function mapStateToProps({ menu }){
    const { isDisconnected } = menu;
    return { isDisconnected };
};

export default connect(mapStateToProps, { initMenu, fbLogOut })(EmailVerification);

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
