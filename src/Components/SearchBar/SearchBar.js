import React, { Component } from 'react';
import './SearchBar.css';

export class SearchBar extends Component {
    constructor(props){
        super(props)

        this.state = {
            term: ''
        }

        this.search = this.search.bind(this)
        this.handleTermChange = this.handleTermChange.bind(this)
    }

    search() {
        const term = this.state.term
        this.props.onSearch(term)
    }

    handleTermChange(e){
        const term = e.target.value
        this.setState({
            term: term
        })
    }
    render() {
        return(
        <div className="SearchBar">
            <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
            <button className="SearchButton" onClick={this.search}>SEARCH</button>
        </div>
      )
    }
}
