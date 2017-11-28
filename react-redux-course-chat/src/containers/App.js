import React, { Component } from 'react';
import { connect } from 'react-redux';
import { connectToWebSocket } from 'utils/socket';
import { withRouter } from 'react-router-dom';
import Routes from 'routes/index';

import 'styles/styles.scss';

connectToWebSocket();

class App extends Component {
    render() {
        return (
            <Routes {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userState: state.userState
    }
};

export default withRouter(connect(mapStateToProps)(App));