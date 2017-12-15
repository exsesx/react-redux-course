import React, { Component } from 'react';
import MessagesHeader from 'components/MessagesHeader';
import MessagesHistory from 'components/MessagesHistory';
import MessagesControls from 'components/MessagesControls';
import { connect } from "react-redux";

import Socket from 'utils/socket';

class Messages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeConversation: null
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ activeConversation: nextProps.communications.activeConversation });
    }

    sendMessage(conversation, message) {
        if(!message) return;
        Socket.emit("message:send", conversation, message);
        Socket.emit("messages:get", conversation);
    }

    startConversation(user, message) {
        Socket.emit("conversation:create", user, message);
    }

    render() {
        const messagesCount = this.props.communications.messages ? this.props.communications.messages.length : null;
        const { selectedRecipient } = this.props;
        if (selectedRecipient) {
            return (
                <div className="messages-wrapper">
                    <MessagesHeader recipient={selectedRecipient}
                                    messagesCount={messagesCount}
                                    activeConversation={this.state.activeConversation}/>
                    <MessagesHistory activeUser={this.props.userState} messages={this.props.communications.messages}/>
                    <MessagesControls recipient={selectedRecipient} activeConversation={this.state.activeConversation}
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
        communications: state.communicationReducer
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);