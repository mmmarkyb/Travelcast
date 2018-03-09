/* Import all dependencies */
import React, { Component } from 'react'
import "./style.css"
import MyClickable from '../myClickable/index';

/* Define and render Filter component */
export default class Filter extends Component {

  state = {
    classAll: 'active',
    classHot: 'album',
    classCold: 'album'
  }

  handleClick(event) {
		this.setState({
			activeIndex: this.state.event
    });
	}

  render() {
    return (
	  <div className="filter">
		  <p>Filter</p>
      <button name="All" index={0} className={this.state.classAll} isActive={ this.state.activeIndex===0 } onClick={ this.handleClick }>All</button>
      <button name="Hot" index={1} className={this.state.classHot} isActive={ this.state.activeIndex===1 } onClick={ this.handleClick }>Hot</button>
      <button name="Cold" index={2} className={this.state.classCold} isActive={ this.state.activeIndex===2 } onClick={ this.handleClick }>Cold</button>
	  </div>
    );
  }
}
