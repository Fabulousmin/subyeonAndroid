import React from 'react';
import { Modal, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
const { width, height } = Dimensions.get('window');
const SAlert = (props) => {
  const {
    container,
    alertContainer,
    titleContainer,
    title,
    subtitleContainer,
    subtitle,
    buttonContainer,
    buttonStyle,
    buttonTitle
  } = styles;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
      >
       <View style={container}>
         <View style={alertContainer}>
           <View style={titleContainer}>
             <Text style={title}>{props.title}</Text>
           </View>
           <View style={subtitleContainer}>
             <Text style={subtitle}>{props.subtitle}</Text>
           </View>
           <View style={buttonContainer}>
           <TouchableOpacity style={buttonStyle} onPress={props.onPressLeftButton}>
             <Text style={buttonTitle}>{props.leftButtonTitle ? props.leftButtonTitle : '확인'}</Text>
           </TouchableOpacity>
           <View style={{borderRightWidth:1, borderRightColor:'#b2bec3' }}></View>
           <TouchableOpacity style={buttonStyle} onPress={props.onPressRightButton}>
             <Text style={buttonTitle}>{props.rightButtonTitle ? props.rightButtonTitle : '취소'}</Text>
           </TouchableOpacity>
           </View>
         </View>
       </View>
    </Modal>
  )
}

const styles= {
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'rgba(52, 52, 52, 0.4)'
  },
  alertContainer:{
    width: width-30,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderRadius: 5
  },
  titleContainer:{
    width: width-30,
    paddingVertical:20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#74b9ff'
  },
  title:{
    fontFamily:'BMHANNA11yrsold',
    fontSize:15,
    color:'#0984e3'
  },
  subtitleContainer:{
    width: width-30,
    paddingVertical:30,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor:'#b2bec3'
  },
  subtitle:{
    fontFamily:'BMHANNA11yrsold', fontSize:15, color:'#636e72'
  },
  buttonContainer:{
    width: width-30,
    height:60,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonStyle:{
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:20,
    width: (width-30)/2
  },
  buttonTitle:{
    fontFamily:'BMHANNA11yrsold', fontSize:15, color:'#636e72'
  }

}

export {SAlert};
