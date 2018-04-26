/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  Text, View, StyleSheet, Image, ScrollView,
  TouchableOpacity, Linking, Alert } from 'react-native';
import { getTheme } from 'react-native-material-kit';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import { MKTextField, MKColor, MKButton} from 'react-native-material-kit';
import {graphql, compose} from 'react-apollo';
import updateTableView from '../graphql/updateTableView';


const theme = getTheme();

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    paddingBottom: 20,
    marginBottom: 20,
    borderColor: 'lightgrey',
    borderWidth: 0.5,
  },
  title1: {
      top: 10,
      left: 80,
      fontSize: 22,
  },
  title2: {
      top: 35,
      left: 82,
      fontSize: 18,
  },
  image: {
      flex: 0,
      height: 100,
      width: 333,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
  },
  closeIcon: {
      position: 'absolute',
      top: -1,
      left: 260,
  },
  icon: {
      position: 'absolute',
      top: 15,
      left: 0,
      color: 'white',
      backgroundColor: 'rgba(255,255,255,0)',
  },
  textArea: {
      flexDirection: 'row',
      paddingLeft: 20,
      paddingTop: 10,
      width: 260,
  },
  textIcons: {
      color: '#26a69a',
  },
  actionArea: {
      paddingTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
  },
  editIcon: {
      color: '#26a6e4',
  },
  sections: {
      flexDirection:  'row',
      paddingLeft: 10,
      paddingTop: 10,
      width: 100,
  },
  deleteIcon: {
      color: '#e9a69a',
  },
  editDeleteArea: {
    flexDirection:  'row',
    paddingRight: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(211,211,211, 0.3)',
    marginBottom: 10,
  },
});

class TableMenu extends Component {

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[theme.cardStyle, styles.card]}>
          <Image
              source={require('../../images/background.jpg')}
              style={[theme.cardImageStyle, styles.image]}
          />
          <MaterialIcon name={'business'} size={80} style={styles.icon}/>
          <TouchableOpacity style={styles.closeIcon}
               onPress={() => this.props.updateTableView({
                 variables: {
                   index: 'showAll',
                   value: 'true',
                 },
               })}>
            <Image
              source={require('../../images/close.png')}
            />
          </TouchableOpacity>
          <Text>{this.props.table.firstName} {this.props.table.lastName}</Text>
        </View>
      </ScrollView>
    );
  }
}

export default compose(
  graphql(updateTableView, { name: 'updateTableView'})
)(TableMenu);
