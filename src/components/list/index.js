// import preact
import { h, render, Component } from 'preact';
	
export default class List extends Component {
	//Constructor setting up initial list values
	constructor(props) {
		super(props);
		this.state = {value: 'London'};	
		this.handleChange = this.handleChange.bind(this);
	}

	//What happens when we change the value?
	handleChange(event) {
		this.setState({value: event.target.value});
	}

	//Render the list
	render() {
		return (
			<div>
				<form>
					<select value={this.props.cityValue} onChange={this.props.triggerChange} >
						<option value="Bilbao">Bilbao</option>
						<option value="Valencia">Valencia</option>
						<option value="Barcelona">Barcelona</option>
						<option value="Madrid">Madrid</option>
					</select>
					<h1>{this.props.cityValue}</h1>
				</form>
			</div>
		);
	}
}