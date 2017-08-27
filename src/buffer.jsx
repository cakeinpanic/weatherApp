let token = '929344a935f2f5bead18fa4bb33696e0';
let url = `https://api.openweathermap.org/data/2.5/`;
let postfix = `appid=${token}&units=metric`;

import $ from 'jquery';
export default {
	getById: function (id, callback) {
		$.get(`${url}weather?id=${id}&${postfix}`,
			callback);

	},
	getForecast: function (id, callback) {
		$.get(`${url}forecast?id=${id}&${postfix}`,
			callback);
	},
	tryCityName: function(cityName, callback) {
		$.get(`${url}weather?q=${cityName}&${postfix}`,
			callback);
	},
	getByCoords: function (lat, lon, callback) {
		$.get(`${url}weather?lat=${lat}&lon=${lon}&${postfix}`,
			callback);

	},
	getFewCitiesData: function (cityIdArray, callback) {
		$.get(`${url}group?id=${cityIdArray.toString()}&${postfix}`,
			callback);
	}
}