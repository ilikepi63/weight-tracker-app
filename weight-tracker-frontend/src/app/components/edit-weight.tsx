"use client";

import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { LoadingContext } from "../context/loading.context";
import { makeRequest } from "../http/http";
import { Weight } from "../models/weight";

interface EditWeightProps{
    weight: Weight
    complete: () => void
}

export default function EditWeight({weight, complete}: EditWeightProps) {

	const {setLoading} = useContext(LoadingContext);
	const router = useRouter();

	const [amount, setAmount] = useState(weight.amount);


	const addWeight = async () => {

		setLoading(true);
		const result = await makeRequest<{
            "message": string,
            "response": {
                "_id": string,
                "userId": string,
                "amount": number,
                "createdOn": string,
                "updatedOn": string
            }[]
        }>(`${process.env.NEXT_PUBLIC_BASE_URL}/weight/${weight._id}`, {
        	method: "PUT",
        	body: JSON.stringify({
        		amount: weight
        	})
        });

		if (result instanceof Error) {
			//TODO: send an error
			setLoading(false);
			return;
		}

		router.back();

		setLoading(false);

		complete();
    
	};


	return (
		<div>
			<div className="bg-gray-50">

				<div className="flex flex-col items-center justify-center">
					<div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Edit weight {weight._id}
							</h1>
							<div className="space-y-4 md:space-y-6">
								<label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-900 ">Weight</label>
								<input value={amount} onChange={(e) => setAmount(Number(e.target.value))} type="number" name="weight" id="weight" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Weight" />
							</div>
							<button type="submit" className="btn" onClick={() => addWeight()}>Update Weight</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}