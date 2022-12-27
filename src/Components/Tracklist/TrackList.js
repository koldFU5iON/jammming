import React, { Component } from 'react'

export class TrackList extends Component {
    render(){
        return (
            <div className="TrackList" >
                {this.props.results.map(track => {
                    return (
                    <div key={track.id}>
                        name: {track.name}
                        album: {track.album}
                        artist: {track.album}
                    </div>
                    )
                })}
            </div>
        )
    }
}

