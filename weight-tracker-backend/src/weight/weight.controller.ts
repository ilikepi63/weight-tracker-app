import { Router } from "express";
import { ObjectId } from "mongodb";
import { UserModel } from "../auth/models/user.model";
import { WeightInput } from "./dto/weight.input";
import { createWeight, deleteWeight, getWeightsByUserId, updateWeight } from "./weight.service";

export const router = Router();

/**
 * @openapi
 * /weight:
 *   get:
 *     description: Get a list of user's weights
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
 *                     message:
 *                       type: string
 *                       description: The response message
 *                       example: Success
 *                     response:
 *                       type: object
 *                       description: The user's last name
 *                       properties:
 *                          userId:
 *                              type: string 
 *                              description: The weight's user's ID.
 *                              example: 63f4adc3a7af2b56187d94f1
 *                          amount:
 *                              type: number 
 *                              description: The weight's amount param.
 *                              example: 120
 *                          createdOn:
 *                              type: Date 
 *                              description: Created Date in UTC
 *                              example: 2023-02-21T12:56:36.351Z
 *                          updatedOn:
 *                              type: number 
 *                              description:  Update Date in UTC
 *                              example: 2023-02-21T12:56:36.351Z
 *                          _id:
 *                              type: string 
 *                              description: The weight's ID
 *                              example: 63f4adc3a7af2b56187d94f1
 */
router.get("/", async (req, res) => {
	try {

		const result = await getWeightsByUserId((req as unknown as { user: UserModel }).user.id as string);

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


/**
 * @openapi
 * /weight:
 *   post:
 *     description: Create a weight
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number 
 *                 description: The weight's amount param.
 *                 example: 120
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       description: The response message
 *                       example: Success
 *                     response:
 *                       type: object
 *                       description: The user's last name
 *                       properties:
 *                          userId:
 *                              type: string 
 *                              description: The weight's user's ID.
 *                              example: 63f4adc3a7af2b56187d94f1
 *                          amount:
 *                              type: number 
 *                              description: The weight's amount param.
 *                              example: 120
 *                          createdOn:
 *                              type: Date 
 *                              description: Created Date in UTC
 *                              example: 2023-02-21T12:56:36.351Z
 *                          updatedOn:
 *                              type: number 
 *                              description:  Update Date in UTC
 *                              example: 2023-02-21T12:56:36.351Z
 *                          _id:
 *                              type: string 
 *                              description: The weight's ID
 *                              example: 63f4adc3a7af2b56187d94f1
 */
router.post("/", async (req, res) => {
	try {

		const input = new WeightInput(req.body.amount);

		const errors = await input.validate();

		if (errors.length > 0) {
			res.status(400).json({
				message: "Error with your input",
				errors
			});
			return;
		}

		const result = await createWeight((req as unknown as { user: UserModel }).user.id as string, input);

		if (result instanceof Error) {
			res
				.status(500)
				.json({
					message: "Something went wrong when creating the weight. Please try again."
				});
		}

		res
			.status(201)
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

/**
 * @openapi
 * /weight:
 *   put:
 *     description: Update a weight
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Object ID of the weight to be updated
 *         schema:
 *           type: string
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
router.put("/:id", async (req, res) => {
	try {

		const amount = req.body.amount;

		const result = await updateWeight((req as unknown as { user: UserModel }).user.id as string, new ObjectId(req.params.id), amount);

		if (!result) {
			res
				.status(500)
				.json({
					message: "Something went wrong when deleting the weight. Please try again."
				});
		}

		res
			.status(201)
			.json({
				message: "Success",
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
 * /weight:
 *   delete:
 *     description: Delete a weight
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Object ID of the weight to be delete to retrieve.
 *         schema:
 *           type: string
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
 *                     message:
 *                       type: string
 *                       description: Response message
 *                       example: Success
 */
router.delete("/:id", async (req, res) => {
	try {

		const result = await deleteWeight((req as unknown as { user: UserModel }).user.id as string, new ObjectId(req.params.id));

		if (!result) {
			res
				.status(500)
				.json({
					message: "Something went wrong when deleting the weight. Please try again."
				});
		}

		res
			.status(201)
			.json({
				message: "Success",
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