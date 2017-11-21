import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthenticationForm from 'components/AuthenticationForm';

export default class Authentication extends Component {
    render() {
        if (this.props.signedIn === true) {
            return <Redirect to="/"/>
        }
        return (
            <AuthenticationForm />
        )
    }
}