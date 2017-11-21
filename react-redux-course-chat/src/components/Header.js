import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import store from 'store/index';
import { Link } from 'react-router-dom';
import { userLogout } from "actions/index";

const { dispatch } = store;

export class Menu extends Component {
    render() {
        if (this.props.signedIn) {
            return (
                <div className="header-menu">
                    <FlatButton label="Home" containerElement={<Link to="/"/>}/>
                    <FlatButton label="Logout" onClick={() => dispatch(userLogout())}/>
                </div>
            )
        }

        return (
            <div className="header-menu">
                <FlatButton label="Home" containerElement={<Link to="/"/>}/>
                <FlatButton label="Login" containerElement={<Link to="/login"/>}/>
                <FlatButton label="Register" containerElement={<Link to="/register"/>}/>
                <FlatButton label="Logout" onClick={() => dispatch(userLogout())}/>
            </div>
        )
    }
}

export default class Header extends Component {
    render() {
        return (
            <AppBar
                title="Title">
                <Menu signedIn={this.props.signedIn}/>
            </AppBar>
        )
    }
}