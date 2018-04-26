import gql from 'graphql-tag';

export default gql`
  query {
    currentLoggedInPlayersView @client {
      showAll
      awaitingAcceptance
      selectedPlayerIndex
      requestId
      newMatchRequestAvailable
      initiatorUsername
    }
  }
`
