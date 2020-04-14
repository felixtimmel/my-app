import React, { Component } from 'react';

require('./Searchbar.scss')

class SearchBar extends Component {
  render () {
    return (
      <>
        <input 
          id="searchBar"
          type="text"
          value={this.props.value}
          placeholder="Titres, artists"
          className="form-control"
          onChange={(e) => this.props.handleChange(e)}
        />
        {this.props.isSearching &&
          <button onClick={() => this.props.clearInput()} className="searchBar__cancel-btn">annuler</button> 
        }
      </>
    )
  }
}

export default SearchBar;