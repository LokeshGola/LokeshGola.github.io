const fs = require("fs");
const { defineConfig } = require("cypress");

module.exports = defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
			on("after:spec", (spec, results) => {
				fs.writeFileSync(
					"after_spec_results.json",
					JSON.stringify(results.tests)
				);
			});
		},
	},
});
