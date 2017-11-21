import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'utils/socket';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

class ErrorContainer extends Component {
    render() {
        return (
            <div className="error">
                {this.props.errorMessage}
            </div>
        )
    }
}

export default class AuthenticationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            error: ''
        };
    }

    handleUserNameChange = (event) => {
        this.setState({
            username: event.target.value,
        });
    };

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    };

    register = (event) => {
        event.preventDefault();

        let user = {
            username: this.state.username,
            password: this.state.password
        };

        axios.post('/register', user)
            .then((response) => {
                console.log(response.data);
            }, err => {

                this.setState({ error: err.response.data })
            })
    };

    render() {
        return (
            <Paper className="registration-form" zDepth={2}>
                <form onSubmit={this.register}>
                    <TextField
                        id="text-field-controlled"
                        value={this.state.username}
                        hintText="Username"
                        onChange={this.handleUserNameChange}/>
                    <TextField
                        id="text-field-controlled"
                        value={this.state.password}
                        hintText="Password"
                        onChange={this.handlePasswordChange}/>
                    <RaisedButton type="submit" label="Register" primary={true}/>
                    {this.state.error ? <ErrorContainer errorMessage={this.state.error}/> : ''}
                </form>
            </Paper>
        )
    }
}