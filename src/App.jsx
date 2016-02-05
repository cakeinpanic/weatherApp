import React from 'react';

import './styl/app.styl';
import '../node_modules/flat-ui/css/flat-ui.css'

import City from './City.jsx';
import CitySelector from './citySelector/CitySelector.jsx';
import buffer from './buffer.jsx';


export default React.createClass({
	getInitialState() {
		return {
			cityList: [],
			localCityId: 0
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
	addCity(cityId) {
		let cityPosition = this.state.cityList.indexOf(cityId);
		if (cityPosition === -1) {
			let newList = this.state.cityList.concat([cityId]);
			this.updateList(newList);
		}
	},
	addLocalCity(){
		this.addCity(this.state.localCityId);
	},
	getLocation(addLocalCity){
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition((position)=> {

				var lat = position.coords.latitude;
				var lon = position.coords.longitude;

				buffer.getByCoords(lat, lon, (result) => {
					this.setState({localCityId: result.id});
					if (addLocalCity) {
						this.addCity(result.id);
					}
				})
			})
		}
	},
	componentDidMount() {
		let localCityList = (localStorage.getItem('WeatherApp') || '')
			.split(',')
			.map(id=> +id);

		let isLocallyStored = localCityList[0] != 0;
		if (isLocallyStored) {
			this.updateList(localCityList);
		}

		this.getLocation(!isLocallyStored);


	},
	render() {
		let isLocalShown = this.state.cityList.indexOf(this.state.localCityId) !== -1;
		return (
			<div className="app">
				<div className="panel">
					<div className="panel--title">Weather app</div>
					{!isLocalShown && <div className="panel--addLocal">
						<a className="btn btn-block btn-lg btn-default" onClick={this.addLocalCity}>
							<span className="fui-location"/> Add local city
						</a></div>
					}
					<div className="panel--selector">
						<CitySelector onCitySelected={this.addCity} shownList={this.state.cityList}/>
					</div>
				</div>
				<div className="cities">
					{
						this.state.cityList
							.map((cityId, i) => {
								return <City onRemove={this.onCityRemove} key={i} id={cityId}
									isLocal={cityId === this.state.localCityId}/>
							})
					}
				</div>
			</div>
		);
	}
});