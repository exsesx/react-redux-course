import React, { Component } from 'react';
import { connect } from "react-redux";
import Avatar from 'material-ui/Avatar';
import PeopleSearch from 'components/PeopleSearch';
import { Tabs, Tab } from 'material-ui/Tabs';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Socket from 'utils/socket';

import { startConversation } from "actions";

import {
    red500 as red,
    pink500 as pink,
    purple500 as purple,
    deepPurple500 as deepPurple,
    indigo500 as indigo,
    blue500 as blue,
    lightBlue500 as lightBlue,
    cyan500 as cyan,
    teal500 as teal,
    green500 as green,
    yellow500 as yellow,
    amber500 as amber,
    orange500 as orange
} from 'material-ui/styles/colors';

const colors = [red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, yellow, amber, orange];

function getRandomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

class People extends Component {
    componentDidMount() {
        Socket.emit('users:get:not-current');
        Socket.emit("conversations:get");
    }

    render() {
        return (
            <div className="dialogs-wrapper">
                <Tabs>
                    <Tab label="My Contacts">
                        <PeopleSearch dialogs={this.props.people} hint="Local"/>
                    </Tab>
                    <Tab label="Add Contacts">
                        <PeopleSearch dialogs={this.props.people} hint="Global"/>
                    </Tab>
                </Tabs>
                <List className="dialogs-list">
                    {this.props.people.map((u, index) => {
                        return <ListItem
                            key={u._id}
                            disabled={false}
                            leftAvatar={<Avatar
                                backgroundColor={colors[index]}>{u.username[0]}</Avatar>}
                            onClick={e => this.props.selectRecipient(e, u, colors[index])}>
                            {u.username}
                        </ListItem>
                    })}
                </List>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        people: state.peopleReducer
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(People);