import React, {Component} from 'react';

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