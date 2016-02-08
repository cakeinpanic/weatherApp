import React from 'react';
import Autocomplete from 'react-autocomplete';

import cities from './city.list.js';
import {sortCities, createModifiers} from '../utlis/utils.jsx';
import './citySelector.styl';

const ENTER = 13;

export default React.createClass({
	propTypes: {
		shownList: React.PropTypes.arrayOf(React.PropTypes.number),
		onCitySelected: React.PropTypes.func
	},
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
	renderSuggestion(suggestion, isHighLighted, style, index) {

		let classname = createModifiers('dropdown--option', isHighLighted && 'highlighted')
		return (
			<li className={classname} key={index}>
				{suggestion.name}
			</li>
		);
	},

	citySelected(cityName, cityObj) {
		this.props.onCitySelected(!!cityObj && cityObj._id, cityName);
		this.setState({
			value: ''
		});
	},
	renderMenu(items, value, style) {
		this._resultsCount = items.length;
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
	onKeyDown(e) {
		if (this._resultsCount === 0 && e.keyCode === ENTER) {
			this.citySelected(this.state.value);
		}

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
					onKeyDown={this.onKeyDown}
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