/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  Text, View, StyleSheet, Image, ScrollView,
  TouchableOpacity, Alert } from 'react-native';
import { getTheme } from 'react-native-material-kit';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { MKButton} from 'react-native-material-kit';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import updateLoggedInPlayersView from '../graphql/updateLoggedInPlayersView';
import getCurrentLoggedInPlayersView from '../graphql/getCurrentLoggedInPlayersView';
import Loader from '../Loader';


const theme = getTheme();
const ColoredRaisedButton = MKButton.coloredButton()
  .withText('REQUEST MATCH')
  .build();
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
});

export const addMatchRequestMutation = gql`
mutation AddMatchRequestMutation($recipientId: String!, $initiatorId: String!) {
  newMatchRequest: addMatchRequest(input: {recipientId: $recipientId, initiatorId: $initiatorId}) {
    id
  }
}
`;

export const deleteMatchRequestMutation = gql`
  mutation DeleteMatchRequestMutation($id: ID!) {
    deleteMatchRequest(id:$id)
  }
`;



class Menu extends Component {
  renderScoreSelector() {
    const {currentLoggedInPlayersView: {showAll, awaitingAcceptance},
            updateLoggedInPlayersView,
            player,
            addMatchRequestMutation,
            deleteMatchRequestMutation
          } = this.props;
    if (awaitingAcceptance === true || awaitingAcceptance === 'true') {
        return (
          <View style={{alignItems:'center'}}>
            <Text>Waiting for {player.username} to respond...</Text>
            <Loader size='large'/>
          </View>
        );
    } else {
      return (
          <View style={{alignItems: 'center', marginTop: 50, height: 100}}>
          <ColoredRaisedButton
            onPress={() => {
              updateLoggedInPlayersView({
                variables: {
                  index: 'awaitingAcceptance',
                  value: 'true',
                },
              });
              addMatchRequestMutation({
                  variables: {
                    recipientId: player.id,
                    initiatorId: "5ada48e68d3f4b7cb9040ac1"
                  },
                  update: (_, {data: {newMatchRequest}}) => {
                    updateLoggedInPlayersView({
                      variables: {
                        index: 'requestId',
                        value: newMatchRequest.id
                      }
                    });
                  }
              });
            }}
          />
          </View>
        );
    }
  }

  render() {
    const {
      currentLoggedInPlayersView: {requestId, awaitingAcceptance},
      updateLoggedInPlayersView,
      deleteMatchRequestMutation,
      player
    } = this.props;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[theme.cardStyle, styles.card]}>
          <Image
              source={require('../../images/background.jpg')}
              style={[theme.cardImageStyle, styles.image]}
          />
          <EvilIcon name={'user'} size={80} style={styles.icon}/>
          <TouchableOpacity style={styles.closeIcon}
               onPress={() => {
                 updateLoggedInPlayersView({
                   variables: {
                     index: 'showAll',
                     value: 'true',
                   },
                 });
                 updateLoggedInPlayersView({
                   variables: {
                     index: 'awaitingAcceptance',
                     value: 'false'
                   },
                 });
                 if (awaitingAcceptance == 'true' || awaitingAcceptance == true) {
                   deleteMatchRequestMutation({
                     variables: {
                       id: requestId
                     },
                   });
                }
             }}>
            <Image
              source={require('../../images/close.png')}
            />
          </TouchableOpacity>
          <Text style={[theme.cardTitleStyle, styles.title1]}>{player.username}</Text>

          {this.renderScoreSelector()}
        </View>
      </ScrollView>
    );
  }
}

export default compose(
  graphql(updateLoggedInPlayersView, { name: 'updateLoggedInPlayersView'}),
  graphql(getCurrentLoggedInPlayersView, {
    props: ({ data: { currentLoggedInPlayersView }}) => ({
      currentLoggedInPlayersView
    })
  }),
  graphql(addMatchRequestMutation, {name: 'addMatchRequestMutation'}),
  graphql(deleteMatchRequestMutation, {name: 'deleteMatchRequestMutation'})
)(Menu);
