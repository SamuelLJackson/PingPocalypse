import React from 'react';
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { getTheme } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/EvilIcons';
import {graphql, compose} from 'react-apollo';
import updateLoggedInPlayersView from '../graphql/updateLoggedInPlayersView';


const theme = getTheme();

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    width: Dimensions.get('window').width - 20,
    height: 90,
    backgroundColor: '#3e0e4c'
  },
  title: {
      top: 20,
      left: 80,
      fontSize: 24,
      color: 'white',
  },
  image: {
      height: 100,
  },
  action: {
      backgroundColor: 'black',
      color: 'white',
  },
  icon: {
      position: 'absolute',
      top: 15,
      left: 0,
      color: 'white',
      backgroundColor: 'rgba(255,255,255,0)',
  },
});

const LoggedInPlayersItem = (props) => {

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.updateLoggedInPlayersView({
          variables: {
            index: 'selectedPlayerIndex',
            value: props.rowId
          }
        });
        props.updateLoggedInPlayersView({
          variables: {
            index: 'showAll',
            value: 'false'
          }
        })
      }}
    >
      <View style={[theme.cardStyle, styles.card]}>
        <Icon name={'user'} size={80} style={styles.icon} />
        <Text style={[theme.cardTitleStyle, styles.title]}>{props.player.username}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default compose(
  graphql(updateLoggedInPlayersView, { name: 'updateLoggedInPlayersView'})
)(LoggedInPlayersItem);
