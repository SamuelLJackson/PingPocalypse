import gql from 'graphql-tag';

export default gql`
  mutation updateTableView($index: String!, $value: String!) {
    updateTableView(index: $index, value: $value) @client {
      showAll
      selectedTableData
    }
  }
`;
