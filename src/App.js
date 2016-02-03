import React from 'react';
import City from './City.js';
import './styl/main.styl';

export default React.createClass({
	render() {
		return (
			<div className="app">
				<City></City>
				<City name="New York"></City>
			</div>
		);
	}
});