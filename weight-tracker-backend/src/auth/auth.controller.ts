import { Router } from "express";
import { SignUpInput } from "./dto/signup.input";
import { SignInInput } from "./dto/signin.input";
import { SignUpOutput } from "./dto/signup.output";
import { createUser, signInUser } from "./auth.service";
import { authMiddleware } from "./auth.middleware";
import { UserModel } from "./models/user.model";

const router = Router();

/**
 * @openapi
 * /auth:
 *   get:
 *     description: Sign a User Up
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                       description: The user's first name
 *                       example: Cameron
 *                     lastName:
 *                       type: string
 *                       description: The user's last name
 *                       example: Harris
 *                     emailAddress:
 *                       type: string
 *                       description: The user's email address
 *                       example: cameronh63@gmail.com
 *                     password:
 *                       type: string
 *                       description: The user's password
 *                       example: password123
 * 
 */
router.get("/", authMiddleware, async (req, res) => {
	try {

		const { firstName, lastName, emailAddress } = (req as unknown as { user: UserModel }).user;

		res
			.status(200)
			.json({
				message: "Success",
				response: {
					firstName, lastName, emailAddress
				}
			});

	} catch (e) {
		console.error("An Error Threw:");
		console.error(e);

		res
			.status(500)
			.json({
				message: "Internal Server Error",
			});
	}
});

/**
 * @openapi
 * /auth/signup:
 *   post:
 *     description: Sign a User Up
  *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              emailAddress:
 *                  type: string
 *                  description: The user's email address
 *                  example: cameronh63@gmail.com
 *              password:
 *                  type: string
 *                  description: The user's password
 *                  example: password123
  *              firstName:
 *                  type: string
 *                  description: The user's First Name
 *                  example: Cameron
 *              lastName:
 *                  type: string
 *                  description: The user's last name
 *                  example: Harris
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                       description: The user's first name
 *                       example: Cameron
 *                     lastName:
 *                       type: string
 *                       description: The user's last name
 *                       example: Harris
 *                     emailAddress:
 *                       type: string
 *                       description: The user's email address
 *                       example: cameronh63@gmail.com
 *                     password:
 *                       type: string
 *                       description: The user's password
 *                       example: password123
 */
router.post("/signup", async (req, res) => {
	try {

		const signUpInput = SignUpInput.fromJson(req.body);

		if (signUpInput instanceof Error) {
			res.status(400).json({
				message: "Could not interpret the payload"
			});
			return;
		}

		const errors = await signUpInput.validate();

		if (errors.length > 0) {
			res.status(400).json({
				message: "Error with your input",
				errors
			});
			return;
		}

		const result = await createUser(signUpInput);

		console.log("Resultx`", result);

		if (result instanceof Error) {
			res
				.status(500)
				.json({
					message: "There seems to have been an issue creating the user."
				});

			return;
		}

		res
			.status(201)
			.json({
				message: "Created",
				response: SignUpOutput.fromUser(result)
			});
	} catch (e) {
		console.error("An Error Threw:");
		console.error(e);

		res
			.status(500)
			.json({
				message: "Internal Server Error",
			});
	}
});

/**
 * @openapi
 * /auth/signin:
 *   post:
 *     description: Sign a User In
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              emailAddress:
 *                  type: string
 *                  description: The user's email address
 *                  example: cameronh63@gmail.com
 *              password:
 *                  type: string
 *                  description: The user's password
 *                  example: password123
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                       description: The user's first name
 *                       example: Cameron
 *                     lastName:
 *                       type: string
 *                       description: The user's last name
 *                       example: Harris
 *                     emailAddress:
 *                       type: string
 *                       description: The user's email address
 *                       example: cameronh63@gmail.com
 *                     password:
 *                       type: string
 *                       description: The user's password
 *                       example: password123
 */
router.post("/signin", async (req, res) => {
	try {

		const signInInput = SignInInput.fromJson(req.body);

		if (signInInput instanceof Error) {
			res.status(400).json({
				message: "Could not interpret the payload"
			});
			return;
		}

		const errors = await signInInput.validate();

		if (errors.length > 0) {
			res.status(400).json({
				message: "Error with your input",
				errors
			});
			return;
		}

		const result = await signInUser(signInInput);

		if (result instanceof Error) {

			res.status(400).json({
				message: "Invalid User."
			});
			return;
		}

		res
			.status(200)
			.json({
				message: "Success",
				response: result
			});

	} catch (e) {
		console.error("An Error Threw:");
		console.error(e);

		res
			.status(500)
			.json({
				message: "Internal Server Error",
			});
	}
});

export default router;