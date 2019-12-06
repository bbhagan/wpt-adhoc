/**
 * Reformats moment date format to something more readable (ex: 2019-12-05 9:56:05 PM)
 *
 * @param {string} dateString -- Moment formatted date string
 *
 * @returns {string}
 */
export const getReadableDateFromMoment = dateString => {
	const date = dateString.substr(0, 10);
	let hour = dateString.substr(11, 2);
	let min = dateString.substr(14, 2);
	let sec = dateString.substr(17, 2);
	let amPm = "AM";

	switch (hour) {
		case "00":
			hour = "12";
			break;
		case "13":
			hour = "1";
			amPm = "PM";
			break;
		case "14":
			hour = "2";
			amPm = "PM";
			break;
		case "15":
			hour = "3";
			amPm = "PM";
			break;
		case "16":
			hour = "4";
			amPm = "PM";
			break;
		case "17":
			hour = "5";
			amPm = "PM";
			break;
		case "18":
			hour = "6";
			amPm = "PM";
			break;
		case "19":
			hour = "7";
			amPm = "PM";
			break;
		case "20":
			hour = "8";
			amPm = "PM";
			break;
		case "21":
			hour = "9";
			amPm = "PM";
			break;
		case "22":
			hour = "10";
			amPm = "PM";
			break;
		case "23":
			hour = "11";
			amPm = "PM";
			break;
	}

	return `${date} ${hour}:${min}:${sec} ${amPm}`;
};
