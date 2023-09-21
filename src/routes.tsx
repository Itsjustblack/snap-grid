import { createBrowserRouter } from "react-router-dom";
import Gallery from "./pages/gallery";
import Login from "./pages/login";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import SignUp from "./pages/signup";

const router = createBrowserRouter([
	{
		path: "",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Login />,
			},
			{
				path: "/signup",
				element: <SignUp />,
			},
		],
	},
	{
		element: <PrivateRoute />,
		children: [
			{
				path: "/gallery",
				element: <Gallery />,
			},
		],
	},
]);

export default router;
