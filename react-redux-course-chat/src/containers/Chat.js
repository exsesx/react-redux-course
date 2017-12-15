import React, { Component } from 'react';
import ChatHeader from 'components/ChatHeader';
import People from 'containers/People';
import Messages from 'containers/Messages';
import Socket from "utils/socket";
import { connect } from "react-redux";

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedRecipient: null
        }
    }

    leaveConversation(conversation) {
        if(conversation && Object.keys(conversation).length !== 0 && conversation.constructor === Object) {
            Socket.emit("conversation:leave", conversation);
        }
    }

    selectRecipient = (e, user, color) => {
        user.avatarColor = color;
        Socket.emit("user:conversation-with:get", user._id);
        this.leaveConversation(this.props.activeConversation);
        this.setState({ selectedRecipient: user });
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

const mapStateToProps = (state) => {
    return {
        userState: state.userState,
        activeConversation: state.communicationReducer.activeConversation
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);