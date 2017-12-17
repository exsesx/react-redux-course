import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

export default class ContactsSearch extends Component {
    render() {
        return (
            <TextField
                hintText="Contacts..."
                style={{ paddingTop: 12, marginBottom: 12 }}
                fullWidth onChange={this.props.handleContactsSearch}/>
        )
    }
}