import {
	IsEmail,
	ValidationError,
	validate,
} from "class-validator";

export class SignInInput{

	constructor(emailAddress: string, password: string){
		this.emailAddress = emailAddress;
		this.password = password;
	} 

    @IsEmail()
    	emailAddress: string;

    password: string;

    public static fromJson(json: Record<string, any> | undefined): SignInInput | Error {

    	if (!json) return new Error("Invalid Sign Up Input");

    	return new SignInInput(json["emailAddress"], json["password"]);

    }

    async validate(): Promise<ValidationError[]> {
    	return validate(this);
    }
}