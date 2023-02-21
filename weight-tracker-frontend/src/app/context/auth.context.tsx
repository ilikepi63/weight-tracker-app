import React, { useState } from "react";

export interface IUser {
    firstName: string;
    lastName: string;
    emailAddress: string;
}

export interface IAuthContext{
    setUser: (user: IUser | null) => void
    user: IUser | null
}

export const AuthContext = React.createContext<IAuthContext>({
	setUser: () => {},
	user: null
});

export interface AuthProviderProps{
    children: React.ReactNode
}

export const AuthProvider = ({children}: AuthProviderProps) => {

	const [user, setUser] = useState<IUser | null>(null);

	return (
		<AuthContext.Provider value={{
			setUser,
			user
		}}>{children}</AuthContext.Provider>
	);
};