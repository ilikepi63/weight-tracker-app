import {
	Min,
	validate,
	ValidationError,
} from "class-validator";

export class WeightInput{

	constructor(amount: number){
		this.amount = amount;
	}

    
    @Min(0)
    	amount: number;


    async validate(): Promise<ValidationError[]> {
    	return validate(this);
    }
}