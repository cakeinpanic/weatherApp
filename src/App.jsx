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
						return <City key={i} id={cityId}/>
					})
				}
				<CitySelector onCitySelected={this.citySelected}/>
			</div>
		);
	}
});