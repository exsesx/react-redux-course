import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';

const dataSourceConfig = {
    text: 'username',
    value: 'username',
};

export default class PeopleSearch extends Component {
    render() {
        return (
            <AutoComplete
                hintText="Search..."
                style={{ paddingTop: 12, paddingBottom: 12 }}
                filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
                dataSource={this.props.dialogs}
                dataSourceConfig={dataSourceConfig}
                fullWidth/>
        )
    }
}