import {
	IsDate,
	IsNotEmpty,
	Min,
} from "class-validator";

export class WeightModel{

	constructor(limit: number, page: string){
		this.limit = limit;
		this.page = page;
	}

    @IsNotEmpty()
    @Min(0)
    	page: string;
    
    @Min(0)
    @IsNotEmpty()
    	limit: number;

}