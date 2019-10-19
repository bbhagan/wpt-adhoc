/**
 * Converts and rounds values, ms -> s, bytes -> KB
 * @param {number} value -- The value to round
 * @param {string} uom -- Unit of measure (ms, s, KB)
 * @param {number} decimalPlacePrecision -- Decimal places to round to
 * @return {number}
 */
export const calcUOMPrecision = (value, uom, decimalPlacePrecision) => {
	let returnValue;
	switch (uom) {
		case "ms":
			returnValue = Math.round(value);
			break;
		case "s":
			returnValue = (value / 1000).toFixed(decimalPlacePrecision);
			break;
		case "KB":
			returnValue = (value / 1024).toFixed(decimalPlacePrecision);
			break;
		default:
			returnValue = value;
	}
	return returnValue;
};
