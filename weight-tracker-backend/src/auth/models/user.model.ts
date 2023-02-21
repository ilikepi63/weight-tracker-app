import {
	Length,
	IsEmail,
	IsDate,
} from "class-validator";
import { ObjectId } from "mongodb";
import { SignUpInput } from "../dto/signup.input";
import { generateHash } from "../utils/hash.util";

export class UserModel {

	constructor(firstName: string, lastName: string, createdOn: Date, updatedOn: Date, emailAddress: string, password_hash: string, id?: ObjectId,) {
		this._id = id;
		this.id = String(id);
		this.firstName = firstName;
		this.lastName = lastName;
		this.createdOn = createdOn;
		this.updatedOn = updatedOn;
		this.emailAddress = emailAddress;
		this.passwordHash = password_hash;
	}

	_id?: ObjectId;
	id?: string;

    @Length(3, 100)
    	firstName: string;

    @Length(3, 100)
    	lastName: string;

    @IsEmail()
    	emailAddress: string;

    @IsDate()
    	createdOn: Date;

    @IsDate()
    	updatedOn: Date;

    passwordHash: string;

    public static async fromSignUp(input: SignUpInput): Promise<UserModel | Error> {
    	const passwordHash = await generateHash(input.password);

    	if (passwordHash instanceof Error) {
    		return new Error("There was an error hashing the given password. A user could not be created.");
    	}

    	return new UserModel(input.firstName, input.lastName, new Date(), new Date(), input.emailAddress, passwordHash);
    }

}