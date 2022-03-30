import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import SvgIcon from 'material-ui/SvgIcon'

export default class MessagesControls extends Component {
    constructor(props) {
        super(props);

        this.changeMessage = this.changeMessage.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

        this.state = {
            message: "",
            isUpdating: false
        };
    }

    changeMessage(event) {
        this.setState({ message: event.target.value });
    }

    handleSend() {
        if (this.props.activeConversation) {
            this.props.sendMessage(this.props.activeConversation, this.state.message.trim());
        } else {
            this.props.startConversation(this.props.recipient, this.state.message.trim())
        }
        this.setState({ message: "" })
    }

    componentWillReceiveProps(nextProps) {
        const currentMessage = nextProps.currentMessage;
        if (currentMessage && Object.keys(currentMessage).length !== 0 && currentMessage.constructor === Object) {
            this.setState({ message: nextProps.currentMessage.body, isUpdating: true })
        }
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (this.state.isUpdating) {
                if (this.state.message.trim() === this.props.currentMessage.body) {
                    this.setState({ isUpdating: false, message: "" });
                    return this.props.updateCurrentMessage(null);
                }
                this.props.updateCurrentMessage(true, this.props.currentMessage, this.state.message.trim());
                return this.setState({ message: "" });
            }
            this.handleSend();
        }
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.props.selectCurrentMessage();
        }
    }

    handleKeyUp = (e) => {
        if (e.target.value === "") {
            if (this.state.isUpdating) {
                this.props.setCurrentMessage({});
            }
            this.setState({ isUpdating: false });
        }
    };

    render() {
        return (
            <div className="messages-controls">
                <textarea className="send-message-text" placeholder="Write a message..." value={this.state.message}
                          onChange={this.changeMessage} onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp}/>
                <div className="send-button-wrapper">
                    <FlatButton
                        label={
                            this.props.activeConversation
                                ? this.state.isUpdating ? "Update" : "Send"
                                : "Start"}
                        labelPosition="before"
                        primary={true}
                        onClick={this.handleSend}
                        icon={<SvgIcon>
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </SvgIcon>}/>
                </div>
            </div>
        )
    }
}