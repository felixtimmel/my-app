import React, { Component } from 'react';

class SearchBar extends Component {
  render () {
    return (
      <div>
        <input 
          id="searchBar"
          type="text"
          value={this.props.value}
          placeholder="Titres, artists"
          className="form-control"
          onChange={(e) => this.props.handleChange(e)}
        />
        {this.props.isSearching &&
          <button onClick={() => this.props.clearInput()}>annuler</button> 
        }
      </div>
    )
  }
}

export default SearchBar;