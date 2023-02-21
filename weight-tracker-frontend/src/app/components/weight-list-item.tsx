import { Weight } from "../models/weight";
import { prettifyDate } from "../util/pretty-date";
import CloseSvg from "../svg/close-svg";
import SaveSvg from "../svg/save-svg";
import { useState } from "react";
import React from "react";

interface IWeightListItemProps {
    weight: Weight
    deleteFn: (weight: Weight) => Promise<void>,
    saveFn: (weight: Weight) => Promise<void>
}

export default function WeightListItem({ weight, deleteFn, saveFn }: IWeightListItemProps) {

	const [amount, setAmount] = useState(weight.amount);
	const [canBeChanged, setCanBeChanged] = useState(false);

	return (
		<div className="p-4 flex flex-row justify-between items-center border border-gray-900 rounded">
			<div className="flex flex-row">
				<div className="mr-2">{prettifyDate(weight.createdOn)}</div>
				<div><input type="number" className="input" value={amount} onChange={(e) => {
					setCanBeChanged(true);
					setAmount(Number(e.target.value));
				}} /></div>
			</div>

			<div onClick={() => {
				setCanBeChanged(false);
				if(canBeChanged){
					const newWeight = {
						...weight,
						amount
					};
					saveFn(newWeight);
				}
			}} className="cursor-pointer">
				<SaveSvg colour={canBeChanged ? "green": "black"}/>
			</div>
			<div onClick={() => deleteFn(weight)} className="cursor-pointer">
				<CloseSvg />
			</div>
		</div>
	);
}
