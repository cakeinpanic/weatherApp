import React from 'react';
import Autocomplete from 'react-autocomplete';

import cities from './city.list.js';
import {sortCities} from './utils.jsx';
import './citySelector.styl';

export default React.createClass({
	getDefaultProps() {
		return {
			shownList: [],
			onCitySelected: ()=> {
			}
		}
	},
	getInitialState() {
		return {
			value: ''
		}
	},
	onChange(e, value){
		this.setState({value});
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
	matchCity(city, value) {
		return (
			this.props.shownList.indexOf(city._id) === -1 &&
			city.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
		)
	},
	render() {
		let inputProps = {
			className: 'form-control'
		};
		return (
			<div className="citySelector">
				<Autocomplete
					value={this.state.value}
					onChange={this.onChange}
					renderMenu={this.renderMenu}
					inputProps={inputProps}
					onSelect={this.citySelected}
					items={cities}
					shouldItemRender={this.matchCity}
					sortItems={sortCities}
					getItemValue={(item) => item.name}
					renderItem={this.renderSuggestion}
				/>
			</div>
		);
	}
});