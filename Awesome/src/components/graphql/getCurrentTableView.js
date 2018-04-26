import gql from 'graphql-tag';

export default gql`
  query {
    currentTableView @client {
      showAll
      selectedTableData
    }
  }
`
