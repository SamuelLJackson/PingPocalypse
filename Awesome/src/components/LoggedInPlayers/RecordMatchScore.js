import React, {Component} from 'react';
import {View, Text, ListView,Alert,Picker,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import { MKTextField, MKColor, MKButton} from 'react-native-material-kit';
import { getTheme } from 'react-native-material-kit';

const theme = getTheme();

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    paddingBottom: 20,
    marginBottom: 20,
    borderColor: 'lightgrey',
    borderWidth: 0.5,
    height: 400,
    width: Dimensions.get('window').width - 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title1: {
      fontSize: 22,
  },
  button: {
    height: 40,
    width: 100,
    borderRadius: 10,
    backgroundColor: '#3e0e4c',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
  },
  picker: {
    width: 300,
  }
});

export default class RecordMatchScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
    }
  }
  renderPickerItems() {
    let items = []
    for (let i=0; i < 41; i++) {
      items.push(<Picker.Item label={String(i)} value={i} key={i} />);
    }
    return items;
  }
  render() {
    return (
      <View style={styles.card}>

        <Text style={styles.title1}>Enter your score</Text>
        <Picker
          style={styles.picker}
          selectedValue={this.state.score}
          onValueChange={(itemValue,itemIndex) => this.setState({score: itemValue})}
        >
          {this.renderPickerItems()}
        </Picker>
        <TouchableOpacity>
          <View style={styles.button}>
            <Text style={styles.buttonText}>SUBMIT</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
