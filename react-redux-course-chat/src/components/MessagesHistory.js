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

    render() {
        const { messages } = this.props;
        if (messages) {
            return (
                <div className="messages-history">
                    <div className="history-messages-wrapper">
                        <div ref={messageHistoryWrapper => this.messageHistoryWrapper = messageHistoryWrapper}>
                            {this.props.messages.reverse().map((m) => {
                                return (
                                    <div key={m._id}
                                         className={"message-wrapper " + (this.checkSender(m) ? 'justify-right' : 'justify-left')}>
                                        <div
                                            className={"chat-bubble " + (this.checkSender(m) ? 'my-message' : 'recipient-message')}
                                        >{m.body}</div>
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