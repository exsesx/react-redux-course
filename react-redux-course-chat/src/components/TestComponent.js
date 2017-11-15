import React, {Component} from 'react';
import socket from 'utils/socket';

export default class TestComponent extends Component {

    componentDidMount() {
        socket.on("Introduction", data => {
            console.log(data);
        })
    }


    render() {
        return (
            <h2>Hot reload works!</h2>
        )
    }
}