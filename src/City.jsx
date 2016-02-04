import React from 'react';
import buffer from './buffer.jsx';

export default React.createClass({
	getDefaultProps() {
		return {
			id: 2172797,
			onRemove: ()=> {
			}
		}
	},
	getInitialState() {
		return {
			temp: 0,
			min: 0,
			max: 0
		}
	},

	request() {
		buffer.getById(this.props.id,
			result => {
				this.setState({
					temp: result.main.temp,
					min: result.main.temp_min,
					max: result.main.temp_max,
					name: result.name
				});
			});
	},
	componentDidMount() {
		this._interval = setInterval(this.request, 1000);
	},
	componentWillUnmount() {
		clearInterval(this._interval);
	},
	onRemove() {
		this.props.onRemove(this.props.id)
	},
	renderTemp(label, temp) {
		return (
			<div className="temp">
					<span className="temp--label">
						{label}
					</span>
					<span className="temp--value">
						{temp}°C
					</span>
			</div>
		);
	},
	render() {
		return (
			<div className="city">
				<div className="remove" onClick={this.onRemove}>remove</div>
				<h3>{this.state.name}</h3>
				{this.renderTemp('Current', this.state.temp)}
				{this.renderTemp('Max', this.state.max)}
				{this.renderTemp('Min', this.state.min)}

			</div>
		)
	}
});
