import React from 'react';
import buffer from './buffer.jsx';
import './styl/city.styl';

const colorList = ['emerald', 'green', 'blue', 'purple', 'dark', 'yellow', 'orange', 'red', 'white', 'grey'];

//todo: fin Nan in temp
//todo: remove added city from list
export default React.createClass({
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
			temp: 0,
			min: 0,
			max: 0,
			color: this.getRandomColor(),
			name: '',
			loaded: false
		}
	},

	request() {
		buffer.getById(this.props.id,
			result => {
				this.setState({
					temp: result.main.temp,
					min: result.main.temp_min,
					max: result.main.temp_max,
					name: result.name,
					loaded: true
				});
			});
	},
	componentDidMount() {
		this.request();
		this._interval = setInterval(this.request, 1000);
	},
	componentWillUnmount() {
		clearInterval(this._interval);
	},
	onRemove() {
		this.props.onRemove(this.props.id)
	},
	getRandomColor() {
		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		let color = colorList[getRandomInt(0, colorList.length - 1)];
		return color;
	},
	renderTemp(label, temp, modifier) {
		let classname = !!modifier ? `temp temp-${modifier.toLowerCase()}` : 'temp';
		return (
			<div className={classname}>
				{
					!!label &&
					<span className="temp--label">
						{label}
					</span>
				}
				<span className="temp--value">
					{Math.round(temp)}°C
				</span>
			</div>
		);
	},
	renderLocalIcon(){
		return (
			this.props.isLocal &&
			<div className="localIcon" title="city guessed by your location">
				<span className="fui-location"/>
			</div>
		);
	},
	renderInfo(){
		let classnames = `city city-${this.state.color}`;
		return (
			<div className={classnames}>

				{this.renderLocalIcon()}
				<div className="closeButton">
					<span onClick={this.onRemove} className="fui-cross"/>
				</div>
				<div className="city--name">
					<span>{this.state.name}</span>
				</div>
				<div className="city--info">
					{this.renderTemp(null, this.state.temp, 'current')}
					{this.renderTemp('Max', this.state.max)}
					{this.renderTemp('Min', this.state.min)}
				</div>
			</div>
		);
	},
	renderLoader(){
		return (
			<div className="city">
				<div className="loader">
					loading...
				</div>
			</div>
		);
	},
	render() {
		return (
			this.state.loaded ? this.renderInfo() : this.renderLoader()
		)
	}
});
