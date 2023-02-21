"use client";

import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { LoadingContext } from "../context/loading.context";
import { makeRequest } from "../http/http";
import { AuthContext } from "../context/auth.context";

export default function SignUp() {

	const { setLoading } = useContext(LoadingContext);
	const router = useRouter();
	const authContext = useContext(AuthContext);

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [emailAddress, setEmailAddress] = useState("");

	const signUp = async () => {
		setLoading(true);

		const result = await makeRequest<{
            "message": string,
            "response": {
                "firstName": string
                "lastName": string,
                "emailAddress": string
            }
        }>(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`, {
        	method: "POST",
        	body: JSON.stringify({
        		firstName,
        		lastName,
        		password,
        		emailAddress
        	})
        });

		if (result instanceof Error) {
			return;
		}

		// if no error, we then sign in and save the token

		const signInResult = await makeRequest<{
            "message": string,
            "response": {
                "token": string,
                "user": {
                    "firstName": string
                    "lastName": string,
                    "emailAddress": string
                }
            }
        }>(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signin`, {
        	method: "POST",
        	body: JSON.stringify({
        		password,
        		emailAddress
        	})
        });

		if(signInResult instanceof Error){
			return;
		}

		localStorage.setItem("_token", signInResult.response.token);

		authContext.setUser(signInResult.response.user);

		router.push("/");

		setLoading(false);

	};

	return (
		<div>
			<div className="bg-gray-50">

				<div className="flex flex-col items-center justify-center">
					<div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Sign Up
							</h1>
							<div className="space-y-4 md:space-y-6">
								<label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
								<input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" name="firstName" id="firstName" placeholder="first name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />

							</div>
							<div>
								<label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
								<input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" name="lastName" id="lastName" placeholder="last name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
							</div>
							<div >
								<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
								<input value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" />
							</div>
							<div>
								<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
								<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
							</div>

							<button type="submit" className="btn" onClick={() => signUp()}>Sign Up</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
