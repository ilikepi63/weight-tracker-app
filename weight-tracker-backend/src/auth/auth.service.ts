import { getUsersCollection } from "../repository/mongodb";
import { SignUpInput } from "./dto/signup.input";
import { UserModel } from "./models/user.model";
import { SignInInput } from "./dto/signin.input";
import { SignInOutput } from "./dto/signin.output";
import { UserOutput } from "./dto/user.output";
import { compareHash } from "./utils/hash.util";
import { signToken } from "./utils/jwt.util";

export async function createUser(input: SignUpInput): Promise<UserModel | Error> {

	const user = await UserModel.fromSignUp(input);

	if(user instanceof Error){
		return user;
	}

	// We'd probably want to index the users collection here, so that there
	// definitely won't be race conditions
	const userExists = (await findOneByEmail(user.emailAddress)) !== undefined;

	if(userExists){
		console.log("Returning Error");
		return new Error("Duplicate Email. A user already exists with that email.");
	}

	const result = await getUsersCollection().insertOne(user);

	if(result.insertedId){
		return user;
	}else{
		const message = "Failed to insert user into the database.";
		console.error(message);
		return new Error(message);
	}

}

export async function findOneByEmail(email: string): Promise<UserModel | undefined>{

	const result = await getUsersCollection().find({
		emailAddress: email
	}).toArray();

	console.log("Find by email address");

	console.log(result);

	if(result.length > 0){
		return result[0] as unknown as UserModel;
	}

}

export async function signInUser(input: SignInInput): Promise<SignInOutput | Error>{

	const validUser = await validateUser(input);

	if(validUser instanceof Error) return validUser;

	const userOutput = new UserOutput(String(validUser._id), validUser.firstName, validUser.lastName, validUser.emailAddress);

	const token = await signToken({
		id: String(validUser._id),
		firstName: validUser.firstName, 
		lastName: validUser.lastName,
		emailAddress: validUser.emailAddress
	});

	if(token instanceof Error) return token;

	return new SignInOutput(token, userOutput);

}

async function validateUser(input: SignInInput): Promise<UserModel | Error> {

	const user = await findOneByEmail(input.emailAddress);

	if(!user){
		return new Error(`No User found for email ${input.emailAddress}`);
	}

	const isValid = await compareHash(input.password, user?.passwordHash);

	if(isValid){
		return user;
	}else{
		return new Error("Invalid Password");
	}

}   