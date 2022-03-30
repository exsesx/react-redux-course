import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class NewConversation extends Component {
    state = {
        values: [],
        conversationName: ""
    };

    handleChange = (event, index, values) => {
        this.setState({ values });
    };

    handleConversationNameChange = (event) => {
        this.setState({ conversationName: event.target.value });
    };

    menuItems(values) {
        return this.props.people.map((u) => (
            <MenuItem
                key={u._id}
                insetChildren={true}
                checked={values && values.indexOf(u._id) > -1}
                value={u._id}
                primaryText={u.username}
            />
        ));
    }

    render() {
        const { values } = this.state;
        return (
            <div className="create-new-conversation">
                <div className="conversation-inputs">
                    <TextField hintText="Enter a name for the new conversation..."
                               onChange={this.handleConversationNameChange}/>
                    <SelectField
                        multiple={true}
                        hintText="Select recipients"
                        value={values}
                        onChange={this.handleChange}>
                        {this.menuItems(values)}
                    </SelectField>
                </div>
                <div className="conversation-submit">
                    <RaisedButton onClick={e => this.props.doCreateConversation(e, this.state.conversationName, values)}
                                  label="Create conversation" secondary={true}/>
                </div>
            </div>
        );
    }
}