import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

export default class MessagesHeader extends Component {
    constructor(props) {
        super(props);

        this.getMembers = this.getMembers.bind(this);
        this.state = {
            open: false,
        };
    }

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

    getMembers = (conversation) => {
        if (conversation && conversation.participants.length > 2) {
            if (conversation.participants.length > 8) {
                return <div>{conversation.participants.length} members...</div>
            }
            return (<div>
                <div onClick={this.handleClick}>
                    {conversation.participants.length} members
                    <Popover
                        open={this.state.open}
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                        animation={PopoverAnimationVertical}
                        onRequestClose={this.handleRequestClose}>
                        <Menu>
                            {conversation.participants.map((p) => {
                                return <MenuItem key={p._id} primaryText={p.username} disabled/>
                            })}
                        </Menu>
                    </Popover>
                </div>
            </div>)
        }
        return null;
    };

    renderRemoveButton(conversation) {
        if (conversation) {
            return <FlatButton label="Remove conversation" secondary={true}
                               onClick={e => this.props.removeConversation(e, this.props.activeConversation)}/>
        }
        return null;
    }

    handleClick = (event) => {
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        const { activeConversation, messagesCount, recipient } = this.props,
            backgroundColor = recipient ? recipient.avatarColor : activeConversation.avatarColor,
            avatarLetter = recipient ? recipient.username.charAt(0) : this.getAvatarLetter(activeConversation),
            mainTitle = recipient ? recipient.username : this.getConversationName(activeConversation),
            members = recipient ? "" : this.getMembers(activeConversation),
            removeButton = recipient ? null : this.renderRemoveButton(activeConversation);


        return (
            <div className="messages-header">
                <div className="conversation-info">
                    <div className="avatar-wrapper">
                        <Avatar backgroundColor={backgroundColor} size={54}>{avatarLetter}</Avatar>
                    </div>
                    <div className="description">
                        <div className="name">{mainTitle}</div>
                        <div
                            className="muted info">{this.getMessagesCount(messagesCount, activeConversation)}</div>
                    </div>
                </div>
                <div className="members">
                    {members}
                </div>
                <div className="remove-conversation">
                    {removeButton}
                </div>
            </div>
        )
    }
}