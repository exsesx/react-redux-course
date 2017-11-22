import React, { Component } from 'react';
import Header from 'components/Header';
import People from 'containers/People';
import { Redirect } from 'react-router-dom';
import Messages from 'containers/Messages';

export default class Chat extends Component {
    render() {
        if (!this.props.signedIn) {
            return <Redirect to="/login"/>
        }
        return (
            <div className="chat-container">
                <Header signedIn={this.props.signedIn}/>
                <People/>
                {/*<Messages />*/}
            </div>
        )
    }
}