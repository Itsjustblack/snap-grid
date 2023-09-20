import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider, ThemeConfig, extendTheme } from "@chakra-ui/react";

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
			<ChakraProvider theme={theme}>
				<App />
			</ChakraProvider>
			<ReactQueryDevtools />
		</QueryClientProvider>
	</React.StrictMode>
);
