import React from 'react';

import './app.styl';
import '../node_modules/flat-ui/css/flat-ui.css'

import City from './city/City.jsx';
import CitySelector from './citySelector/CitySelector.jsx';
import buffer from './buffer.jsx';

import Notifications from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const WEATHER_GETTING_TIMEOUT = 10000;
const ALERT_HIDING_TIMEOUT = 1000;

export default React.createClass({
	getInitialState() {
		return {
			cityList: [],
			cityData: {},
			localCityId: 0,
			notifications: []
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
	updateList(cityList, localCityId) {

		localCityId = localCityId || this.state.localCityId;
		let localCityPosition = cityList.indexOf(localCityId);

		if (localCityPosition !== -1) {
			cityList.splice(localCityPosition, 1);
			cityList.unshift(localCityId);
		}

		this.setState({
			cityList,
			localCityId,
			isLocalShown: localCityPosition !== -1
		});

		this.getWeather(cityList);
		localStorage.setItem('WeatherApp', cityList);
	},
	addCity(cityId, cityName) {
		if (!!cityId) {
			this.addCityById(cityId);
		} else {
			this.addCityByName(cityName);
		}
	},
	showAlert(alert) {
		this.setState({
			notifications: [alert]
		});
		setTimeout(()=> {
			this.setState({notifications: []})
		}, ALERT_HIDING_TIMEOUT);
	},
	addCityByName(cityName){
		buffer.tryCityName(cityName, result => {
			if (result.name && result.name.toLowerCase() === cityName.toLowerCase()) {
				this.addCityById(result.id);
			} else {
				this.showAlert({
					title: 'No such city',
					message: cityName,
					type: 'error'

				});
			}
		})
	},
	addCityById(cityId) {
		let cityPosition = this.state.cityList.indexOf(cityId);
		if (cityPosition === -1) {
			let newList = ([cityId]).concat(this.state.cityList);
			this.updateList(newList);
		}
	},
	addLocalCity() {
		this.addCityById(this.state.localCityId);
	},
	getUserLocalCity() {
		return new Promise(function(resolve) {
			if ('geolocation' in navigator) {
				navigator.geolocation.getCurrentPosition((position)=> {

					var lat = position.coords.latitude;
					var lon = position.coords.longitude;

					buffer.getByCoords(lat, lon, result => {
						resolve(result.id);
					})
				})
			} else {
				resolve();
			}

		});
	},
	getLocallyStoredData(){
		let localCityList = (localStorage.getItem('WeatherApp') || '')
			.split(',')
			.map(id=> +id);

		return (localCityList[0] === 0) ? [] : localCityList;

	},
	componentDidMount() {
		let cityList = this.getLocallyStoredData();
		this.getUserLocalCity().then(localCityId => {
			let localCityPosition = cityList.indexOf(localCityId);
			if (!!localCityId && localCityPosition === -1) {
				cityList.unshift(localCityId);
			}
			this.updateList(cityList, localCityId);
		});

		this._interval = setInterval(this.getWeather, WEATHER_GETTING_TIMEOUT);
	},
	componentWillUnmount() {
		clearInterval(this._interval);
	},
	getWeather(cityList) {
		cityList = cityList || this.state.cityList;
		buffer.getFewCitiesData(cityList, result => {
			let cityList = {};
			result.list.forEach(data => {
					cityList[data.id] = {
						name: data.name,
						temp: data.main.temp,
						description: data.weather[0].description
					};
				}
			);
			this.setState({cityData: cityList});
		});
	},

	render() {
		return (
			<div className="app">
				<Notifications notifications={this.state.notifications}/>

				<div className="panel">
					<div className="panel--title">Weather app
						<a className="panel--github" href="https://github.com/cakeinpanic/weatherApp" target="_blank">
							<span className="github-icon"/>
						</a>
					</div>
					{!this.state.isLocalShown && <div className="panel--addLocal">
						<a className="btn btn-block btn-lg btn-default" onClick={this.addLocalCity}>
							<span className="fui-location"/> <span className="btn--text">Add local city</span>
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