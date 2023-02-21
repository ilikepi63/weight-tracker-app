import { UserModel } from "../models/user.model";

export class SignUpOutput {

	firstName: string;
	lastName: string;
	emailAddress: string;

	constructor(firstName: string, lastName: string, emailAddress: string) { 
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailAddress = emailAddress;
	}

	public static fromUser(user: UserModel): SignUpOutput {

		return new SignUpOutput(user.firstName, user.lastName, user.emailAddress);

	}
}