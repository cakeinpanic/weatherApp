import React from 'react';
import City from './City.jsx';
import CitySelector from './citySelector/CitySelector.jsx';

import './styl/main.styl';

export default React.createClass({
	getInitialState() {
		return {
			cityList: [707860]
		}
	},
	onCityRemove(cityId){

		let newList =  this.state.cityList;
		let cityPosition = newList.indexOf(cityId);
		newList.splice(cityPosition,1);

		this.setState(
			{cityList: newList}
		)
	},
	citySelected(cityId){
		this.setState(
			{cityList: this.state.cityList.concat([cityId])}
		)
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