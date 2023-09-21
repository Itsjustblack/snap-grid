import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { Outlet } from "react-router-dom";

const Layout = () => {
	const { pathname } = useLocation();
	useEffect(() => {
		console.log(pathname);
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, [pathname]);
	return (
		<motion.div
			className="relative h-full w-full"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ opacity: { duration: 0.6, ease: "easeInOut" } }}
		>
			<Outlet />
		</motion.div>
	);
};

export default Layout;
