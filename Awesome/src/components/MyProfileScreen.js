import EvilIcon from 'react-native-vector-icons/EvilIcons';
import React, {Component} from 'react';
import { View,Text,} from 'react-native';

export default class MyProfileScreen extends Component {
  static navigationOptions = {
          tabBarLabel: 'People',
          tabBarIcon: ({ tintColor }) => (
              <EvilIcon
                  name={'user'}
                  size={50}
                  style={{ color: tintColor }}
              />
          )
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>My Stats!</Text>
      </View>
    );
  }
}
