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
            <div>
                <Header signedIn={signedIn}/>
                <Routes signedIn={signedIn}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userState: state.userState
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));