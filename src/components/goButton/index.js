/* Import all dependencies */
import React, { Component } from 'react'
import "./style.css"

/* Define and render Go Button component */
export default class GoButton extends Component {
  render() {
    return (
	  <div>
			<button className="goActualButton" onClick={this.props.triggerButton}>{this.props.text}</button>
	  </div>
    );
  }
}
