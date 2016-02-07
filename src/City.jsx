import React from 'react';
import buffer from './buffer.jsx';
import './styl/city.styl';

const colorList = ['emerald', 'green', 'blue', 'purple', 'dark', 'yellow', 'orange', 'red', 'grey'];

export default React.createClass({
	getDefaultProps() {
		return {
			id: 0,
			isLocal: false,
			forecastShown: false,
			forecast: [],
			onRemove: ()=> {
			}
		}
	},
	getInitialState() {
		return {
			color: this.getRandomColor()
		}
	},
	onRemove() {
		this.props.onRemove(this.props.id)
	},
	getRandomColor() {
		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		return colorList[getRandomInt(0, colorList.length - 1)]
	},
	getForecast(){
		buffer.getForecast(this.props.id, result => {
			this.setState({
				forecast: result.list
					.filter((data, index) => {
						return index % 8 === 0 && index < 25 && index > 0
					})
					.map(data => data.main.temp)
			})
		});
	},
	renderTemp(temp, modifier, key) {
		let classname = !!modifier ? `temp temp-${modifier.toLowerCase()}` : 'temp';
		return !!temp && (
				<div className={classname} key={key}>
					<span className="temp--value">
						{Math.round(temp)}° C
					</span>
				</div>
			);
	},
	renderLocalIcon() {
		return (
			this.props.isLocal &&
			<div className="localIcon" title="city guessed by your location">
				<span className="fui-location"/>
			</div>
		);
	},
	toggleForecast() {
		this.state.forecastShown = !this.state.forecastShown;
		this.getForecast()
	},
	render() {
		let classnames = `city city-${this.state.color}`;
		let isDataLoaded = this.props.name && !!this.props.temp;
		return (
			<div className={classnames}>
				{this.renderLocalIcon()}
				<div className="closeButton">
					<span onClick={this.onRemove} className="fui-cross"/>
				</div>
				{!isDataLoaded ?
					<div className="city--loader">Loading...</div> :
					<div className="city--data">
						<div className="city--name">
							<span>{this.props.name}</span>
						</div>

						{this.state.forecastShown ?
							<div className="city--info">
								<div className="city--description">Forecast:</div>
								{
									this.state.forecast.map((temp, i) => {
										return this.renderTemp(temp, 'forecast', i);
									})
								}
							</div>
							:
							<div className="city--info">
								{this.renderTemp(this.props.temp, 'current')}
								<div className="city--description">{this.props.description}</div>
							</div>

						}
					</div>
				}
				{
					isDataLoaded &&
					<div className="city--forecastBtn">
						<a className="btn btn-block btn-lg btn-default" onClick={this.toggleForecast}>
							{this.state.forecastShown ? 'Show current' : 'Show forecast'}
						</a>
					</div>

				}


			</div>

		);
	}
});
