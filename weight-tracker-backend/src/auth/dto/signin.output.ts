import { UserOutput } from "./user.output";

export class SignInOutput {

	token: string;
	user: UserOutput;

	constructor(token: string, user: UserOutput) { 
		this.token = token; 
		this.user = user;
	}
}