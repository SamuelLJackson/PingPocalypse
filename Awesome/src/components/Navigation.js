import { StackNavigator, TabNavigator } from 'react-navigation';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import React, {Component} from 'react';
import {View,Text} from 'react-native';
import MyProfileScreen from './MyProfileScreen';
import ChooseTableScreen from './ChooseTableScreen';
import RecordMatchScreen from './RecordMatchScreen';


const Navigation = TabNavigator({
    MyProfileScreen: { screen: MyProfileScreen },
    ChooseTableScreen: { screen: ChooseTableScreen },
    RecordMatchScreen: {screen: RecordMatchScreen},
}, {
    tabBarOptions: {
        activeTintColor: '#f9ae34',
        inactiveTintColor: 'white',
        swipeEnabled: true,
        showLabel: false,
        style: {
            backgroundColor: '#3e0e4c',
        },
    },
});

export default Navigation;
