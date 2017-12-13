import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import SvgIcon from 'material-ui/SvgIcon'

export default class MessagesControls extends Component {
    constructor(props) {
        super(props);


        this.changeMessage = this.changeMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.state = {
            message: ""
        };
    }

    changeMessage(event) {
        this.setState({ message: event.target.value });
    }

    sendMessage() {
        this.setState({ message: "" });
        console.log(this.state.message);
    }

    render() {
        return (
            <div className="messages-controls">
                <textarea className="send-message-text" placeholder="Write a message..." value={this.state.message}
                          onChange={this.changeMessage}/>
                <div className="send-button-wrapper">
                    <FlatButton
                        label="Send"
                        labelPosition="before"
                        primary={true}
                        onClick={this.sendMessage}
                        icon={<SvgIcon>
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </SvgIcon>}/>
                </div>
            </div>
        )
    }
}