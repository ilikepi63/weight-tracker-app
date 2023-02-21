import express from "express";
import { config } from "dotenv";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";

// import middleware
import { authMiddleware } from "./auth/auth.middleware";

// import controllers
import authController from "./auth/auth.controller";
import weightController from "./weight/weight.controller";

config();

const port = process.env.PORT;

if (!port) {
	console.error("Please specify a port when initiating the app.");
	throw new Error("No PORT specified in config");
}

const secret = process.env.SECRET;

if (!secret) {
	console.error("Please specify a secret when initiating the app.");
	throw new Error("No SECRET specified in config");
}

// create the app instance
const app = express();


// apply middleware
app.use(express.json());
app.use(helmet());
app.use(cors());


//swagger
const swaggerDocument = require("./swagger.json");

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Apply routes.
app.use("/auth", authController);
app.use("/weight", authMiddleware, weightController);

app.listen(port, () => console.log(`Listening on port ${port}`));