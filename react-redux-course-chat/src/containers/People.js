import React, { Component } from 'react';
import { connect } from "react-redux";
import Avatar from 'material-ui/Avatar';
import PeopleSearch from 'components/PeopleSearch';
import ContactsSearch from 'components/ContactsSearch';
import ContactsList from 'components/ContactsList';
import { Tabs, Tab } from 'material-ui/Tabs';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import CircularProgress from 'material-ui/CircularProgress'
import Socket from 'utils/socket';

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

class People extends Component {
    constructor(props) {
        super(props);

        this.handleContactsSearch = this.handleContactsSearch.bind(this);
        this.peopleSearchItemSelected = this.peopleSearchItemSelected.bind(this);
        this.state = {
            contactsList: []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ contactsList: nextProps.conversations });
    }

    componentDidMount() {
        Socket.emit('users:get:not-current');
        Socket.emit("conversations:get");

    }

    peopleSearchItemSelected(chosenRequest, index) {
        this.props.selectParticipant(null, chosenRequest, colors[index], "user");
    }

    handleContactsSearch(e) {
        //todo: make this works

        // let updatedList = this.state.contactsList;
        //
        // updatedList.filter( (c) => {
        //     c.participants.filter((p) => {
        //         if(p.username !== this.props.userState.username) {
        //             return c;
        //         }
        //     });
        //     console.log(c)
        // });
        // console.log(updatedList)
    }

    render() {
        return (
            <div className="dialogs-wrapper">
                <Tabs>
                    <Tab label="My Contacts">
                        <ContactsSearch handleContactsSearch={this.handleContactsSearch}/>
                        {this.state.contactsList.length > 0 ?
                            (<ContactsList conversations={this.state.contactsList}
                                           selectParticipant={this.props.selectParticipant}
                                           createConversation={this.props.createConversation}
                                           activeUser={this.props.userState}/>) :
                            <div className="dialogs-loading-wrapper">
                                <CircularProgress size={60} thickness={7}/>
                            </div>
                        }
                    </Tab>
                    <Tab label="Add Contacts">
                        <PeopleSearch dialogs={this.props.people} onSelectedItem={this.peopleSearchItemSelected}/>

                        <List className="dialogs-list">
                            {this.props.people.map((u, index) => {
                                return <ListItem
                                    key={u._id}
                                    disabled={false}
                                    leftAvatar={<Avatar
                                        backgroundColor={colors[index]}>{u.username.charAt(0)}</Avatar>}
                                    onClick={e => this.props.selectParticipant(e, u, colors[index], "user")}>
                                    {u.username}
                                </ListItem>
                            })}
                        </List>
                    </Tab>
                </Tabs>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        people: state.peopleReducer,
        conversations: state.communicationReducer.conversations
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(People);