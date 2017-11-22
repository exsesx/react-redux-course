import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Chat from 'containers/Chat';
import Authentication from 'containers/Authentication';
import Registration from 'containers/Registration';

function PrivateRoute({ component: Component, authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>}
        />
    )
}

export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/login" render={() => <Authentication signedIn={this.props.signedIn}/>}/>
                <Route exact path="/register" render={() => <Registration signedIn={this.props.signedIn}/>}/>
                <PrivateRoute authed={this.props.signedIn} path="/" component={Chat}/>
            </Switch>
        )
    }
}