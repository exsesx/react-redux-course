import React, { Component } from 'react';
import MessagesHeader from 'components/MessagesHeader';
import MessagesHistory from 'components/MessagesHistory';
import MessagesControls from 'components/MessagesControls';
import NewConversation from 'components/NewConversation';
import { connect } from "react-redux";

import Socket from 'utils/socket';

class Messages extends Component {
    sendMessage(conversation, message) {
        if (!message) return;
        Socket.emit("message:send", conversation, message);
        Socket.emit("messages:get", conversation);
    }

    startConversation(user, message) {
        Socket.emit("conversation:create", user, message);
    }

    render() {
        const messagesCount = this.props.communications.messages ? this.props.communications.messages.length : null;
        const { recipient, conversation } = this.props;

        if (this.props.newConversation) {
            return (
                <div className="messages-wrapper">

                        <NewConversation people={this.props.people}/>

                </div>
            )
        }

        if (recipient || conversation) {
            return (
                <div className="messages-wrapper">
                    <MessagesHeader
                        recipient={recipient}
                        activeUser={this.props.userState}
                        messagesCount={messagesCount}
                        activeConversation={this.props.conversation}/>
                    <MessagesHistory activeUser={this.props.userState} messages={this.props.communications.messages}/>
                    <MessagesControls recipient={recipient}
                                      activeConversation={this.props.conversation}
                                      sendMessage={this.sendMessage}
                                      startConversation={this.startConversation}/>
                </div>
            )
        } else {
            return (
                <div className="no-recipient">Please select a chat to start messaging</div>
            )
        }

    }
}

const mapStateToProps = (state) => {
    return {
        communications: state.communicationReducer,
        people: state.peopleReducer
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);