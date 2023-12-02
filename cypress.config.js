const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
			config.env = process.env;
			return config;
		},
		baseUrl: "http://pruebas-soft.s3-website.us-east-2.amazonaws.com",
	},
	screenshotOnRunFailure: true,
	video: false,
});
