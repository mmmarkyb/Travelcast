/* Import all dependencies */
import React, { Component } from 'react'

export default class DateText extends Component {

  render() {
    return (
			<div>
				<p>{this.props.text}</p>
			</div>
    );
  }
}
