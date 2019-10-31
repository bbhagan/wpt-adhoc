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

/**
 * Calculates difference percentage between value and best ranked test
 *
 * @param {number} value -- Test value to calc diff % against
 * @memberof TestResultCompetativeAnalysis
 */
export const calcPercentFromRank1 = (value, rank1) => {
	return Math.round(100 * (value / rank1) - 100);
};

/**
 * Calculates difference between the test value and the current best ranked test (to correct precision)
 *
 * @param {number} value -- The test value to be compared
 * @param {number} rank1Value -- Best test number
 * @param {string} uom -- Unit of measure (ms, s, etc)
 * @param {number} decimalPlacePrecision -- How many decimal places to round to
 *
 * @memberof TestResultCompetativeAnalysis
 */
export const calcDiffFromRank1 = (
	value,
	rank1Value,
	uom,
	decimalPlacePrecision
) => {
	return calcUOMPrecision(value - rank1Value, uom, decimalPlacePrecision);
};
