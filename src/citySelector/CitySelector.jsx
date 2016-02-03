import React from 'react';
import Autocomplete from 'react-autocomplete';

import cities from './city.list.js';
import {matchCity, sortCities} from './utils.jsx';

export default React.createClass({
	getDefaultProps() {
		return {
			onCitySelected: ()=>{}
		}
	},
	getInitialState() {
		return {
			value: ''
		}
	},
	renderSuggestion(suggestion){
		return (
			<div>{suggestion.name}</div>
		);
	},

	citySelected(cityName, cityObj) {
		this.props.onCitySelected(cityObj._id);
		this.setState({
			value: ''
		});
	},
	render() {
		return (
			<div className="citySelector">
				<Autocomplete
					onSelect={this.citySelected}
					onChange={this.onChange}
					initialValue=""
					items={cities}
					shouldItemRender={matchCity}
					sortItems={sortCities}
					getItemValue={(item) => item.name}
					renderItem={this.renderSuggestion}
				/>
			</div>
		);
	}
});