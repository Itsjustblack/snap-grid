/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://api.unsplash.com",
	params: {
		client_id: "jBDbVr_oWTUwFAmq-LEOJxAq2pMtDYtCIgeHOZF38_M" /* import.meta.env.VITE_UNSPLASH_ACCESS_KEY */,
		page: Math.floor(Math.random() * (10 - 0 + 1)),
		per_page: 20,
	},
});

export const getImages = async (query: string) => {
	if (query === "") {
		try {
			const res = await axiosInstance.get("/photos");
			return res.data.map((item: any) => {
				const { id, alt_description, urls } = item;
				return { id, alt: alt_description, urls };
			});
		} catch (error) {
			console.error(error);
			return [];
		}
	} else {
		try {
			const res = await axiosInstance.get("/search/photos", {
				params: {
					query: query,
				},
			});
			return res.data.results.map((item: any) => {
				const { id, description, urls } = item;
				return { id, alt: description, urls };
			});
		} catch (error) {
			console.error("Error fetching images:", error);
			return [];
		}
	}
};
