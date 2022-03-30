import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MessageContainer from 'components/MessageContainer';
import axios from 'axios';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

export default class RegistrationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            message: ''
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
                this.setState({ message: {data: response.data, type: 'success'} });
            }, err => {
            console.log(err);
                this.setState({ message: {data: err.response.data, type: 'error'} })
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
                    <Link to="/login" style={{marginTop: 15}}>Sign in</Link>
                    {this.state.message ? <MessageContainer message={this.state.message}/> : ''}
                </form>
            </Paper>
        )
    }
}