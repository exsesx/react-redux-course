import React, { Component } from 'react';
import ChatHeader from 'components/ChatHeader';
import People from 'containers/People';
import Search from 'containers/Search';
import { Link, Route, Redirect } from 'react-router-dom';
import Messages from 'containers/Messages';

export default class Chat extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <div className="chat-container">
                <ChatHeader/>
                <People/>
                {/*<Messages />*/}
                <Route path={`/search/:searchString`} component={Search}/>
            </div>
        )
    }
}