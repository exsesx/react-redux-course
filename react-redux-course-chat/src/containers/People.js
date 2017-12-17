import React, { Component } from 'react';
import { connect } from "react-redux";
import Avatar from 'material-ui/Avatar';
import PeopleSearch from 'components/PeopleSearch';
import ContactsSearch from 'components/ContactsSearch';
import ContactsList from 'components/ContactsList';
import { Tab, Tabs } from 'material-ui/Tabs';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import CircularProgress from 'material-ui/CircularProgress'
import Socket from 'utils/socket';

import {
    amber500 as amber,
    blue500 as blue,
    cyan500 as cyan,
    deepPurple500 as deepPurple,
    green500 as green,
    indigo500 as indigo,
    lightBlue500 as lightBlue,
    orange500 as orange,
    pink500 as pink,
    purple500 as purple,
    red500 as red,
    teal500 as teal,
    yellow500 as yellow
} from 'material-ui/styles/colors';

const colors = [red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, yellow, amber, orange];

class People extends Component {
    constructor(props) {
        super(props);

        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleContactsSearch = this.handleContactsSearch.bind(this);
        this.peopleSearchItemSelected = this.peopleSearchItemSelected.bind(this);
        this.state = {
            contactsList: [],
            noConversations: true,
            tab: "conversations"
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.conversations) {
            this.setState({ noConversations: false, contactsList: nextProps.conversations });
        } else {
            this.setState({ noConversations: true })
        }
    }

    componentDidMount() {
        Socket.emit('users:get:not-current');
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

    handleTabChange(value) {
        this.setState({
            tab: value,
        });
    }

    render() {
        return (
            <div className="dialogs-wrapper">
                <Tabs value={this.state.tab}
                      onChange={this.handleTabChange}>
                    <Tab label="My Contacts" value="conversations">
                        <ContactsSearch handleContactsSearch={this.handleContactsSearch}/>
                        {
                            this.state.contactsList.length > 0 ?
                                (<ContactsList conversations={this.state.contactsList}
                                               selectParticipant={this.props.selectParticipant}
                                               createConversation={this.props.createConversation}
                                               activeUser={this.props.userState}/>)
                                : !this.state.noConversations ?
                                <ListItem className="first-contact"
                                          hoverColor={orange}
                                          onClick={() => this.setState({ tab: "add-contacts" })}>
                                    You doesn't have any conversations yet. Add contacts?
                                </ListItem>
                                :
                                <div className="dialogs-loading-wrapper">
                                    <CircularProgress size={60} thickness={7}/>
                                </div>
                        }
                    </Tab>
                    <Tab label="Add Contacts" value="add-contacts">
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