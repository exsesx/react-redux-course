import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Chat from 'containers/Chat';
import LinearProgress from 'material-ui/LinearProgress';
import Authentication from 'containers/Authentication';
import Registration from 'containers/Registration';

const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
        )
    )}/>
);

class notFound extends Component {
    render() {
        return <div>Not found</div>
    }
}

export default class Routes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gotProps: false
        }
    }

    componentWillReceiveProps() {
        this.setState({ gotProps: true })
    }

    // todo: why register uses render??
    render() {
        if (this.state.gotProps) {
            return (
                <Switch>
                    <Route path="/register" render={() => <Registration/>}/>
                    <Route path="/login" component={Authentication}/>
                    <PrivateRoute isAuthenticated={this.props.userState.signedIn} component={Chat} path="/"/>
                    <Route component={notFound}/>
                </Switch>
            )
        } else {
            return <LinearProgress mode="indeterminate"/>
        }
    }
}