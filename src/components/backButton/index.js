import React, { Component } from 'react'
import "./style.css"

export default class BackButton extends Component {
  render() {
    return (
	  <div>
			<button className="backButton" onClick={this.props.triggerButton}>{this.props.text}</button>
	  </div>
    );
  }
}
