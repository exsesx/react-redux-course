import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import RegistrationForm from 'components/RegistrationForm';

export default class Registration extends Component {
    register(e) {
        e.preventDefault();

        let user = {
            username: this.loginInput.value,
            password: this.passwordInput.value
        };

        axios.post('/register', user)
            .then((response) => {
                console.log(response.data);
            })
    }

    render() {
        if (this.props.signedIn) {
            return <Redirect to="/"/>
        }
        return (
            <RegistrationForm/>
        )
    }
}