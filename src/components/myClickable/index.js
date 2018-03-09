/* Import all dependencies */
import React, { Component } from 'react'
import "./style.css"

/* Define and render Filter Button component */
export default class MyClickable extends React.Component {
  handleClick = () => this.props.onClick(this.props.index)
  
  render() {
    return(
    <button type='button' className={this.props.isActive ? 'active' : 'album'} onClick={ this.handleClick }>
      <span>{ this.props.name }</span>
    </button>
    );
  }
}