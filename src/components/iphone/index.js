// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';

// import Components Here
import Button from '../button';
import List from '../list';
import ListCon from '../listCon';

export default class Iphone extends Component {

	// a constructor with initial set states
	constructor(props){
		super(props);
		
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true});
		this.state = {value: 'Madrid'};	
		this.state = {country: 'Spain'};
		this.state = {plac: ["default"]};
		console.log(this.state.plac);	
		this.handleChange = this.handleChange.bind(this);
		this.changeCountry = this.changeCountry.bind(this);

		var url = "http://api.wunderground.com/api/47de2e10eee1884d/conditions/q/Spain/Madrid.json";
		
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})

		var citiesURL = "http://api.wunderground.com/api/47de2e10eee1884d/conditions/q/Spain.json";

		$.ajax({
			url: citiesURL,
			dataType: "jsonp",
			success : this.listCities,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		console.log(this.state.plac);
	}

	// a call to fetch weather data via wunderground
	handleChange(event) {
		this.setState({
			value: event.target.value
		});

		var url = "http://api.wunderground.com/api/47de2e10eee1884d/conditions/q/" + this.state.country + "/" + this.state.value + ".json";
		
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})	
	}

	changeCountry(event) {
		this.setState({
			country: event.target.value
		});		
		
		var citiesURL = "http://api.wunderground.com/api/47de2e10eee1884d/conditions/q/" + this.state.country +".json";
		
		$.ajax({
			url: citiesURL,
			dataType: "jsonp",
			success : this.listCities,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		
		// display all weather data
		return (
			<div class={ style.container }>
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<span class={ tempStyles }>{ this.state.temp }</span>
				</div>
				<div class={ style.details }></div>
				<div class= { style_iphone.container }> 
					<ListCon triggerChange={this.changeCountry} countryValue={this.state.country}/>
					<br />
					<List triggerChange={this.handleChange} cityValue={this.state.value} countryValue={this.state.country} citiesArray={this.state.plac} />
				</div>	
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		var location = parsed_json['current_observation']['display_location']['city'];
		var temp_c = parsed_json['current_observation']['temp_c'];
		var conditions = parsed_json['current_observation']['weather'];

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions
		});      
	}

	listCities = (parsed_json) => {
		var citiesLength = parsed_json['response']['results'].length;
		var places = [];
		for(var i = 0; i < citiesLength; i++){
			places[i] = parsed_json['response']['results'][i]['city'];
		}
		// set states for fields so they could be rendered later on
		this.setState({
			plac: places
		});      
	}
}
