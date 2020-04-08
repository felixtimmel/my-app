import React, { Component } from 'react';

class SearchBar extends Component {
    handleChange = (event) => {
        const types = ['album', 'artist', 'track', 'playlist'];
        this.props.search(event.target.value, types)
    }

    render () {
        return (
            <input 
                type="text"
                className="form-control"
                onChange={this.handleChange}
            />
        )
    }
}

export default SearchBar;