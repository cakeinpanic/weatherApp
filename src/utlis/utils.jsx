export function sortCities(a, b, value) {
	return (
		a.name.toLowerCase().indexOf(value.toLowerCase()) >
		b.name.toLowerCase().indexOf(value.toLowerCase()) ? 1 : -1
	)
}
export function createModifiers(classname, modifier) {
	let modified = modifier ? `${classname}-${modifier}` : ``;
	return `${classname} ${modified}`

}