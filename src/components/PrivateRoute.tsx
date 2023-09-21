import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";

const PrivateRoute = () => {
	const { user } = useContext(AuthContext);
	if (!user) return <Navigate to="/" />;
	return <Outlet />;
};

export default PrivateRoute;
