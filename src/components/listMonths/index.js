import React, { Component } from 'react'
import { PowerSelect } from 'react-power-select'
import "./style.css"

export default class ListMonths extends Component {
  state = {};

  handleChange = ({ option }) => {
    this.setState({
      selectedOption: option
	  })
  }

  render() {
		let monthList = ["Janurary","Feburary","March","April","May","June","July","August","September","October","November","December"];

    return (
	  <div>
      <PowerSelect className="PowerSelect" 
        disabled={this.props.disabledList}
				options={monthList}
				selected={this.props.cityValue}
				onChange={this.props.triggerChange}
			/>
	  </div>
		
    );
  }
}
