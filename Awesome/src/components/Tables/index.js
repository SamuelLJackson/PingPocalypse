import React, {Component} from 'react';
import {View, Text, ListView} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import TableView from './TableView';
import TableMenu from './TableMenu';
import getCurrentTableView from '../graphql/getCurrentTableView';

export const tablesListQuery = gql`
  query ContactsQuery {
    tables: getAllUsers {
      id
      username
      password
      loggedIn
    }
  }
`;

class Tables extends Component {

  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows([]),
      showDetail: false,
      showAll: props.showAll,
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.tablesListQuery.loading && !nextProps.tablesListQuery.error) {
      const {dataSource} = this.state
      this.setState({
        dataSource: dataSource.cloneWithRows(nextProps.tablesListQuery.tables),
      })
    }
  }
  renderInitialView() {
    const { currentTableView: {showAll, selectedTableData}, tablesListQuery} = this.props;
    console.log(`FROM TABLES <> showAll: ${showAll}`);
    console.log(`FROM TABLES <> selectedTableData: ${selectedTableData}`);
    console.log(`FROM TABLES <> showAll == true: ${showAll == true}`);
    if (showAll === true || showAll === 'true') {
      console.log('FROM TABLES <> rendering table list')
      return (
          <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={(rowData, ssectionId, rowId) =>
              <TableView table={rowData} rowId={rowId} />
            }
          />
      );
    } else {
      return <TableMenu table={tablesListQuery.tables[parseInt(selectedTableData)]} />;
    }
  }
  render() {
    return this.renderInitialView();
  }
}


export default compose(
  graphql(tablesListQuery, {name: 'tablesListQuery'}),
  graphql(getCurrentTableView, {
    props: ({ data: { currentTableView }}) => ({
      currentTableView
    })
  })
)(Tables);
