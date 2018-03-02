// import preact
import { h, render, Component } from 'preact';
//{items.map((items, i) => <option value={items}>{items}</option>)}
export default class List extends Component {
	//Constructor setting up initial list values
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		console.log(this.props.citiesArray);		
	}

	//What happens when we change the value?
	handleChange(event) {
		this.setState({value: event.target.value});
	}

	//Render the list
	render() {	
		let items = this.props.citiesArray;

		return (
			<div>
				<form>
					<select value={this.props.cityValue} onChange={this.props.triggerChange} >
						{items.map((items, i) => <option value={items}>{items}</option>)}
					</select>
					<h1>{this.props.cityValue}</h1>
				</form>
			</div>
		);	
	}
}
