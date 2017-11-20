import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import store from 'store';
import { userLogout } from "actions";

const {dispatch} = store;

export class Menu extends Component {
    logout() {
        dispatch(userLogout());
    }

    render() {
        return (
            <span>
            <FlatButton label="Home"/>
            <FlatButton label="Login"/>
            <FlatButton label="Register"/>
            <FlatButton label="Logout" onClick={() => this.logout()}/>
        </span>
        )
    }
}

export default class Header extends Component {
    render() {
        return (
            <AppBar
                title="Title">
                <Menu/>
            </AppBar>
        )
    }
}