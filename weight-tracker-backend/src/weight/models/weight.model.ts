import {
	IsDate,
	IsNotEmpty,
	Min,
} from "class-validator";

export class WeightModel{

	constructor(userId: string, amount: number, createdOn: Date, updatedOn: Date){
		this.userId = userId; 
		this.amount = amount;
		this.createdOn = createdOn;
		this.updatedOn = updatedOn;
	}

    @IsNotEmpty()
    	userId: string;
    
    @Min(0)
    	amount: number;

    @IsDate()
    	createdOn: Date;

    @IsDate()
    	updatedOn: Date;

    public static new(userId: string, amount: number){
    	return new WeightModel(userId, amount, new Date(), new Date());
    }

}