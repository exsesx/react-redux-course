import React, { Component } from 'react';
import ChatHeader from 'components/ChatHeader';
import People from 'containers/People';
import Messages from 'containers/Messages';
import Socket from "utils/socket";
import { connect } from "react-redux";

import Snackbar from 'material-ui/Snackbar';
import { getConversations, setActiveConversation, stopNotification } from 'actions';

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
        this.setState({ createConversation: false });
        selected.avatarColor = color;
        selected.type = type;

        Socket.emit(type === "user"
            ? "user:conversation-with:get"
            : "conversation:get", selected._id);

        this.leaveConversation(this.props.activeConversation);
        this.props.setActiveConversation(selected);

        Socket.emit("conversation:enter", selected);

        if (type === "user") {
            this.setState({ selectedRecipient: selected, selectedConversation: null });
        } else {
            this.setState({ selectedConversation: selected, selectedRecipient: null });
        }
    };

    createConversation = () => {
        this.setState({ createConversation: true })
    };

    removeConversation = (event, conversation) => {
        Socket.emit("conversation:remove", conversation);
        this.props.getConversations({ conversations: [] });
        this.props.setActiveConversation(null);
        this.setState({ selectedRecipient: null, selectedConversation: null });
    };

    componentWillReceiveProps(nextProps) {
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

    handleActionClick = () => {
        this.props.stopNotification();
        this.setState({
            open: false,
        });
    };

    doCreateConversation = (e, conversationName, recipients) => {
        Socket.emit("conversation:create", recipients, "Created conversation.", conversationName);
    };

    render() {
        return (
            <div className="chat-container">
                <ChatHeader/>
                <People selectParticipant={this.selectParticipant}
                        createConversation={this.createConversation} {...this.props}/>
                <Messages recipient={this.state.selectedRecipient}
                          conversation={this.state.selectedConversation}
                          newConversation={this.state.createConversation}
                          doCreateConversation={this.doCreateConversation}
                          removeConversation={this.removeConversation}
                          {...this.props}/>
                <Snackbar
                    open={this.state.open}
                    message={this.state.message}
                    action="Close"
                    onActionTouchTap={this.handleActionClick}
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
        },
        getConversations: (conversations) => {
            dispatch(getConversations(conversations))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);