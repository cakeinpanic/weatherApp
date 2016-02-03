export function matchCity(city, value) {
	return (
		city.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
	)
}
export function sortCities(a, b, value) {
	return (
		a.name.toLowerCase().indexOf(value.toLowerCase()) >
		b.name.toLowerCase().indexOf(value.toLowerCase()) ? 1 : -1
	)
}