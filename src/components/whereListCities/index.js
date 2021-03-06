/* Import all dependencies */
import React, { Component } from 'react'
import { PowerSelect } from 'react-power-select'
import "../listMonths/style.css"

/* Define and render Where List component */
export default class WhereListCities extends Component {
  state = {};

  handleChange = ({ option }) => {
    this.setState({
      selectedOption: option
	  })
  }

  render() {
    
		let cityList = this.props.citiesArray;

    return (
      <div>
        <PowerSelect className="PowerSelect" 
          disabled={this.props.disabledList}
          options={cityList}
          selected={this.props.cityValue}
          onChange={this.props.triggerChange}
        />
      </div>
    );
  }
}
