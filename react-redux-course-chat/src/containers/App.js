import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from 'components/Header';
import Routes from 'routes/index';

import 'styles/styles.scss';

class App extends Component {
    render() {
        const signedIn = this.props.userState.signedIn;
        return (
            <Routes signedIn={signedIn}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userState: state.userState
    }
};

export default withRouter(connect(mapStateToProps)(App));