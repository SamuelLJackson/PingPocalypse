import React, {Component} from 'react';
import {View,Text} from 'react-native';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import LoggedInPlayers from './LoggedInPlayers';

export default class RecordMatchScreen extends React.Component {
  static navigationOptions = {

          tabBarLabel: 'Record Match',
          tabBarIcon: ({ tintColor }) => (
            <EvilIcon
              name={'plus'}
              size={50}
              style={{color: tintColor}}
            />
          )
  }
  render(){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <LoggedInPlayers showAll={true}/>
      </View>
    );
  }
}
