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
                hintText="People..."
                style={{ paddingTop: 12, marginBottom: 12 }}
                filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
                dataSource={this.props.dialogs}
                dataSourceConfig={dataSourceConfig}
                fullWidth
                onNewRequest={this.props.onSelectedItem}/>
        )
    }
}