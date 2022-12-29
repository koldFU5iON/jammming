import React, { Component } from "react";
import { TrackList } from "../Tracklist/TrackList.js";
import "./Playlist.css";

export class Playlist extends Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }
  handleNameChange(e) {
    let newName = e.target.value;
    this.props.onNameChange(newName);
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={"New Playlist"} onChange={this.handleNameChange} />
        <TrackList
          tracks={this.props.tracks}
          isRemoval={this.props.isRemoval}
          onRemove={this.props.onRemove}
        />
        <button className="Playlist-save" onClick={this.props.onSave}>
          SAVE TO SPOTIFY
        </button>
      </div>
    );
  }
}
