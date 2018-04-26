import React, {Component} from 'react';
import {View, Text} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Tables from './Tables';

export default class ChooseTableScreen extends React.Component {
  static navigationOptions = {
          tabBarLabel: 'Tables',
          tabBarIcon: ({ tintColor }) => (
              <MaterialIcon
                  name={'business'}
                  size={45}
                  style={{ color: tintColor }}
              />
          ),
  }

  render(){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Tables showAll={true}/>
      </View>
    );
  }
}
