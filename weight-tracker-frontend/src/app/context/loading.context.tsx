"use client;";

import React, { useState } from "react";

export interface ILoadingContext {
    isLoading: boolean;
    setLoading: (b: boolean) => void
}

export const LoadingContext = React.createContext<ILoadingContext>({isLoading: false, setLoading: () => {}});

export interface LoadingProviderProps{
    children: React.ReactNode
}

export const LoadingProvider = ({children}: LoadingProviderProps) => {

	const [loading, setLoading] = useState<boolean>(false);

	return (
		<LoadingContext.Provider value={{isLoading: loading, setLoading}}>{children}</LoadingContext.Provider>
	);
};
