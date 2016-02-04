let token = '44db6a862fba0b067b1930da0d769e98';
import $ from 'jquery';
export default {
	getById: function(id, callback) {
		$.get(`http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${token}&units=metric`,
			callback);

	},
	getByCoords: function(lat, lon, callback) {
		$.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${token}&units=metric`,
			callback);

	}
}