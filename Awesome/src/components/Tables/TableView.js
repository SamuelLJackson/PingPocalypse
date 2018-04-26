import React from 'react';
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { getTheme } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {graphql, compose} from 'react-apollo';
import updateTableView from '../graphql/updateTableView';


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

const TableView = (props) => {
  /*
  onPress={() => props.updateTableView({
    variables: {
      index: 'selectedTableData',
      value: props.rowId}
    }
  )}
  */
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.updateTableView({
          variables: {
            index: 'selectedTableData',
            value: props.rowId
          }
        });
        props.updateTableView({
          variables: {
            index: 'showAll',
            value: 'false'
          }
        })
      }}
    >
      <View style={[theme.cardStyle, styles.card]}>

        <Icon
          name={'business'}
          size={80}
          style={styles.icon}
        />
        <Text style={[theme.cardTitleStyle, styles.title]}>{props.table.username} {props.table.password}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default compose(
  graphql(updateTableView, { name: 'updateTableView'})
)(TableView);
