import React, { Component } from 'react';
import MessagesHeader from 'components/MessagesHeader';
import MessagesHistory from 'components/MessagesHistory';
import MessagesControls from 'components/MessagesControls';
import { connect } from "react-redux";
import Socket from 'utils/socket';

class Messages extends Component {
    componentDidUpdate() {
        const { selectedRecipient } = this.props,
            { conversations } = this.props.communications;
        console.log(this.props);
        if(selectedRecipient) {
            Socket.emit("conversation:get", selectedRecipient._id);
        }

        console.log(selectedRecipient);
    }

    render() {
        const { selectedRecipient } = this.props;
        if (selectedRecipient) {
            return (
                <div className="messages-wrapper">
                    <MessagesHeader recipient={selectedRecipient}/>
                    <MessagesHistory/>
                    <MessagesControls/>
                </div>
            )
        } else {
            return (
                <div className="no-recipient">Select conversation and start chatting</div>
            )
        }

    }
}

const mapStateToProps = (state) => {
    return {
        communications: state.communicationReducer
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);