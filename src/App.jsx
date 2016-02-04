import React from 'react';
import City from './City.jsx';
import CitySelector from './citySelector/CitySelector.jsx';

import './styl/main.styl';

export default React.createClass({
	getInitialState() {
		return {
			cityList: []
		}
	},
	onCityRemove(cityId) {
		let newList = this.state.cityList;
		let cityPosition = newList.indexOf(cityId);
		newList.splice(cityPosition, 1);

		this.updateList(newList);
	},
	updateList(newList) {
		this.setState(
			{cityList: newList}
		);
		localStorage.setItem('WeatherApp', newList);
	},
	citySelected(cityId){
		let newList = this.state.cityList.concat([cityId]);
		this.updateList(newList);
	},
	componentDidMount() {
		let list = localStorage.getItem('WeatherApp').split(',');
		if (list.length > 1 || !!list[0]) {
			this.setState(
				{cityList: list}
			);
		}
	},
	render() {
		return (
			<div className="app">
				{
					this.state.cityList.map((cityId, i) => {
						return <City onRemove={this.onCityRemove} key={i} id={cityId}/>
					})
				}
				<CitySelector onCitySelected={this.citySelected}/>
			</div>
		);
	}
});