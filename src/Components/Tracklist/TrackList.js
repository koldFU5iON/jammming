import React, { Component } from 'react'

export class TrackList extends Component {
    render(){
        return (
            <div className="TrackList" >
                {this.props.tracks.map(track => {
                    return (
                    <div key={track.id}>
                        name: {track.name} <br/>
                        album: {track.album} <br/>
                        artist: {track.album} <br/>
                    </div>
                    )
                })}
            </div>
        )
    }
}

