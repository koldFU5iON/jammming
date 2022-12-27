import React, { Component } from 'react'
import { TrackList } from '../Tracklist/TrackList.js'

export class SearchResults extends Component {
  render() {
    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <TrackList searchResults={this.props.results}/>
        </div>
    )
  }
}

