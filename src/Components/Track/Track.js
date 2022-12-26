import React, { Component } from 'react';

class Track extends Component {
    renderAction() {
        return(
            <div>
                <button onClick={this.props.isRemoval}>
                    {this.props.isRemoval ? '-' : '+'}
                </button>
            </div>
        )

    }
  render() {    
    return (
        <div className="Track">
            <div className="Track-information">
            <h3><Track /></h3>
            <p>
                {/* <!-- track artist will go here--> | <!-- track album will go here --> */}
            </p>
            </div>
            <button className="Track-action">
                {/* <!-- + or - will go here --> */}
            </button>
        </div>
        )
  }
}
 
export default Track;