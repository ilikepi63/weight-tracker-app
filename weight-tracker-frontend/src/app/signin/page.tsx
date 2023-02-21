"use client";

import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { LoadingContext } from "../context/loading.context";
import { makeRequest } from "../http/http";

export default function SignIn() {

	const {setLoading} = useContext(LoadingContext);
	const {setUser} = useContext(AuthContext);
	const router = useRouter();

	const [password, setPassword] = useState("");
	const [emailAddress, setEmailAddress] = useState("");
    
	const signIn = async () => {

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

		setUser(signInResult.response.user);

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
                                Sign in to your account
							</h1>
							<div className="space-y-4 md:space-y-6">
								<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
								<input value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" />
							</div>
							<div>
								<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
								<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
							</div>

							<button type="submit" className="btn" onClick={() => signIn()}>Sign in</button>

							<p className="text-sm font-light text-gray-500">
                                Don’t have an account yet? <a href="/signup" className="font-medium text-primary-600 hover:underline">Sign up</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
