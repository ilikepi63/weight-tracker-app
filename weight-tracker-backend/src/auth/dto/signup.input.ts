import {
	Length,
	IsEmail,
	validate,
	ValidationError
} from "class-validator";

export class SignUpInput {

	constructor(firstName: string, lastName: string, emailAddress: string, password: string) { 
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailAddress = emailAddress,
		this.password = password;
	}

    @Length(3, 100)
    	firstName: string;

    @Length(3, 100)
    	lastName: string;

    @IsEmail()
    	emailAddress: string;

    @Length(3, 100)
    	password: string;

    public static fromJson(json: Record<string, any> | undefined): SignUpInput | Error {

    	if (!json) return new Error("Invalid Sign Up Input");

    	return new SignUpInput(json["firstName"], json["lastName"], json["emailAddress"], json["password"]);

    }

    async validate(): Promise<ValidationError[]> {
    	return validate(this);
    }
}