"use client";
import "./globals.css";
import { AuthContext, AuthProvider } from "./context/auth.context";
import { LoadingProvider, LoadingContext } from "./context/loading.context";
import { useContext, useEffect } from "react";
import { makeRequest } from "./http/http";
import { useRouter } from "next/navigation";
import React from "react";

export default function RootLayout({
	children,
}: {
  children: React.ReactNode
}) {

	const router = useRouter();

	const { isLoading, setLoading } = useContext(LoadingContext);
	const { setUser } = useContext(AuthContext);

	const loadingSpinner = () => (<div className="bg-green-500 flex justify-center items-center loading"><div>Loading</div></div>);

	const isUnauthenticated = ["/signin", "/signup"].includes(window.location.pathname);

	useEffect(() => {

		if (isUnauthenticated) return;
		setLoading(true);

		makeRequest<{
      "message": string,
      "response": {
        "firstName": string
        "lastName": string,
        "emailAddress": string
      }
    }>(`${process.env.NEXT_PUBLIC_BASE_URL}/auth`).then((res) => {

    	setLoading(false);

    	if (res instanceof Error) {
    		router.push("/signin");
    	} else {
    		// setting user
    		console.log("Setting user");
    		setUser(res.response);
    	}

    });
	}, []);

	return (
		<html lang="en">
			<head />
			<body>
				<LoadingProvider>
					<AuthProvider>{isLoading ? loadingSpinner() : <main>

						{!isUnauthenticated && <div className="w-full pt-2 pr-2">
							<div className="flex flex-row justify-end items-start "><p className="text-sm cursor-pointer" onClick={() => {
								localStorage.setItem("_token", "");
								router.push("/signin");
							}}>Sign Out</p></div>
						</div>}
						{children}</main>}</AuthProvider>
				</LoadingProvider>
			</body>
		</html >
	);
}
