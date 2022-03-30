import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import MessageContainer from 'components/MessageContainer';
import axios from 'axios';
import Socket from 'utils/socket';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


export default class AuthenticationForm extends Component {
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

    authenticate = (event) => {
        event.preventDefault();

        let user = {
            username: this.state.username,
            password: this.state.password
        };

        axios.post('/login', user)
            .then((response) => {
                localStorage.setItem("chatToken", response.data.token);
                Socket.init();
            }, err => {
                this.setState({ message: {data: err.response.data, type: 'error'} });
            })
    };

    render() {
        if(this.props.isAuthenticated) {
            return <Redirect to="/"/>
        }

        return (
            <Paper className="authentication-form" zDepth={2}>
                <form onSubmit={this.authenticate}>
                    <TextField
                        id="text-field-controlled"
                        value={this.state.username}
                        hintText="Username"
                        onChange={this.handleUserNameChange}/>
                    <TextField
                        id="text-field-controlled"
                        value={this.state.password}
                        hintText="Password"
                        type="password"
                        onChange={this.handlePasswordChange}/>
                    <RaisedButton type="submit" label="Login" primary={true}/>
                    <Link to="/register" style={{ marginTop: 15 }}>Don't have an account yet?</Link>
                </form>
                {this.state.message ? <MessageContainer message={this.state.message}/> : ''}
            </Paper>
        )
    }
}