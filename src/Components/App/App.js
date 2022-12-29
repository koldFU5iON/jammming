import React, { Component } from "react";

import "./App.css";
import { SearchBar } from "../SearchBar/SearchBar.js";
import { SearchResults } from "../SearchResults/SearchResults.js";
import { Playlist } from "../Playlist/Playlist.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        {
          name: "Shape of your body",
          artist: "Ed Sheeren",
          album: "Division",
          id: "23",
          uri: "lkj98123jls9",
        },
        {
          name: "Monkey Wrench",
          artist: "Foo Fighters",
          album: "Something or other",
          id: "234",
          uri: "qiowe198",
        },
        {
          name: "Bohemien Rhapsody",
          artist: "Queen",
          album: "Best of Queen",
          id: "1",
          uri: "ljowe0101",
        },
      ],
      playlistName: "playlist name",
      playlistTracks: [
        {
          name: "name of song",
          artist: "name of artist",
          album: "album name",
          id: "id",
          uri: "lkjsdf2309",
        },
      ],
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    const tracks = this.state.playlistTracks;

    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }

    tracks.push(track);
    this.setState({
      playlistTracks: tracks,
    });
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    let newTracklist = tracks.filter(
      (savedTracks) => savedTracks.id !== track.id
    );

    this.setState({
      playlistTracks: newTracklist,
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name,
    });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map((track) => track.uri);
    const playlistName = this.state.playlistName;

    console.log(
      `Your playlist, '${playlistName}' has been saved with the following URI's: ${trackURIs.join(
        ", "
      )}`
    );

    this.setState({
      playlistName: "New Playlist",
      playlistTracks: [],
    });
  }

  search(term){
    console.log(term)
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults
              tracks={this.state.searchResults}
              onAdd={this.addTrack}
              isRemoval={false}
            />
            <Playlist
              name={this.state.playlistName}
              tracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              isRemoval={true}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
