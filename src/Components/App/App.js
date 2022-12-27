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
        name: 'Shape of your body',
        artist: 'Ed Sheeren',
        album: 'Division',
        id: '23'
      },
      {
        name: 'Monkey Wrench',
        artist: 'Foo Fighters',
        album: 'Something or other',
        id: '234'
      },
      {
        name: 'Bohemien Rhapsody',
        artist: 'Queen',
        album: 'Best of Queen',
        id: '1'
      }],
      playlistName : 'playlist name',
      playlistTracks : [{
        name: 'name of song',
        artist: 'name of artist',
        album: 'album name',
        id: 'id'
      }]
    }

    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track){
    const tracks = this.state.playlistTracks
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track)
    this.setState({
      playlistTracks: tracks
    })
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
        <SearchBar />
          <div className="App-playlist">
            <SearchResults 
              tracks={this.state.searchResults}
              onAdd={this.addTrack} />
            <Playlist 
              name={this.state.playlistName}
              tracks={this.state.playlistTracks}/> 
          </div>
        </div>
      </div>
    );
  }
}

export default App;
