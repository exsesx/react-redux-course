import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class NewConversation extends Component {
    state = {
        values: [],
    };

    handleChange = (event, index, values) => {
        console.log(values);
        this.setState({ values });
    };

    menuItems(values) {
        return this.props.people.map((u) => (
            <MenuItem
                key={u._id}
                insetChildren={true}
                checked={values && values.indexOf(u) > -1}
                value={u}
                primaryText={u.username}
            />
        ));
    }

    render() {
        const { values } = this.state;
        return (
            <div className="create-new-conversation">
                <div className="conversation-inputs">
                    <TextField hintText="Enter a name for the new conversation..."/>
                    <SelectField
                        multiple={true}
                        hintText="Select recipients"
                        value={values}
                        onChange={this.handleChange}>
                        {this.menuItems(values)}
                    </SelectField>
                </div>
                <div className="conversation-submit">
                    <RaisedButton label="Create conversation" secondary={true}/>
                </div>
            </div>
        );
    }
}