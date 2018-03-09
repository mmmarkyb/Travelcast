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
import Banner from './components/banner/index';
import GoButton from './components/goButton/index';
import BackButton from './components/backButton/index';
import Switch from 'react-toggle-switch'
import DateText from './components/dateText/index';
import Result from './components/Result/index';
import MyClickable from './components/myClickable/index';
import "./switch.min.css"

//Import Sketches
import minibanner from './sketches/minibanner';
import result from './sketches/results-sketch';
import sketch from './sketches/sketch';
import details from './sketches/details-sketch';

//Day picker
import DayPicker from 'react-day-picker';
import MonthPicker from 'react-simple-month-picker';
import 'react-day-picker/lib/style.css';

//Import p5
import P5Wrapper from 'react-p5-wrapper';

//Fill this object with suggestions for hot/cold cities
let serverDataHot = {
	weatherSession: {
	  currentCity: 'London',
	  currentCountry: 'UK',
	  currentTemp: '4&#8451',
	  currentFeels: '4&#8451;',
	  currentCondition: '',
	  searchResults: [
  
	  ],
	}
  }

  let serverDataCold = {
	weatherSession: {
	  currentCity: 'London',
	  currentCountry: 'UK',
	  currentTemp: '4&#8451',
	  currentFeels: '4&#8451;',
	  currentCondition: '',
	  searchResults: [
  
	  ],
	}
  }  

class App extends React.Component {
/*=============================================================================================================
//                CONSTRUCTOR - Setting Initial States, Binding events and Parsing Data
/=============================================================================================================*/
	constructor(props){
		super(props);

		//Set initial States
		this.state = {
			value: 'London',
			country: 'United Kingdom',
			plac: ["default"],
			defaultCity: 'London',
			defaultCountry: 'United Kingdom',
			showStore: false,
			showSuggestionBox: false,
			api: 'd1f5e81ef46e4cbe',
			disabledList: false,
			userDate: "Today",
			switched: false,
			serverDataHot: "default",
			serverDataCold: "default",
			showLoading: false,
			activeIndex: 0
		};

		//Binding Event Listeners
		this.handleChange = this.handleChange.bind(this);
		this.changeCountry = this.changeCountry.bind(this);
		this.changeMonth = this.changeMonth.bind(this);
		this.buttonClick = this.buttonClick.bind(this);
		this.backButton = this.backButton.bind(this);

		/*=============================================================================================================
		//                Initial London, UK Data for Banner
		//=============================================================================================================*/	
		var url = "http://api.wunderground.com/api/" + this.state.api + "/conditions/q/" + this.state.defaultCountry +"/" + this.state.defaultCity + ".json";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})

		var url = "http://api.wunderground.com/api/" + this.state.api + "/conditions/q/" + this.state.defaultCountry +"/" + this.state.defaultCity + ".json";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.initialCall,
			error : function(req, err){ console.log('API call failed ' + err); }
		})

		/*=============================================================================================================
		//                Get Data for the list of available cities associated with selected Country
		//=============================================================================================================*/
		var citiesURL = "http://api.wunderground.com/api/" + this.state.api + "/conditions/q/" + this.state.defaultCountry +".json";
		$.ajax({
			url: citiesURL,
			dataType: "jsonp",
			success : this.listCities,
			error : function(req, err){ console.log('API call failed ' + err); }
		})

		/*=============================================================================================================
		//                Get forecast data
		//=============================================================================================================*/
		var forecastURL = "http://api.wunderground.com/api/" + this.state.api + "/forecast/q/" + this.state.defaultCountry +"/" + this.state.defaultCity + ".json";
		$.ajax({
			url: forecastURL,
			dataType: "jsonp",
			success : this.forecastResults,
			error : function(req, err){ console.log('API call failed ' + err); }
		})

		/*=============================================================================================================
		//                Get Suggestion city data for HOT and COLD cities
		//=============================================================================================================*/
		var urlListHot = ["http://api.wunderground.com/api/" + this.state.api + "/conditions/q/Thailand/Bangkok.json",
                    "http://api.wunderground.com/api/" + this.state.api + "/conditions/q/Australia/Melbourne.json"];
		var urlListCold = ["http://api.wunderground.com/api/" + this.state.api + "/conditions/q/Turkey/Erzurum.json",
                    		"http://api.wunderground.com/api/" + this.state.api + "/conditions/q/Canada/Edmonton.json"];
    
		for(var i = 0; i < urlListHot.length; i++){
			$.ajax({
				url: urlListHot[i],
				dataType: "jsonp",
				success : this.presetResponseHot,
				error : function(req, err){ console.log('API call failed ' + err); }
			})
		}  

		for(var i = 0; i < urlListCold.length; i++){
			$.ajax({
				url: urlListCold[i],
				dataType: "jsonp",
				success : this.presetResponseCold,
				error : function(req, err){ console.log('API call failed ' + err); }
			})
		} 
	}
	
/*=============================================================================================================
//                Run code before rendering components (sets loading screen for 4000ms)
/=============================================================================================================*/	
	componentDidMount() {
		setTimeout(() => {
		  this.setState({
			  serverDataHot: serverDataHot,
			  serverDataCold: serverDataCold,
			  showLoading: true
		  });
		}, 4000);
	}
	
/*=============================================================================================================
//                When the city is selected, change the value to that city
/=============================================================================================================*/
	handleChange({ option }) {
		this.setState({
			value: option
		});
	}

/*=============================================================================================================
//     When the country is changed, the cities list component will be updated based on the selected country
/=============================================================================================================*/
	changeCountry({ option }) {
		this.setState({
			country: option,
			cityListDisabled: false
		});

		var citiesURL = "http://api.wunderground.com/api/" + this.state.api + "/conditions/q/" + option +".json";
		$.ajax({
			url: citiesURL,
			dataType: "jsonp",
			success : this.listCities,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}

/*=============================================================================================================
//                Store date as user selects in through the MonthPicker component
/=============================================================================================================*/
	userDate({option}){
		this.setState({
			date : option
		});
	}

/*=============================================================================================================
//                For SUGGESTIONS component filter, set active button index (All = 0, hot = 1, cold = 2)
/=============================================================================================================*/
	handleClick = (index) => this.setState({ activeIndex: index })

/*=============================================================================================================
//                Function called when the month is changed and changes the state of the month
/=============================================================================================================*/
	changeMonth(event) {
		this.setState({
			month: event.target.value
		});
	}

/*=============================================================================================================
//                Function called when GO button is pressed
/=============================================================================================================*/
	buttonClick(event) {
		//If Suggestions button is ON, show the suggestions box when GO button is pressed. Otherwise, show average data for selected city.
		if(this.state.switched){
			this.setState({ showSuggestionBox: true });
		}else{
			this.setState({ showStore: true });
			var url = "http://api.wunderground.com/api/" + this.state.api + "/conditions/q/" + this.state.country +  "/" + this.state.value + ".json";
			console.log(this.state.userDate);
			$.ajax({
				url: url,
				dataType: "jsonp",
				success : this.parseResponse,
				error : function(req, err){ console.log('API call failed ' + err); }
			})
		}	
	}

/*=============================================================================================================
//                Function called when BACK button is pressed
/=============================================================================================================*/
	backButton(event) {	
		this.setState({ showStore: false });
		this.setState({ showSuggestionBox: false });
		var url = "http://api.wunderground.com/api/" + this.state.api + "/conditions/q/UK/London.json";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		});	
	}

/*=============================================================================================================
//                Function called when SUGGESTIONS toggle is pressed
/=============================================================================================================*/
	toggleSwitch = () => {
		this.setState(prevState => {
		  return {
			switched: !prevState.switched,
			disabledList: !prevState.disabledList
		  };
		});
	};

	// <!!!===--- BEGIN RENDERING HERE ---===!!!>
	render() {
		return (
			<div className="container">
				
				{/*==============================================================*/}
				{/*----------------------- Loading Page * -----------------------*/}
				{/*==============================================================*/}
				<div className="loadingScreen" style={{display: this.state.showLoading ? 'none' : 'block' }}>
				</div>

				{/*===================================================================*/}
				{/*----------------------- Main Page Container -----------------------*/}
				{/*===================================================================*/}
				<P5Wrapper sketch={sketch} countryValue={this.state.defaultCountry} temp={this.state.temp} feels={this.state.feels} city={this.state.defaultCity} date={this.state.date}
						   iconURL={this.state.iconURL} logo={this.state.logoLink} bglink={this.state.bglink} cond={this.state.cond} 
						   fcDays={this.state.fcDays} />
				
				{/* Box containing list of countries/cities, suggestions toggle and month picker*/}				
				<div className="box">
					<p>Going somewhere?</p>
					<div className="countrystyle">
						<WhereList triggerChange={this.changeCountry} countryValue={this.state.country} disabledList={this.state.disabledList}/>
					</div>
					<div className="citystyle" style={{'z-index': 2}}>
						<WhereListCities triggerChange={this.handleChange} cityValue={this.state.value} countryValue={this.state.country} citiesArray={this.state.plac} disabledList={this.state.disabledList}/>
					</div>
					<div className="month">
						<MonthPicker onChange={(userDate)=>{this.setState({userDate: (userDate.toString()).slice(0,16), pickedMonth: (userDate.toString()).slice(4,7)});}} />					
					</div>
					<Switch className="suggestionsButton" onClick={this.toggleSwitch} on={this.state.switched}/>
					<div className="suggestionsText"><b>See Suggestions</b></div>
				</div>

				{/* Go button - If SUGGESTIONS is toggled ON, go to suggestions page, else go to results page*/}
				<div className="goButton" style={{marginTop: '24px'}}><GoButton text="Go" triggerButton={this.buttonClick} /></div>

				{/*======================================================================*/}
				{/*----------------------- Results Page Container -----------------------*/}
				{/*======================================================================*/}
				<div className="results" style={{display: this.state.showStore ? 'block' : 'none' }}>	
					{/* Small orange banner still containing temp of set default city */}		
					<div className="minibanner">
						<P5Wrapper sketch={minibanner} countryValue={this.state.defaultCountry} temp={this.state.defaultTemp} city={this.state.defaultCity} 
							iconURL={this.state.iconURL} logo={this.state.logoLink}  cond={this.state.defaultCond} />
					</div>		

					{/* Date box - also contains change button to go back */}	
					<div className="date"> 
						<div className="changeButton"><BackButton text="Change" triggerButton={this.backButton} /></div>
						<DateText text={this.state.userDate} />
					</div>

					{/* Results of selected city and date */}
					<div className="results-box">	
						<div className="results-sketch">
							<P5Wrapper sketch={result} countryValue={this.state.country} temp={this.state.temp} feels={this.state.feels} city={this.state.value}
							w={this.state.w} precip={this.state.precip} iconURL={this.state.iconURL}/>
						</div>
					</div>

					{/* Further details of averages in that month */}
					<div className="details-box"> 
						<div className="details-sketch">
							<P5Wrapper sketch={details} countryValue={this.state.country} temp={this.state.temp} feels={this.state.feels} city={this.state.value}
							w={this.state.w} precip={this.state.precip} iconURL={this.state.iconURL} month={this.state.pickedMonth} />
						</div>
 					</div>

					 {/* Non functional book flights button */}
					<GoButton text="Book Flights"/>
				</div>

				{/*==========================================================================*/}
				{/*----------------------- Suggestions Page Container -----------------------*/}
				{/*==========================================================================*/}
				<div className="suggestionsContainer" style={{display: this.state.showSuggestionBox ? 'block' : 'none' }}>
					{/* Small orange banner still containing temp of set default city */}
					<div className="minibanner">
						<P5Wrapper sketch={minibanner} countryValue={this.state.defaultCountry} temp={this.state.defaultTemp} city={this.state.defaultCity} 
							iconURL={this.state.iconURL} logo={this.state.logoLink}  cond={this.state.defaultCond} />
					</div>

					{/* Date box - also contains change button to go back */}	
					<div className="date"> 
						<div className="changeButton"><BackButton text="Change" triggerButton={this.backButton} /></div>
						<DateText text={this.state.userDate} />
					</div>

					{/* Filter to select All, hot or cold */}	
					<div className="filter">
						<p>Filter</p>
						<MyClickable name="All" index={0} isActive={ this.state.activeIndex===0 } onClick={ this.handleClick } />
						<MyClickable name="Hot" index={1} isActive={ this.state.activeIndex===1 } onClick={ this.handleClick }/>
						<MyClickable name="Cold" index={2} isActive={ this.state.activeIndex===2 } onClick={ this.handleClick }/>
					</div>

				    {/* Hot city results */}
					{this.state.activeIndex == 0 && this.state.serverDataHot.weatherSession || this.state.activeIndex == 1 ? 
					<div>
						{this.state.serverDataHot.weatherSession.searchResults.map(searchResults =>
						<Result searchResult={searchResults}/>
						)}
					</div> : <div></div>} 
					
					{/* Cold city results */}
					{this.state.activeIndex == 0 && this.state.serverDataCold.weatherSession || this.state.activeIndex == 2 ? 
					<div>
						{this.state.serverDataCold.weatherSession.searchResults.map(searchResults =>
						<Result searchResult={searchResults}/>
						)}
					</div> : <div></div>}
				</div>	

			</div>

		);
    }

/*=============================================================================================================
//                Successful API call for selected City
/=============================================================================================================*/   
    parseResponse = (parsed_json) => {
			try {var location = parsed_json['current_observation']['display_location']['city'];}
				catch (err) {var location = 0;}
			try {var temp_c = parsed_json['current_observation']['temp_c'];}
				catch (err) {var temp_c = 0;}
			try {var conditions = parsed_json['current_observation']['weather'];}
				catch (err) {var conditions = 0;}
			try {var feelslike = parsed_json['current_observation']['feelslike_c'];}
				catch (err) {var feelslike = 0;}
			try {var date = parsed_json['current_observation']['observation_time_rfc822'];}
				catch (err) {var date = 0;}
			try {var iconURL = parsed_json['current_observation']['icon_url'];}
				catch (err) {var iconURL = 0;}
			try {var wind = parsed_json['current_observation']['wind_mph'];}
				catch (err) {var wind = 0;}
			try {var precipitation = parsed_json['current_observation']['precip_today_in'];}
				catch (err) {var precipitation = 0;}
			try {var logoLink = "https://image.ibb.co/dEZuq7/logo.png"}
				catch (err) {var logoLink = 0;}

			const bglink = "https://image.ibb.co/nNY4q7/bg.jpg";
		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions,
			feels : feelslike,
			date: date,
			iconURL: iconURL,
			logoLink: logoLink,
			bglink: bglink,
			w : wind,
			precip : precipitation
		});
	}

/*=============================================================================================================
//                Successful API call for default City
/=============================================================================================================*/ 
	 initialCall = (parsed_json) => {
		try {var location = parsed_json['current_observation']['display_location']['city'];}
			catch (err) {var location = 0;}
		try {var temp_c = parsed_json['current_observation']['temp_c'];}
			catch (err) {var temp_c = 0;}
		try {var conditions = parsed_json['current_observation']['weather'];}
			catch (err) {var conditions = 0;}
		try {var feelslike = parsed_json['current_observation']['feelslike_c'];}
			catch (err) {var feelslike = 0;}
		try {var date = parsed_json['current_observation']['observation_time_rfc822'];}
			catch (err) {var date = 0;}
	// set states for fields so they could be rendered later on
	this.setState({
		defaultLocate: location,
		defaultTemp: temp_c,
		defaultCond : conditions,
		defaultFeels : feelslike,
		defaultDate: date,
	});
}

/*=============================================================================================================
//                Successful API call for gathering city data for selected country
/=============================================================================================================*/ 
	listCities = (parsed_json) => {
		try {
			var citiesLength = parsed_json['response']['results'].length;
		}
		catch(err) {
			var citiesLength = 0;
		}

		var places = [];
		for(var i = 0; i < citiesLength; i++){
			places[i] = parsed_json['response']['results'][i]['city'];
		}
		// set states for fields so they could be rendered later on
		this.setState({
			plac: places,
			value: places[0]
		});
	}

/*=============================================================================================================
//                Successful API call for forecast data
/=============================================================================================================*/ 
	forecastResults = (parsed_json) => {
		try {
			var numDays = parsed_json['response']['forecast']['simpleforecast'].length;
		}
		catch(err) {
			var numDays = 0;
		}

		var fcDay = [];
		var fcTempHigh = [];
		var fcTempLow = [];
		var fcCond = [];

		for(var i = 0; i < numDays; i++){
			//Collecting weekdays
			try {fcDay[i] = parsed_json['response']['forecast']['simpleforecast']['weekday_short'];}
			catch (err) {fcDay[i] = "none";}

			//Collecting conditions
			try {fcCond[i] = parsed_json['response']['forecast']['simpleforecast']['conditions'];}
			catch (err) {fcCond[i] = "none";}

			//Collecting Temp High
			try {fcTempHigh[i] = parsed_json['response']['forecast']['simpleforecast']['high']['celsius'];}
			catch (err) {fcTempHigh[i] = "none";}

			//Collecting Temp Low
			try {fcTempLow[i] = parsed_json['response']['forecast']['simpleforecast']['low']['celsius'];}
			catch (err) {fcTempLow[i] = "none";}
		}

		// set states for fields so they could be rendered later on
		this.setState({
			fcDays: fcDay,
			fcTempHigh: fcTempHigh,
			fcTempLow: fcTempLow,
			fcCond: fcCond
		});
	}

/*=============================================================================================================
//                Successful API call for selected hot city suggestions
/=============================================================================================================*/ 
	presetResponseHot = (parsed_json) => {
		var location = parsed_json['current_observation']['display_location']['city'];
		var country_iso3166 = parsed_json['current_observation']['display_location']['country_iso3166'];
		var feels = parsed_json['current_observation']['feelslike_c'];
		var conditions = parsed_json['current_observation']['weather'];
		var precip = parsed_json['current_observation']['precip_today_in'];
		var windSpeed = parsed_json['current_observation']['wind_mph'];
		var temp_c = parsed_json['current_observation']['temp_c'];
		var iconUrl = parsed_json['current_observation']['icon_url'];
		
		// set states for fields so they could be rendered later on
		this.setState({
		  locate: location,
		  temp: temp_c,
		  cond : conditions,
		  country_iso3166: country_iso3166,
		  feels: feels,
		  precip: precip,
		  windSpeed: windSpeed,
		  iconUrl: iconUrl
		});
	
		var searchLength = serverDataHot.weatherSession.searchResults.length;
		let dataEntry = {
		  rCity: this.state.locate,
		  rCountry: this.state.country_iso3166,
		  rTemp: this.state.temp,
		  rFeels: this.state.feels,
		  rCondition: this.state.conditions,
		  rRecip: this.state.precip,
		  rWindSpeed: this.state.windSpeed,
		  rIcon: this.state.iconUrl
		};
	
		(serverDataHot.weatherSession.searchResults).push(dataEntry);	
		this.setState({serverDataHot: serverDataHot});
	}

/*=============================================================================================================
//                Successful API call for selected cold city suggestions
/=============================================================================================================*/ 
	presetResponseCold = (parsed_json) => {
		var location = parsed_json['current_observation']['display_location']['city'];
		var country_iso3166 = parsed_json['current_observation']['display_location']['country_iso3166'];
		var feels = parsed_json['current_observation']['feelslike_c'];
		var conditions = parsed_json['current_observation']['weather'];
		var precip = parsed_json['current_observation']['precip_today_in'];
		var windSpeed = parsed_json['current_observation']['wind_mph'];
		var temp_c = parsed_json['current_observation']['temp_c'];
		var iconUrl = parsed_json['current_observation']['icon_url'];
		
		// set states for fields so they could be rendered later on
		this.setState({
		  locate: location,
		  temp: temp_c,
		  cond : conditions,
		  country_iso3166: country_iso3166,
		  feels: feels,
		  precip: precip,
		  windSpeed: windSpeed,
		  iconUrl: iconUrl
		});
	
		var searchLength = serverDataCold.weatherSession.searchResults.length;
		let dataEntry = {
		  rCity: this.state.locate,
		  rCountry: this.state.country_iso3166,
		  rTemp: this.state.temp,
		  rFeels: this.state.feels,
		  rCondition: this.state.conditions,
		  rRecip: this.state.precip,
		  rWindSpeed: this.state.windSpeed,
		  rIcon: this.state.iconUrl
		};
	
		(serverDataCold.weatherSession.searchResults).push(dataEntry);	
		this.setState({serverDataCold: serverDataCold});
	}
}

export default App;