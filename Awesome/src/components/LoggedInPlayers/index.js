import React, {Component} from 'react';
import {View, Text, ListView,Alert} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import getCurrentLoggedInPlayersView from '../graphql/getCurrentLoggedInPlayersView';
import updateLoggedInPlayersView from '../graphql/updateLoggedInPlayersView';
import LoggedInPlayersItem from './LoggedInPlayersItem';
import Menu from './Menu';
import RecordMatchScore from './RecordMatchScore';


export const loggedInPlayersQuery = gql`
  query LoggedInPlayersQuery {
    players: getLoggedInUsers {
      id
      username
    }
  }
`;
export const getMyMatchRequestQuery = gql`
  query GetMyMatchRequestQuery($id:ID!) {
    myMatchRequest: getMyMatchRequest(id:$id) {
      id initiator {
        username elo
      }
    }
  }
`;

export const updateMyMatchRequestMutation = gql`
  mutation UpdateMyMatchRequestMutation($id:ID!, $accepted:Boolean!,$initiatorId:String,$recipientId:String) {
    myUpdatedMatchRequest:updateMatchRequest(input: {
      id:$id
      accepted: $accepted
      initiatorId:$initiatorId
      recipientId:$recipientId
    }) {
      id matchId
    }
  }
`;
class LoggedInPlayers extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows([]),
      requestId: null,
      initiatorId: null,
      initiatorUsername: '',
      matchRequestAvailable: false,
      showRecordMatchComponent: false,
    }
  }
  /*
  User presses 'Accept' on Alert
  updates the matchrequest object by setting the accepted boolean to true, and the matchId,
  also creates
  TODO: change recipientId to be not hardcoded, but found from currently logged in user
  */
  acceptMatchRequest() {
    this.props.updateMyMatchRequestMutation({
      variables: {
        id: this.state.requestId,
        accepted:true,
        initiatorId:this.state.initiatorId,
        recipientId: "5adf784bc2dcf2c74b1fd9cf"
      },
      update: (_, {data: {myUpdatedMatchRequest}}) => {
        updateLoggedInPlayersView({
          variables: {
            index: 'matchId',
            value: myUpdatedMatchRequest.matchId
          }
        });
        updateLoggedInPlayersView({
          variables: {
            index:'initiatorId',
            value: this.state.initiatorId
          }
        });
        updateLoggedInPlayersView({
          variables: {
            index: 'initiatorUsername',
            value: this.state.initiatorUsername
          }
        });
      }
    })
    this.setState({
      matchRequestAvailable: false,
      showRecordMatchComponent: true,
    })
  }
  declineMatchRequest() {
    this.props.updateMyMatchRequestMutation({
      variables: {
        id: this.state.requestId,
        accepted:false
      }
    })
    this.setState({
      matchRequestAvailable: false,
    })
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.loggedInPlayersQuery.loading && !nextProps.loggedInPlayersQuery.error) {
      const {dataSource} = this.state
      this.setState({
        dataSource: dataSource.cloneWithRows(nextProps.loggedInPlayersQuery.players),
      })
    }

    if (!this.props.getMyMatchRequestQuery.loading && !this.props.getMyMatchRequestQuery.error && (nextProps.getMyMatchRequestQuery.myMatchRequest != null)) {
      const {getMyMatchRequestQuery: {myMatchRequest}} = this.props;
      console.log(`myMatchRequest: ${myMatchRequest}`)
      Alert.alert (
        `New Match Request from ${myMatchRequest.initiator.username}`,
        `Accept to record your score!`,
        [
          {text: 'Accept', onPress: () => this.acceptMatchRequest()},
          {text: 'Decline', onPress: () => this.declineMatchRequest()}
        ],
      )

      this.setState({
        initiatorId: myMatchRequest.initiatorId,
        initiatorUsername: myMatchRequest.initiator.username,
        requestId: myMatchRequest.id,
        matchRequestAvailable: true
      });
      /*
      () => updateLoggedInPlayersView({
        variables: {
          index: 'newMatchRequestAvailable',
          value: 'true'
        }
      });
      () => updateLoggedInPlayersView({
        variables: {
          index: 'requestId',
          value: myMatchRequest.id
        }
      });
      () => updateLoggedInPlayersView({
        variables: {
          index: 'initiatorUsername',
          value: myMatchRequest.initiator.username
        }
      });
      */
    }
  }

  renderInitialView() {
    const {
      currentLoggedInPlayersView: {showAll, selectedPlayerIndex,newMatchRequestAvailable,requestId,initiatorUsername},
      loggedInPlayersQuery,
    } = this.props;
    if (true) {
      return <RecordMatchScore />;
    }
    if (this.state.showRecordMatchComponent) {
      return <RecordMatchScore />;
    }
    if (showAll === true || showAll === 'true') {

      return (
          <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={(rowData, ssectionId, rowId) =>
              <LoggedInPlayersItem player={rowData} rowId={rowId} />
            }
          />
      );
    } else {
      return <Menu player={loggedInPlayersQuery.players[parseInt(selectedPlayerIndex)]} />;
    }
  }
  render() {
    return this.renderInitialView();
  }
}
export default compose(
  graphql(updateLoggedInPlayersView, {
    name: 'updateLoggedInPlayersView',
  }),
  graphql(loggedInPlayersQuery, {
    name: 'loggedInPlayersQuery',
    options: {
      pollInterval: 5000,
    },
  }),
  graphql(getCurrentLoggedInPlayersView, {
    props: ({ data: { currentLoggedInPlayersView }}) => ({
      currentLoggedInPlayersView
    })
  }),
  graphql(updateMyMatchRequestMutation, {
    name: 'updateMyMatchRequestMutation'
  }),
  graphql(getMyMatchRequestQuery, {
    name: 'getMyMatchRequestQuery',
    options: () => ({
      variables: {
        id: "5adf784bc2dcf2c74b1fd9cf"
      },
      pollInterval: 5000,
    }),
  })
)(LoggedInPlayers);
