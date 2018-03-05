//Import React
import React from 'react';
import ReactDOM from 'react-dom';

// import stylesheets for ipad & button
import './style.css';

//Import registerServiceWorker
import registerServiceWorker from './registerServiceWorker';

// import jquery for API calls
import $ from 'jquery';

//import components
import WhereList from './components/whereList/index';
import WhereListCities from './components/whereListCities/index';

//Day picker
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

//Web token: 319d03ca1011caf6dbc8d8abc6d73c6a
//https://www.ncdc.noaa.gov/cdo-web/webservices/v2#gettingStarted

class Iphone extends React.Component {

	// a constructor with initial set states
	constructor(props){
		super(props);

		// button display state
		this.state = {value: 'Madrid'};	
		this.state = {month: '01'};	
		this.state = {country: 'Spain'};
		this.state = {plac: ["default"]};
	
		this.handleChange = this.handleChange.bind(this);
		this.changeCountry = this.changeCountry.bind(this);
		this.changeMonth = this.changeMonth.bind(this);
        this.handleButton = this.handleButton.bind(this);
        
        //INITIAL CITY + COUNTRY DATA
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
    }

	//When the city is selected, change the value to that city
	handleChange({ option }) {
		this.setState({
			value: option
		});

		var url = "http://api.wunderground.com/api/47de2e10eee1884d/conditions/q/" + this.state.country + "/" + option + ".json";
		console.log(url);
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}

	//When the country is changed, the cities list component will be updated based on the selected country
	changeCountry({ option }) {
		this.setState({
			country: option
		});	
		
		var citiesURL = "http://api.wunderground.com/api/47de2e10eee1884d/conditions/q/" + option +".json";
		$.ajax({
			url: citiesURL,
			dataType: "jsonp",
			success : this.listCities,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}

	//Function called when the month is changed andchanges the state of the month
	changeMonth(event) {
		this.setState({
			month: event.target.value
		});		
	}

	//Find data when the submit button is clicked for the selected country, city and month
	handleButton(event) {

	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		//const tempStyles = this.state.temp ? "${temperature} " : "temperature";
		
		// display all weather data
		return (
			<div className="container">
				<div className="header">
					<div className="city">{ this.state.locate }</div>
					<div className="conditions">{ this.state.cond }</div>
					<div className="temperature">{ this.state.temp }<span className="degrees">°</span></div>
				</div>
				<WhereList triggerChange={this.changeCountry} countryValue={this.state.country} />
				<WhereListCities triggerChange={this.handleChange} cityValue={this.state.value} countryValue={this.state.country} citiesArray={this.state.plac} />
				<DayPicker />
				<div className="details">
					
				</div>
				
			</div>
			
		);
    }
    
    //Function runs when a successful api is called
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

ReactDOM.render(<Iphone />, document.getElementById('root'));
registerServiceWorker();
