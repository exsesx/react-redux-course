import React, { Component } from 'react';
import ChatHeader from 'components/ChatHeader';
import People from 'containers/People';
import Messages from 'containers/Messages';

export default class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedRecipient: null
        }
    }

    selectRecipient = (e, user, color) => {
        user.avatarColor = color;
        this.setState({selectedRecipient: user});
    };

    render() {
        return (
            <div className="chat-container">
                <ChatHeader/>
                <People selectRecipient={this.selectRecipient} {...this.props}/>
                <Messages selectedRecipient={this.state.selectedRecipient} {...this.props}/>
            </div>
        )
    }
}