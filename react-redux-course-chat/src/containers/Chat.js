import React, { Component } from 'react';
import ChatHeader from 'components/ChatHeader';
import People from 'containers/People';
import Messages from 'containers/Messages';
import Socket from "utils/socket";
import { connect } from "react-redux";

import Snackbar from 'material-ui/Snackbar';
import { setActiveConversation, stopNotification } from 'actions';

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedConversation: null,
            selectedRecipient: null,
            createConversation: false,
            open: false,
            message: ""
        }
    }

    leaveConversation(conversation) {
        if (conversation && Object.keys(conversation).length !== 0 && conversation.constructor === Object) {
            Socket.emit("conversation:leave", conversation);
        }
    }

    selectParticipant = (e, selected, color, type) => {
        this.setState({createConversation: false});
        selected.avatarColor = color;
        selected.type = type;
        Socket.emit(type === "user"
            ? "user:conversation-with:get"
            : "conversation:get", selected._id);
        this.leaveConversation(this.props.activeConversation);
        if (type === "user") {
            this.setState({selectedRecipient: selected, selectedConversation: null});
        } else {
            this.setState({selectedConversation: selected, selectedRecipient: null});
        }
    };

    createConversation = (e) => {
        this.setState({createConversation: true})
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
                <People selectParticipant={this.selectParticipant} createConversation={this.createConversation} {...this.props}/>
                <Messages recipient={this.state.selectedRecipient}
                          conversation={this.state.selectedConversation}
                          newConversation={this.state.createConversation}
                          {...this.props}/>
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
        stopNotification: () => {
            dispatch(stopNotification())
        },
        setActiveConversation: (conversation) => {
            dispatch(setActiveConversation(conversation))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);