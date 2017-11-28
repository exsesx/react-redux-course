import React, { Component } from 'react';
import AuthenticationForm from 'components/AuthenticationForm';

export default class Authentication extends Component {
    render() {
        return (
            <AuthenticationForm {...this.props}/>
        )
    }
}