import React, { Component } from 'react';

export default class AuthenticationPage extends Component {
    render() {
        return (
            <div>
                <h2>Authentication</h2>
                <form action="">
                    <input type="text"/>
                    <input type="text"/>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}