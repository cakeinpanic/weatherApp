import React from 'react';
import buffer from '../buffer.jsx';
import {createModifiers} from '../utlis/utils.jsx';
import './city.styl';

const colorList = ['emerald', 'green', 'blue', 'purple', 'dark', 'yellow', 'orange', 'red', 'grey'];

export default React.createClass({
	propTypes: {
		id: React.PropTypes.number,
		onRemove: React.PropTypes.func,
		isLocal: React.PropTypes.bool
	},
	getDefaultProps() {
		return {
			id: 0,
			isLocal: false,
			onRemove: ()=> {
			}
		}
	},
	getInitialState() {
		return {
			color: this.getRandomColor(),
			forecastShown: false,
			forecast: []
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
						//array comes with data for every 3 hours,
						//so for three days i need take every eights value
						return index % 8 === 0 && index < 25 && index > 0
					})
					.map(data => data.main.temp)
			})
		});
	},
	toggleForecast() {
		this.state.forecastShown = !this.state.forecastShown;
		this.getForecast()
	},
	renderTemperature(temp, modifier, key) {
		let classname = createModifiers(`temp`, modifier && modifier.toLowerCase());
		return !!temp && (
				<div className={classname} key={key}>
					<span className="temp--value">
						{Math.round(temp)} °C
					</span>
				</div>
			);
	},
	renderLocalIcon() {
		return (
			this.props.isLocal &&
			<div className="city--localIcon" title="city guessed by your location">
				<span className="fui-location"/>
			</div>
		);
	},
	renderCurrent(){
		return (
			<div className="city--info">
				<div className="city--description">Daily forecast:</div>
				{this.state.forecast.map((temp, i) => {
					return this.renderTemperature(temp, 'forecast', i);
				})}
			</div>
		)
	},
	renderForecast(){
		return (
			<div className="city--info">
				{this.renderTemperature(this.props.temp, 'current')}
				<div className="city--description">{this.props.description}</div>
			</div>
		)
	},
	renderForecastBtn() {
		return (<div className="city--forecastBtn">
				<a className="btn btn-block btn-lg btn-default" onClick={this.toggleForecast}>
					{this.state.forecastShown ? 'Show current' : 'Show forecast'}
				</a>
			</div>
		)
	},
	render() {
		let classname = createModifiers(`city`, this.state.color);
		let isDataLoaded = this.props.name && !!this.props.temp;
		return (
			<div className={classname}>

				{this.renderLocalIcon()}

				<div className="city--close">
					<span onClick={this.onRemove} className="fui-cross"/>
				</div>

				{
					!isDataLoaded ?
					<div className="city--loader">Loading...</div> :
					<div className="city--data">
						<div className="city--name">
							<span>{this.props.name}</span>
						</div>
						{this.state.forecastShown ? this.renderCurrent() : this.renderForecast()}
					</div>
				}

				{isDataLoaded && this.renderForecastBtn()}


			</div>

		);
	}
});
