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
                  <Text style ={{fontFamily:'BMHANNA_11yrs_ttf',fontSize:19}}>{props.nickname}</Text>
                  <Text style = {{fontFamily:'BMHANNA_11yrs_ttf'}} note>{props.sex},{props.number}명,{props.age}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={props.source} style={{height: 300, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Text style ={{fontFamily:'BMHANNA_11yrs_ttf',fontSize:16}}>{props.selfIntro}</Text>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                </Button>
              </Left>
              <Body>
                <Button
                  transparent
                  onPress={props.onpress}
                  >
                  <Icon active name="chatbubbles" />
                  <Text style ={{fontFamily:'BMHANNA_11yrs_ttf'}}>Message</Text>
                </Button>
              </Body>
              <Right>
                <Text style ={{fontFamily:'BMHANNA_11yrs_ttf'}}>{props.updatedAt}</Text>
              </Right>
            </CardItem>
          </Card>

  );
}

export{ CardImage };
