/* Import all dependencies */
import React, {Component} from 'react';
import {render} from 'react-dom';
import Switch from 'react-toggle-switch'
 
/* Define and render SuggestionsSwitch component */
export default class SwitchSuggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switched: false
    };
  }
 
  toggleSwitch = () => {
    this.setState(prevState => {
      return {
        switched: !prevState.switched
      };
    });
  };
 
  render() {
    return (
        <div>
            {/* Basic Switch */}
            <Switch onClick={this.toggleSwitch} on={this.state.switched}/>
 
            {/* With children */}
            <Switch onClick={this.toggleSwitch} on={this.state.switched}>
              <i class="some-icon"/>
            </Switch>
 
            {/* Disabled */}
            <Switch onClick={this.toggleSwitch} on={this.state.switched} enabled={false}/>
 
            {/* Custom classnames */}
            <Switch onClick={this.toggleSwitch} on={this.state.switched} className='other-class'/>
        </div>
    );
  }
 
}
 