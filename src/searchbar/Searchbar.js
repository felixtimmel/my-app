import React, { Component } from 'react';

class SearchBar extends Component {
    
    handleChange = (event) => {
       /*  const types = ['album', 'artist', 'track', 'playlist']; */
        const types = ['album', 'artist', 'track'];
        this.props.search(event.target.value, types)
    }

    render () {
        return (
            <div>
                <input 
                    type="text"
                    className="form-control"
                    onChange={this.handleChange}
                />
                {this.props.isSearching &&
                   <button
                    /* onClick={} */
                   >annuler</button> 
                }
            </div>
        )
    }
}

export default SearchBar;