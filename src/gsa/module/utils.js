function len(item) {
	if (item === null || item === undefined) return undefined;
	switch (item.constructor.name) {
		case "Object":
			return Object.keys(item).length;
		case "Set":
		case "Map":
			return item.size;
		case "Array":
		case "String":
			return item.length;
		case "Number":
			return Math.floor(Math.log10(item)) + 1;
		default:
			return undefined;
	}
}

module.exports = len;