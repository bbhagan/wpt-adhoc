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
  return Number(returnValue);
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

/**
 * Calculates Mob vs Desk winner for any given two fields, returns label and percentage
 *
 * @param {object} field1 -- Comparison field 1
 * @param {object} field2  -- Comparison field 2
 * @param {string} field1MobDesk -- Field 1 "Mob" or "Desk"
 * @param {string} field2MobDesk -- Field 2 "Mob" or "Desk"
 * @returns {string}
 */
export const determineWinner = (
  field1,
  field2,
  field1MobDesk,
  field2MobDesk
) => {
  const winner = field1 > field2 ? field2MobDesk : field1MobDesk;
  let returnText = winner;
  if (winner === field1MobDesk) {
    returnText += ` (${Math.round(100 - (field1 / field2) * 100)}%)`;
  } else {
    returnText += ` (${Math.round(100 - (field2 / field1) * 100)}%)`;
  }
  return returnText;
};
