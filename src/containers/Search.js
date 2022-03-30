import React, { Component } from 'react';

export default class Search extends Component {
    render() {
        const {searchString} = this.props.match.params;
        return (
            <div>{searchString}</div>
        )
    }
}