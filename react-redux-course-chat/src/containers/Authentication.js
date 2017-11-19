import React, { Component } from 'react';
import axios from 'axios';
import { socket, emit } from 'utils/socket';

export default class AuthenticationPage extends Component {
    auth(e) {
        e.preventDefault();

        let user = {
            username: this.loginInput.value,
            password: this.passwordInput.value
        };

        axios.post('/login', user)
            .then((response) => {
                console.log(response.data);
                localStorage.setItem('chatToken', response.data.token);
                emit('users:get');
            })
    }

    render() {
        return (
            <div>
                <h2>Authentication</h2>
                <form>
                    <input type="text" ref={(loginInput => this.loginInput = loginInput)}/>
                    <input type="text" ref={(passwordInput) => this.passwordInput = passwordInput}/>
                    <button onClick={(e) => this.auth(e)}>Submit</button>
                </form>
            </div>
        )
    }
}