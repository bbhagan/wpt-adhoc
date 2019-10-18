// next.config.js

require("dotenv").config();

const path = require("path");
const Dotenv = require("dotenv-webpack");

const withSass = require("@zeit/next-sass");
module.exports = withSass({
	/* config options here */
	/*
	cssModules: true,
	cssLoaderOptions: {
		importLoaders: 1,
		localIdentName: "[local]___[hash:base64:5]"
	}
	*/

	webpack: config => {
		config.plugins = config.plugins || [];

		config.plugins = [
			...config.plugins,

			// Read the .env file
			new Dotenv({
				path: path.join(__dirname, ".env"),
				systemvars: true
			})
		];

		return config;
	}
});
