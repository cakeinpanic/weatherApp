import React from 'react';
import buffer from './buffer.jsx';
import './styl/city.styl';

const colorList = ['emerald', 'green', 'blue', 'purple', 'dark', 'yellow', 'orange', 'red',  'grey'];

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
	renderTemp(temp, modifier) {
		let classname = !!modifier ? `temp temp-${modifier.toLowerCase()}` : 'temp';
		return !!temp && (
				<div className={classname}>
					<span className="temp--value">
						{Math.round(temp)}° C
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
	render() {
		let classnames = `city city-${this.state.color}`;
		let isDataLoaded = this.props.name && !!this.props.temp;
		return (
			<div className={classnames}>
				{this.renderLocalIcon()}
				<div className="closeButton">
					<span onClick={this.onRemove} className="fui-cross"/>
				</div>
				<div className="city--name">
					<span>{this.props.name}</span>
				</div>
				{isDataLoaded ?
					<div className="city--info">
						{this.renderTemp(this.props.temp, 'current')}
					</div>
					:
					<div className="city--loader">Loading...</div>
				}

			</div>

		);
	}
});
