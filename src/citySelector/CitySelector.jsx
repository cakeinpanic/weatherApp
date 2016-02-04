import React from 'react';
import Autocomplete from 'react-autocomplete';

import cities from './city.list.js';
import {matchCity, sortCities} from './utils.jsx';
import './citySelector.styl';

export default React.createClass({
	getDefaultProps() {
		return {
			onCitySelected: ()=> {
			}
		}
	},
	getInitialState() {
		return {
			value: ''
		}
	},
	renderSuggestion(suggestion){
		return (
			<li className="dropdown--option">
				{suggestion.name}
			</li>
		);
	},

	citySelected(cityName, cityObj) {
		this.props.onCitySelected(cityObj._id);
		this.setState({
			value: ''
		});
	},
	renderMenu(items, value, style){
		return (
			<div style={style} className="dropdown">
				<ul className="dropdown--list">
					{items}
				</ul>
			</div>

		);
	},
	render() {
		let inputProps = {
			className: 'form-control'
		};
		return (
			<div className="citySelector">
				<Autocomplete
					renderMenu={this.renderMenu}
					inputProps={inputProps}
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