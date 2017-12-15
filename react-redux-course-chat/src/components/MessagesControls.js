import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import SvgIcon from 'material-ui/SvgIcon'

export default class MessagesControls extends Component {
    constructor(props) {
        super(props);

        this.changeMessage = this.changeMessage.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);

        this.state = {
            message: ""
        };
    }

    changeMessage(event) {
        this.setState({ message: event.target.value });
    }

    handleSend() {
        if (this.props.activeConversation) {
            this.props.sendMessage(this.props.activeConversation, this.state.message);
        } else {
            this.props.startConversation(this.props.recipient, this.state.message)
        }
        this.setState({ message: "" })
    }

    handleKeypress(e) {
        if (e.key === 'Enter') {
            this.handleSend();
        }
    }

    render() {
        return (
            <div className="messages-controls">
                <textarea className="send-message-text" placeholder="Write a message..." value={this.state.message}
                          onChange={this.changeMessage} onKeyPress={this.handleKeypress}/>
                <div className="send-button-wrapper">
                    <FlatButton
                        label={this.props.activeConversation ? "Send" : "Start"}
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