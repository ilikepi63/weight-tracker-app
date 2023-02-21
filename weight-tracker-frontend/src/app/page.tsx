"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { makeRequest } from "./http/http";
import { Weight } from "./models/weight";
import WeightListItem from "./components/weight-list-item";
import AddSvg from "./svg/add-svg";

export default function Home() {

	const router = useRouter();

	const [weights, setWeights] = useState<Weight[]>([]);
	const [chosenWeight, setChosenWeight] = useState<Weight | null>(null);

	const getWeights = async () => {
		const result = await makeRequest<{
      "message": string,
      "response": {
        "_id": string,
        "userId": string,
        "amount": number,
        "createdOn": string,
        "updatedOn": string
      }[]
    }>(`${process.env.NEXT_PUBLIC_BASE_URL}/weight`);

		if (result instanceof Error) {
			// send an error

			return;
		}

		setWeights(result.response);

	};

	useEffect(() => {
		getWeights();
	}, []);

	const addWeight = () => {
		router.push("add-weight");
	};

	const deleteWeight = async (weight: Weight) => {
		const result = await makeRequest<{
      "message": string,
    }>(`${process.env.NEXT_PUBLIC_BASE_URL}/weight/${weight._id}`, {
    	method: "DELETE"
    });

		if (result instanceof Error) {
			// send an error

			return;
		}

		await getWeights();
	};

	const updateWeight = async (weight: Weight) => {
		const result = await makeRequest<{
      "message": string,
    }>(`${process.env.NEXT_PUBLIC_BASE_URL}/weight/${weight._id}`, {
    	method: "PUT",
    	body: JSON.stringify({
    		amount: weight.amount
    	})
    });

		if (result instanceof Error) {
			// send an error

			return;
		}

		await getWeights();
	};

	return (
		<div className="flex flex-col pb-2 px-2 ">
			<div className="flex flex-row justify-between items-center">
				<div className="flex flex-row">
					<div className="flex flex-row justify-end items-start"> <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mb-5">
            Hello!
					</h1></div>
				</div>

			</div>
			<div className="mb-2 flex flex-row justify-between items-between"><div><h1 className="text-lg leading-tight tracking-tight text-gray-900">Your weights</h1></div><div onClick={() => addWeight()} className="cursor-pointer"><AddSvg/></div></div>
			<div className="">
				{weights.length > 0 ? weights.map(weight => <div className="mb-2"><WeightListItem weight={weight} deleteFn={deleteWeight} saveFn={updateWeight}></WeightListItem></div>) : <p>Nothing to see here...</p>}
			</div>
		</div>
	);
}
