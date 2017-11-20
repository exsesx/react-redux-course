import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from 'containers/Header';
import Chat from 'containers/Chat';
import AuthenticationPage from 'containers/Authentication';

class Main extends Component {
    render() {
        return (
            <div>
                <Header />
                {this.props.userState.signedIn ? <Chat/> : <AuthenticationPage/>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        userState: state.userState
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);