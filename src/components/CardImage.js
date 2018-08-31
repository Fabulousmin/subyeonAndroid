import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

const CardImage = ( props ) => {
    return (
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={props.source} />
                <Body>
                  <Text style ={{fontFamily:'BMHANNA11yrsold',fontSize:19}}>{props.nickname}</Text>
                  <Text style = {{fontFamily:'BMHANNA11yrsold'}} note>{props.sex},{props.number}명,{props.age}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={props.source} style={{height: 300, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Text style ={{fontFamily:'BMHANNA11yrsold',fontSize:16}}>{props.selfIntro}</Text>
            </CardItem>
            <CardItem>
              <Left>
              <Text>
                <Text style ={{fontFamily:'BMHANNA11yrsold',fontSize:17}}>수변 </Text>
                  <Text style ={{fontFamily:'BMHANNA11yrsold',color:props.color,fontSize:17}}>{props.location}</Text>
              </Text>
              </Left>
              <Body>
            <Text style ={{fontFamily:'BMHANNA11yrsold',marginTop:13,textAlign:'right'}}>{props.updatedAt}</Text>
              </Body>
              <Right>
              <Button
                transparent
                onPress={props.onpress}
                >
                <Icon active name="paper-plane" />
                <Text style ={{fontFamily:'BMHANNA11yrsold',fontSize:19,textAlign:'center'}}> 1:1 채팅</Text>
              </Button>
              </Right>
            </CardItem>
          </Card>

  );
}

export{ CardImage };
