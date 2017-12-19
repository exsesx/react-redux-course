import React, { Component } from 'react';

export default class MessagesHistory extends Component {
    componentDidUpdate() {
        if (this.messageHistoryWrapper) {
            this.messageHistoryWrapper.parentNode.scrollTop = this.messageHistoryWrapper.scrollHeight;
        }
    }

    checkSender(message) {
        return (message.author._id === this.props.activeUser._id)
            || (message.author === this.props.activeUser._id);
    }

    checkUpdating(message) {
        return (message._id === this.props.currentMessage._id);
    }

    render() {
        const { messages } = this.props;
        if (messages) {
            return (
                <div className="messages-history">
                    <div className="history-messages-wrapper">
                        <div ref={messageHistoryWrapper => this.messageHistoryWrapper = messageHistoryWrapper}>
                            {this.props.messages.map((m) => {
                                let date = new Date(m.createdAt).toLocaleTimeString("en-US");
                                return (
                                    <div key={m._id}
                                         className={"message-wrapper " + (this.checkSender(m) ? 'justify-right' : 'justify-left')
                                         + (this.checkUpdating(m) ? " selected" : "")}>
                                        <div
                                            className={"chat-bubble " + (this.checkSender(m) ? 'my-message' : 'recipient-message')}>
                                            {m.body}</div>
                                        <div className="message-info">
                                            {this.props.activeConversation && this.props.activeConversation.participants.length > 2 &&
                                            <div className="author">{m.author.username}</div>}
                                            <div className="timestamp">{date}</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="messages-history"/>
            )
        }
    }
}