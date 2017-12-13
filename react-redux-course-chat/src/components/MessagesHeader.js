import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';

export default class MessagesHeader extends Component {
    render() {
        const { recipient } = this.props;
        return (
            <div className="messages-header">
                <div className="avatar-wrapper">
                    <Avatar backgroundColor={recipient.avatarColor} size={54}>{recipient.username[0]}</Avatar>
                </div>
                <div className="description">
                    <div className="name">{recipient.username}</div>
                    <div className="muted info">No messages yet</div>
                </div>
            </div>
        )
    }
}