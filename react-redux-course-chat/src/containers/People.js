import React, { Component } from 'react';
import { connect } from "react-redux";
import Avatar from 'material-ui/Avatar';
import PeopleSearch from 'components/PeopleSearch';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

class People extends Component {
    render() {
        return (
            <div className="dialogs-wrapper">
                <PeopleSearch dialogs={this.props.people}/>
                <List className="dialogs-list">
                    {this.props.people.map(u => {
                        return <ListItem
                            key={u.id}
                            disabled={false}
                            leftAvatar={<Avatar>{u.name[0]}</Avatar>}>
                            {u.name}
                        </ListItem>
                    })}
                </List>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        people: state.peopleReducer
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(People);