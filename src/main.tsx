import { ChakraProvider, ThemeConfig, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import AuthProvider from "./components/AuthProvider";

const queryClient = new QueryClient();

const config: ThemeConfig = {
	initialColorMode: "dark",
};

const theme = extendTheme({
	config,
	colors: {
		gray: {
			50: "#f9f9f9",
			100: "#ededed",
			200: "#d3d3d3",
			300: "#b3b3b3",
			400: "#a0a0a0",
			500: "#898989",
			600: "#6c6c6c",
			700: "#202020",
			800: "#121212",
			900: "#111",
		},
	},
});

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ChakraProvider
				toastOptions={{ defaultOptions: { position: "top-right", duration: 3000, isClosable: true } }}
				theme={theme}
			>
				<AuthProvider>
					<RouterProvider router={router} />
				</AuthProvider>
			</ChakraProvider>
			<ReactQueryDevtools />
		</QueryClientProvider>
	</React.StrictMode>
);
