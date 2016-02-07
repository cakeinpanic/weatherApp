let token = '44db6a862fba0b067b1930da0d769e98';
let url = `http://api.openweathermap.org/data/2.5/`;
let postfix = `appid=${token}&units=metric`;

import $ from 'jquery';
export default {
	getById: function (id, callback) {
		$.get(`${url}weather?id=${id}&${postfix}`,
			callback);

	},
	getByCoords: function (lat, lon, callback) {
		$.get(`${url}weather?lat=${lat}&lon=${lon}&${postfix}`,
			callback);

	},
	getFewCitiesData: function (cityIdArray, callback) {
		$.get(`${url}/group?id=${cityIdArray.toString()}&${postfix}`,
			callback);
	}
}