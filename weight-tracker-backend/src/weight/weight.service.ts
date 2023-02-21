import { ObjectId } from "mongodb";
import { getWeightCollection } from "../repository/mongodb";
import { WeightInput } from "./dto/weight.input";
import { WeightModel } from "./models/weight.model";

export const getWeightsByUserId = async (userId: string): Promise<WeightModel[]> => {

	const result = await getWeightCollection().find({userId}, {limit: 10});

	return result.toArray() as unknown as WeightModel[];

};

export const createWeight = async (userId: string, input: WeightInput): Promise<WeightModel | Error> => {

	const weight = WeightModel.new(userId, input.amount);

	const result = await getWeightCollection().insertOne(weight);

	if(result.insertedId){
		return weight;
	}else{
		const message = "Failed to insert weight into the database.";
		console.error(message);
		return new Error(message);
	}
};

export const deleteWeight = async (userId: string, id: ObjectId): Promise<boolean> => {

	// ideally would like to have deletion indicators as opposed
	// to actually deleting the record.
	const result = await getWeightCollection().deleteOne({userId, _id: id});

	return result.deletedCount > 0;
};

export const updateWeight = async (userId: string, id: ObjectId, amount: number): Promise<boolean> => {

	const result = await getWeightCollection().updateOne({userId, _id: id}, {
		$set: {
			amount: amount
		},
	});

	return result.modifiedCount > 0;
};