import React, { Component } from 'react'
import './style.css';

export default class Banner extends Component {
  state = {};

  handleChange = ({ option }) => {
    this.setState({
      selectedOption: option
		})
  }

  render() {
    return (
			<div className="banner">
				<div className="bannerHead"><img src="images/logo.png" title="Travelcast Icon"/><p>Travelcast</p></div>
					<div className="bannerData">
						<p>London, UK</p>
						<p id="date"></p>
						<h1>4&#8451;</h1>
						<p>Feels Like 5&#8451;</p>
					</div>
					<div className="bannerCondition">
						<img src="" title="Condition Icon"/>
					</div>
					<div className="bannerNav">
						<img src="images/leftChevron.png" title="leftChev" />
						<p>Today</p>
						<img src="images/rightChevron.png" title="rightChev" />
					</div>
			</div>
    );
  }
}
