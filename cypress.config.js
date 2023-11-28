const { defineConfig } = require("cypress");

module.exports = defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		baseUrl: "http://pruebas-soft.s3-website.us-east-2.amazonaws.com",
	},
	screenshotOnRunFailure: true,
	video: false,
});
