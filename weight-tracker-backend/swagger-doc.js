const fs = require("fs/promises");

const main = async () => {
	const swaggerJsdoc = require("swagger-jsdoc");

	const options = {
		failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
		definition: {
			openapi: "3.0.0",
			info: {
				title: "Weight Tracker API",
				version: "1.0.0",
			},
		},
		apis: ["./src/**/*.ts"],
	};

	const openapiSpecification = swaggerJsdoc(options);

	await fs.writeFile("src/swagger.json", JSON.stringify(openapiSpecification));

};

main();
