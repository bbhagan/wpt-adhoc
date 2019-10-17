export const resultsOptions = [
	{
		name: "Time to First Byte",
		wptField: "TTFB",
		type: "common",
		active: true,
		uom: "ms",
		decimalPlacePrecision: 0
	},
	{
		name: "Fully Loaded Bytes Out",
		wptField: "bytesOut",
		type: "uncommon",
		active: false,
		uom: "KB",
		decimalPlacePrecision: 0
	},
	{
		name: "Doc. Compl. Bytes Out",
		wptField: "bytesOutDoc",
		type: "uncommon",
		active: false,
		uom: "KB",
		decimalPlacePrecision: 2
	},
	{
		name: "Time to Negotiate SSL",
		wptField: "basePageSSLTime",
		type: "uncommon",
		active: false,
		uom: "ms",
		decimalPlacePrecision: 0
	},
	{
		name: "Time to Doc. Compl.",
		wptField: "docTime",
		type: "common",
		active: true,
		uom: "s",
		decimalPlacePrecision: 2
	},
	{
		name: "Time to Doc. Compl. Adj",
		wptField: "docTimeAdjusted",
		type: "synthetic",
		active: true,
		uom: "s",
		decimalPlacePrecision: 2
	},
	{
		name: "DOM Content Load Event End",
		wptField: "domContentLoadedEventEnd",
		type: "uncommon",
		active: false,
		uom: "s",
		decimalPlacePrecision: 2
	},
	{
		name: "DOM Content Load Event End Adj",
		wptField: "domContentLoadedEventEndAdjusted",
		type: "synthetic",
		active: false,
		uom: "s",
		decimalPlacePrecision: 2
	},
	{
		name: "Doc. Requests",
		wptField: "requestsDoc",
		type: "uncommon",
		active: false
	},
	{
		name: "Number of 404 Responses",
		wptField: "responses_404",
		type: "uncommon",
		active: false
	},
	{
		name: "Load Time",
		wptField: "loadTime",
		type: "uncommon",
		active: false,
		uom: "s",
		decimalPlacePrecision: 2
	},
	{
		name: "Load Time Adj",
		wptField: "loadTimeAdjusted",
		type: "synthetic",
		active: false,
		uom: "s",
		decimalPlacePrecision: 2
	},
	{
		name: "Load Event Start",
		wptField: "loadEventStart",
		type: "uncommon",
		active: false,
		uom: "s",
		decimalPlacePrecision: 2
	},
	{
		name: "Load Event Start Adj",
		wptField: "loadEventStartAdjusted",
		type: "synthetic",
		active: false,
		uom: "s",
		decimalPlacePrecision: 2
	},
	{
		name: "DOM Content Load Event Start",
		wptField: "domContentLoadedEventStart",
		type: "uncommon",
		active: false,
		uom: "s",
		decimalPlacePrecision: 2
	},
	{
		name: "DOM Content Load Event Start Adj",
		wptField: "domContentLoadedEventStartAdjusted",
		type: "synthetic",
		active: false,
		uom: "s",
		decimalPlacePrecision: 2
	},
	{
		name: "Doc. Compl. Bytes In",
		wptField: "bytesInDoc",
		type: "common",
		active: true,
		uom: "KB",
		decimalPlacePrecision: 2
	},
	{
		name: "End of Window Load Event",
		wptField: "loadEventEnd",
		type: "common",
		active: false,
		uom: "s",
		decimalPlacePrecision: 2
	},
	{
		name: "End of Window Load Event Adj",
		wptField: "loadEventEndAdjusted",
		type: "synthetic",
		active: false,
		uom: "s",
		decimalPlacePrecision: 2
	},
	{
		name: "Time to Fully Loaded?",
		wptField: "fullyLoaded",
		type: "common",
		active: true,
		uom: "s",
		decimalPlacePrecision: 2
	},
	{
		name: "Time to Fully Loaded Adj",
		wptField: "fullyLoadedAdjusted",
		type: "synthetic",
		active: true,
		uom: "s",
		decimalPlacePrecision: 2
	},
	{
		name: "Fully Loaded Bytes In?",
		wptField: "bytesIn",
		type: "uncommon",
		active: false,
		uom: "KB",
		decimalPlacePrecision: 2
	},
	{
		name: "Time to First Paint",
		wptField: "firstPaint",
		type: "common",
		active: true,
		uom: "s",
		decimalPlacePrecision: 2
	},
	{
		name: "Time to First Paint Adj",
		wptField: "firstPaintAdjusted",
		type: "synthetic",
		active: true,
		uom: "s",
		decimalPlacePrecision: 2
	},
	{
		name: "Total DOM Elements",
		wptField: "domElements",
		type: "common",
		active: false
	},
	{
		name: "Time to DOM Interactive",
		wptField: "domInteractive",
		type: "common",
		active: true,
		uom: "s",
		decimalPlacePrecision: 2
	},
	{
		name: "Time to DOM Interactive Adj",
		wptField: "domInteractiveAdjusted",
		type: "synthetic",
		active: true,
		uom: "s",
		decimalPlacePrecision: 2
	},
	{
		name: "Time to Dom Compl.",
		wptField: "domComplete",
		type: "common",
		active: true,
		uom: "s",
		decimalPlacePrecision: 2
	},
	{
		name: "Time to Dom Compl. Adj",
		wptField: "domCompleteAdjusted",
		type: "synthetic",
		active: true,
		uom: "s",
		decimalPlacePrecision: 2
	},
	{
		name: "Speed Index",
		wptField: "SpeedIndex",
		type: "uncommon",
		active: false
	},
	{
		name: "Visual Compl.",
		wptField: "visualComplete",
		type: "common",
		active: true,
		uom: "s",
		decimalPlacePrecision: 2
	},
	{
		name: "Visual Compl. Adj",
		wptField: "visualCompleteAdjusted",
		type: "synthetic",
		active: true,
		uom: "s",
		decimalPlacePrecision: 2
	},
	{
		name: "Render",
		wptField: "render",
		type: "uncommon",
		active: false,
		uom: "s",
		decimalPlacePrecision: 2
	},
	{
		name: "Render Adj",
		wptField: "renderAdjusted",
		type: "synthetic",
		active: false,
		uom: "s",
		decimalPlacePrecision: 2
	},
	{
		name: "Last Visual Change",
		wptField: "lastVisualChange",
		type: "uncommon",
		active: false,
		uom: "s",
		decimalPlacePrecision: 2
	},
	{
		name: "Last Visual Change Adj",
		wptFieldAdjusted: "lastVisualChangeAdjusted",
		type: "synthetic",
		active: false,
		uom: "s",
		decimalPlacePrecision: 2
	},
	{
		name: "Total Blocking Time",
		wptField: "TotalBlockingTime",
		type: "uncommon",
		active: false,
		uom: "s",
		decimalPlacePrecision: 2
	},
	{
		name: "Small Image Count",
		wptField: "smallImageCount",
		type: "uncommon",
		active: false
	},
	{
		name: "Big Image Count",
		wptField: "bigImageCount",
		type: "uncommon",
		active: false
	}
];
