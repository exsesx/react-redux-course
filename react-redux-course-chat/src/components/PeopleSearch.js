import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';

const dataSourceConfig = {
    text: 'name',
    value: 'name',
};

export default class PeopleSearch extends Component {
    render() {
        return (
            <AutoComplete
                hintText="Search"
                style={{ padding: 12 }}
                filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
                dataSource={this.props.dialogs}
                dataSourceConfig={dataSourceConfig}
                fullWidth/>
        )
    }
}