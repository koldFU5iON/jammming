import React, { Component } from 'react';
import { TrackList } from '../Tracklist/TrackList.js'
import './Playlist.css'

export class Playlist extends Component {
    render() { 
        return (
            <div className="Playlist">
                <input defaultValue={'New Playlist'}/>
                <TrackList 
                    tracks={this.props.tracks} 
                    isRemoval={this.props.isRemoval} 
                    onRemove={this.props.onRemove}/>
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        );
    }
}
 