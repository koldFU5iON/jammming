import React, { Component } from 'react'
import { TrackList } from '../Tracklist/TrackList.js'
import './SearchResults.css'

export class SearchResults extends Component {
  render() {
    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <TrackList 
              tracks={this.props.tracks}
              onAdd={this.props.onAdd}
              isRemoval={false}/>
        </div>
    )
  }
}

