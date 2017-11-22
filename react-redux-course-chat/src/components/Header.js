import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MobileMenu from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';
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
            </div>
        )
    }
}

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    handleToggle = () => this.setState({ open: !this.state.open });

    handleClose = () => this.setState({ open: false });

    render() {
        return (
            <AppBar
                title="Title"
                iconElementLeft={
                    <IconButton onClick={this.handleToggle}><MobileMenu/></IconButton>
                }>
                <Menu signedIn={this.props.signedIn}/>
                <Drawer
                    docked={false}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({ open })}>
                    <MenuItem onClick={this.handleClose}>Menu Item</MenuItem>
                    <MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem>
                </Drawer>
            </AppBar>
        )
    }
}