import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';

export default class MessagesHeader extends Component {
    getMessagesCount = (count, activeConversation) => {
        if (count) {
            return "Messages: " + count;
        } else if (activeConversation && count < 1) {
            return "No messages yet";
        } else {
            return "Conversation is not created yet";
        }
    };

    getConversationName(conversation) {
        if (conversation.name === null) {
            console.log(conversation);
            if (conversation.participants[0]._id === this.props.activeUser._id) {
                return conversation.participants[1].username;
            } else if (conversation.participants[1]._id === this.props.activeUser._id) {
                return conversation.participants[0].username;
            }
        } else {
            return conversation.name;
        }
    }

    getAvatarLetter(conversation) {
        return this.getConversationName(conversation).charAt(0);
    }

    render() {
        const { activeConversation, messagesCount, recipient } = this.props,
            backgroundColor = recipient ? recipient.avatarColor : activeConversation.avatarColor,
            avatarLetter = recipient ? recipient.username.charAt(0) : this.getAvatarLetter(activeConversation),
            mainTitle = recipient ? recipient.username : this.getConversationName(activeConversation);


        return (
            <div className="messages-header">
                <div className="avatar-wrapper">
                    <Avatar backgroundColor={backgroundColor} size={54}>{avatarLetter}</Avatar>
                </div>
                <div className="description">
                    <div className="name">{mainTitle}</div>
                    <div
                        className="muted info">{this.getMessagesCount(messagesCount, activeConversation)}</div>
                </div>
            </div>
        )
    }
}