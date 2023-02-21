import { verify, sign, type Jwt } from "jsonwebtoken";
import { config } from "dotenv";

config();

const secret = process.env.SECRET as string;

export const decodeToken = async (token: string) => new Promise<Record<string, any> | Error>((resolve) => {
	verify(token, secret, {complete: true},(err: Error | null, decoded: Jwt | undefined) => {
		if (err) resolve(err);
		else resolve(decoded as Record<string, any>);
	});
});

export const signToken = async (payload: Record<string, any>) => new Promise<string | Error>((resolve) => {
	sign(payload, secret, { expiresIn: 60 * 60 }, (err: Error | null, token: string | undefined) => {
		if (err) resolve(err);
		else resolve(token as string);
	});
});