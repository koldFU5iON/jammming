import React, { Component } from 'react';
import { TrackList } from '../Tracklist/TrackList.js'
import './Playlist.css'

export class Playlist extends Component {
    render() { 
        return (
            <div className="Playlist">
                <input defaultValue={'New Playlist'}/>
                <TrackList tracks={this.props.tracks}/>
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        );
    }
}
 