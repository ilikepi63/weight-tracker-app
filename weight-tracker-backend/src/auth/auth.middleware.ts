import { RequestHandler } from "express";
import { decodeToken } from "./utils/jwt.util";

export const authMiddleware: RequestHandler = async (req, res, next) => {

	const authHeader = req.headers.authorization;

	if (!authHeader) {
		res.status(401).json({
			message: "Unauthorized"
		});

		return;
	}

	const bearerToken = (authHeader as string).split(" ")[1];

	const user = await decodeToken(bearerToken);

	if (user instanceof Error) {
		res.status(403).json({
			message: "Forbidden"
		});
		return;
	}

	// @ts-ignore
	req.user = user.payload; 

	next();

};