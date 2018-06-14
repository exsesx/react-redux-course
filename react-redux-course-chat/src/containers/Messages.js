import React, { Component } from 'react';
import MessagesHeader from 'components/MessagesHeader';
import MessagesHistory from 'components/MessagesHistory';
import MessagesControls from 'components/MessagesControls';
import NewConversation from 'components/NewConversation';
import { connect } from "react-redux";

import Socket from 'utils/socket';
import { setCurrentMessage } from "actions";

class Messages extends Component {
    sendMessage = (conversation, message) => {
        if (!message) return;
        Socket.emit("message:send", conversation, message);
        Socket.emit("conversations:get");
        Socket.emit("messages:get", conversation);
    };

    startConversation = (user, message) => {
        Socket.emit("conversation:create", user, message);
    };

    selectCurrentMessage = () => {
        Socket.emit('messages:get-current', this.props.conversation);
    };

    updateCurrentMessage = (success, message, newMessage) => {
        if(success) {
            Socket.emit("message:update", message._id, newMessage);
        }
        this.props.setCurrentMessage({});
    };

    render() {
        const messagesCount = this.props.communications.messages ? this.props.communications.messages.length : null;
        const { recipient, conversation } = this.props;

        if (this.props.newConversation) {
            return (
                <div className="messages-wrapper">
                    <NewConversation people={this.props.people} doCreateConversation={this.props.doCreateConversation}/>
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
                        removeConversation={this.props.removeConversation}
                        activeConversation={this.props.conversation}/>
                    <MessagesHistory activeUser={this.props.userState} messages={this.props.communications.messages}
                                     activeConversation={this.props.conversation}
                                     currentMessage={this.props.communications.message}/>
                    <MessagesControls recipient={recipient}
                                      activeConversation={this.props.conversation}
                                      sendMessage={this.sendMessage}
                                      startConversation={this.startConversation}
                                      selectCurrentMessage={this.selectCurrentMessage}
                                      setCurrentMessage={this.props.setCurrentMessage}
                                      currentMessage={this.props.communications.message}
                                      updateCurrentMessage={this.updateCurrentMessage}/>
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
        setCurrentMessage: (message) => {
            dispatch(setCurrentMessage(message))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);