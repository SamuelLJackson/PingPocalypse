import gql from 'graphql-tag';

export default gql`
  mutation updateLoggedInPlayersView($index: String!, $value: String!) {
    updateLoggedInPlayersView(index: $index, value: $value) @client {
      showAll
      awaitingAcceptance
      selectedPlayerIndex
      requestId
      newMatchRequestAvailable
      initiatorUsername
    }
  }
`;
