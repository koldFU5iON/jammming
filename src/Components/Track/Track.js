import React, { Component } from 'react';
import './Track.css'


export class Track extends Component {
    constructor(props){
        super(props)

        this.renderAction = this.renderAction.bind(this)
    }
    renderAction() {
        console.log('hello I ran')
        return 'hello'
            // this.props.isRemoval ? '-' : '+'

    }
    render() {    
        return (
            <div className="Track">
                <div className="Track-information">
                <h3>{this.props.track.name}</h3>
                <p>
                    {this.props.track.artist} | {this.props.track.album}
                </p>
                </div>
                <button className="Track-action" onClick={this.renderAction}> 
                    {this.renderAction}
                </button>
            </div>
            )
    }
}
 
