export class UserOutput {

	id: string;
	firstName: string;
	lastName: string;
	emailAddress: string;

	constructor(id: string, firstName: string, lastName: string, emailAddress: string) { 
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailAddress = emailAddress;
		this.id = id;
	}
}