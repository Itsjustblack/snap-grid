import { createBrowserRouter } from "react-router-dom";
import Gallery from "./pages/gallery";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Gallery />,
	},
]);

export default router;
