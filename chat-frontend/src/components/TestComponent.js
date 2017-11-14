import React, {Component} from 'react';
import socket from 'utils/socket';

export default class TestComponent extends Component {
    componentDidMount() {
        socket.on(`connection`, data => {
            console.log('user connected');
            console.log(data);
        })
    }

    render() {
        return (
            <h2>Hello World!</h2>
        )
    }
}