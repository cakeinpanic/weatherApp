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
			cityData: {},
			localCityId: 0
		}
	},
	onCityRemove(cityId) {
		let newList = this.state.cityList;
		let cityPosition = newList.indexOf(cityId);
		if (cityPosition !== -1) {
			newList.splice(cityPosition, 1);
			this.updateList(newList);
		}
	},
	updateList(newList) {
		this.setState(
			{cityList: newList}
		);
		this.getWeather();
		localStorage.setItem('WeatherApp', newList);
	},
	addCity(cityId) {
		let cityPosition = this.state.cityList.indexOf(cityId);
		if (cityPosition === -1) {
			let newList = this.state.cityList.concat([cityId]);
			this.updateList(newList);
		}
	},
	addLocalCity() {
		this.addCity(this.state.localCityId);
	},
	getUserLocalCity() {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition((position)=> {

				var lat = position.coords.latitude;
				var lon = position.coords.longitude;

				buffer.getByCoords(lat, lon, result => {
					this.setState({localCityId: result.id});
				})
			})
		}
	},
	getLocallyStoredData(){
		let localCityList = (localStorage.getItem('WeatherApp') || '')
			.split(',')
			.map(id=> +id);

		let isLocallyStored = localCityList[0] != 0;
		if (isLocallyStored) {
			this.updateList(localCityList);
		}
	},
	componentDidMount() {
		this.getLocallyStoredData();
		this.getUserLocalCity();
		this.getWeather();
		this._interval = setInterval(this.getWeather, 2000);
	},
	componentWillUnmount() {
		clearInterval(this._interval);
	},
	getWeather() {
		buffer.getFewCitiesData(this.state.cityList, result => {
			let cityList = {};
			result.list.forEach(data => {
					cityList[data.id] = {
						name: data.name,
						temp: data.main.temp
					};
				}
			);
			this.setState({cityData: cityList});
		});
	},

	render() {
		let isLocalShown = this.state.cityList.indexOf(this.state.localCityId) !== -1;
		//console.log(this.state.cityList);
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
								return <City
									key={i}
									onRemove={this.onCityRemove}
									id={cityId}
									{...this.state.cityData[cityId]}
									isLocal={cityId === this.state.localCityId}/>
							})
					}
				</div>
			</div>
		);
	}
});