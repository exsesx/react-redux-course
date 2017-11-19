import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chat from 'containers/Chat';
import AuthenticationPage from 'containers/Authentication';

class Main extends Component {
    render() {
        return (
            <div>
                <div>Header</div>
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