import React, { Component } from 'react';
import ChatHeader from 'components/ChatHeader';
import People from 'containers/People';
import Messages from 'containers/Messages';
import Socket from "utils/socket";
import { connect } from "react-redux";

import Snackbar from 'material-ui/Snackbar';
import { stopNotification } from 'actions';

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedRecipient: null,
            open: false,
            message: ""
        }
    }

    leaveConversation(conversation) {
        if (conversation && Object.keys(conversation).length !== 0 && conversation.constructor === Object) {
            Socket.emit("conversation:leave", conversation);
        }
    }

    selectRecipient = (e, user, color) => {
        user.avatarColor = color;
        Socket.emit("user:conversation-with:get", user._id);
        this.leaveConversation(this.props.activeConversation);
        this.setState({ selectedRecipient: user });
    };

    componentWillReceiveProps(nextProps) {
        console.log("NOTIFY", nextProps.notifications);
        if (nextProps.notifications.message) {
            this.setState({
                open: true,
                message: nextProps.notifications.message
            })
        }
    }

    handleRequestClose = () => {
        this.props.stopNotification();
        this.setState({
            open: false,
        });
    };

    render() {
        return (
            <div className="chat-container">
                <ChatHeader/>
                <People selectRecipient={this.selectRecipient} {...this.props}/>
                <Messages selectedRecipient={this.state.selectedRecipient} {...this.props}/>
                <Snackbar
                    open={this.state.open}
                    message={this.state.message}
                    action="undo"
                    autoHideDuration={3000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userState: state.userState,
        activeConversation: state.communicationReducer.activeConversation,
        notifications: state.notificationReducer
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        stopNotification: () => {dispatch(stopNotification())}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);