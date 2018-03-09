/* Import all dependencies */
import React, { Component } from 'react';
import './style.css';
import rain from './img/rain.png';
import wind from './img/wind.png';
import high from './img/high.png';
import low from './img/low.png';

/* Define and render Results component */
export default class Result extends Component {
    render(){
      return(
        <div className="dataDisplay">
          <div id="data">
            <p>{this.props.searchResult.rCity}</p>
            <h3>{this.props.searchResult.rTemp}&#8451;</h3>
            <p>Feels Like {this.props.searchResult.rFeels}&#8451;</p>
          </div>
          <div className="icon"><img src={this.props.searchResult.rIcon} title="Condition Icon"/></div>
          <div className="metrics">
            <div><img src={rain} alt="Chance of Rain"/><p className="textMetric">{this.props.searchResult.rRecip}%</p></div>
            <div><img src={wind} alt="Wind Speed"/><p className="textMetric">{this.props.searchResult.rWindSpeed}mph</p></div>
            
          </div>
        </div>
      );
    }
  }