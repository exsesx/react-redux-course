import React, { Component } from 'react';

export default class MessageContainer extends Component {
    render() {
        const { message } = this.props;
        return (
            <div className={"message " + message.type}>
                {message.data}
            </div>
        )
    }
}