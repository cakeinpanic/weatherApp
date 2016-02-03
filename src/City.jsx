import React from 'react';
import $ from 'jquery';

let token = '44db6a862fba0b067b1930da0d769e98';

export default React.createClass({
	getDefaultProps() {
		return {
			id: 2172797
		}
	},
	getInitialState() {
		return {
			temp: 0,
			min: 0,
			max: 0
		}
	},
	componentDidMount() {
		$.get('http://api.openweathermap.org/data/2.5/weather?id=' + this.props.id + '&appid=' + token,
			function(result) {
				this.setState({
					temp: result.main.temp,
					min: result.main.temp_min,
					max: result.main.temp_max,
					name: result.name
				});
			}.bind(this));
	},
	renderTemp(label, temp) {
		return (
			<div className="temp">
					<span className="temp--label">
						{label}
					</span>
					<span className="temp--value">
						{temp}
					</span>
			</div>
		);
	},
	render() {
		return (
			<div className="city">
				<h3>{this.state.name}</h3>
				{this.renderTemp('Current', this.state.temp)}
				{this.renderTemp('Max', this.state.max)}
				{this.renderTemp('Min', this.state.min)}

			</div>
		)
	}
});
