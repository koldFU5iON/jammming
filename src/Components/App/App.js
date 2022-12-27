import React, { Component } from 'react';

import './App.css';
import { SearchBar } from '../SearchBar/SearchBar.js';
import { SearchResults } from '../SearchResults/SearchResults.js';
import { Playlist } from '../Playlist/Playlist.js'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      searchResults : [{
        name: 'name of song',
        artist: 'name of artist',
        album: 'album name',
        id: 'id'
      }]
    }
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
        <SearchBar />
          <div className="App-playlist">
            <SearchResults tracks={this.state.searchResults} />
            <Playlist /> 
          </div>
        </div>
      </div>
    );
  }
}

export default App;
