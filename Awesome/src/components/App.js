/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Navigation from './Navigation';
import firebase from 'firebase';
import Login from './Login';
import Loader from './Loader';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

import {ApolloClient} from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {withClientState} from 'apollo-link-state';
import {ApolloLink} from 'apollo-link';
import gql from 'graphql-tag';

const PORT = 4000;
const cache = new InMemoryCache();
//graphQL-esque query that sets default state
const defaultState = {
  loggedIn: true,
  currentTableView: {
    __typename: 'CurrentTableView',
    showAll: true,
    selectedTableData: null,
  },
  currentLoggedInPlayersView: {
    __typename: 'CurrentLoggedInPlayersView',
    showAll: true,
    awaitingAcceptance: false,
    selectedPlayerIndex: null,
    requestId: '',
    newMatchRequestAvailable: false,
    initiatorUsername: '',
    matchId: '',
  }
}

//set up link to state obj for client creation
const stateLink = withClientState({
  cache,
  defaults: defaultState,
  resolvers: {
    Mutation: {
      updateTableView: (_, { index, value}, {cache}) => {
        const query = gql`
          query getCurrentTableView{
            currentTableView @client {
              __typename
              showAll
              selectedTableData
            }
          }
        `;
        const previousState = cache.readQuery({ query });
        const data = {
          ...previousState,
          currentTableView: {
            ...previousState.currentTableView,
            [index]: value
          },
        }
        cache.writeData({ query, data })
      },
      updateLoggedInPlayersView: (_, {index,value}, {cache}) => {
        const query = gql`
          query getCurrentLoggedInPlayersView{
            currentLoggedInPlayersView @client {
              __typename
              showAll
              selectedPlayerIndex
              awaitingAcceptance
              requestId
              newMatchRequestAvailable
              initiatorUsername
            }
          }
        `;
        const previousState = cache.readQuery({ query});
        const data = {
          ...previousState,
          currentLoggedInPlayersView: {
            ...previousState.currentLoggedInPlayersView,
            [index]: value
          },
        }
        cache.writeData({ query, data})
      },
    }
  }
})

const client = new ApolloClient({
    link: ApolloLink.from([
      stateLink,
      new HttpLink({uri: `http://localhost:${PORT}/graphql`}),
    ]),
    cache
});
export default class App extends Component<{}> {
  state = {loggedIn:true};
    componentWillMount() {
        firebase.initializeApp({
          apiKey: "AIzaSyD3r0v8SvxnVjvdu-roXDKQiGeRHoL89aY",
          authDomain: "lyndacrm-ebd32.firebaseapp.com",
          databaseURL: "https://lyndacrm-ebd32.firebaseio.com",
          projectId: "lyndacrm-ebd32",
          storageBucket: "lyndacrm-ebd32.appspot.com",
          messagingSenderId: "1082274662474"
        });
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            this.setState({ loggedIn: true });
          } else {
            this.setState({ loggedIn: false});
          }
        });
    }

    renderInitialView() {
      switch (this.state.loggedIn) {
        case true:
          return <Navigation />;
        case false:
          return (<View style={styles.container}><Login /></View>);
        default:
          return (<View style={styles.container}><Loader size="large" /></View>);
      }
    }

  render() {
    return (
      <ApolloProvider client={client}>
        {this.renderInitialView()}
      </ApolloProvider>
    );
  }
}
