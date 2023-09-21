import { User, onAuthStateChanged } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";

interface AuthContextType {
	user: User | null;
}

interface Props {
	children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: Props) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) setCurrentUser(user);
		});
	}, []);

	return <AuthContext.Provider value={{ user: currentUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
