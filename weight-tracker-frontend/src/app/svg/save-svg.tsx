import React from "react";

export interface ISvgProps{
    colour?: string
}

export default function SaveSvg({colour}: ISvgProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
			<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" fill="none" stroke={colour || "black"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
			<polyline points="17 21 17 13 7 13 7 21" fill="none" stroke={colour || "black"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
			<polyline points="7 3 7 8 15 8" fill="none" stroke={colour || "black"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
		</svg>
	);
}