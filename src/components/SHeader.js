import React, {Component} from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Header, Icon } from 'react-native-elements';

const SHeader = (props) => {

  const { leftContainer, rightContainer, centerContainer, leftText } = styles;

  return(
    <Header
      leftComponent={
          <View style= {leftContainer}>
            <TouchableOpacity onPress={props.onRightPress}>
              <Icon type='font-awesome' name='heart' color='white' size={20}/>
            </TouchableOpacity>
            <Text style= {{fontFamily:'BMHANNA11yrsold',color:'#FFFFFF'}}>{props.heart}</Text>
          </View>
          }
      centerComponent={
        <View style= {centerContainer}>
          <Text style={{color:'white',fontSize:23,fontFamily:'BMHANNA11yrsold'}}>수변의 온도</Text>
        </View>
      }
      rightComponent={
      <View style= {rightContainer}>
        <TouchableOpacity onPress={props.onLeftPress}>
              <Icon type='font-awesome' name='cog' color='white'/>
        </TouchableOpacity>
      </View>
      }
      backgroundColor='#74b9ff'
    />
  )
}

const styles = {
  leftContainer:{
    width:70,
    height:25,
    backgroundColor: '#0984e3',
    borderRadius: 25,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center'
  },
  centerContainer:{
    justifyContent: 'center'
  },
  rightContainer:{
    width:65,
    height:25,
    alignItems: 'flex-end'
  },
  leftText:{
    color:'white',
    fontWeight:'600'
  }
}

export {SHeader};
