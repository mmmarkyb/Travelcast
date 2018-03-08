import React, { Component } from 'react'
import "./style.css"

export default class GoButton extends Component {
  render() {
    return (
	  <div>
			<button className="goActualButton" onClick={this.props.triggerButton}>{this.props.text}</button>
	  </div>
    );
  }
}
