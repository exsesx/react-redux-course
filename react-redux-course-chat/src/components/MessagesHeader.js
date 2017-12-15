import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';

export default class MessagesHeader extends Component {
    getMessagesCount = (count) => {
        if(count < 1) {
            return "No messages yet";
        }
        return "Messages: " + count;
    };

    render() {
        const { recipient, activeConversation, messagesCount } = this.props;


        return (
            <div className="messages-header">
                <div className="avatar-wrapper">
                    <Avatar backgroundColor={recipient.avatarColor} size={54}>{recipient.username[0]}</Avatar>
                </div>
                <div className="description">
                    <div className="name">{recipient.username}</div>
                    <div
                        className="muted info">{activeConversation ? this.getMessagesCount(messagesCount) : 'Conversation is not created yet'}</div>
                </div>
            </div>
        )
    }
}