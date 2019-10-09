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
