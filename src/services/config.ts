/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://api.unsplash.com",
	params: {
		client_id: "NmBBN0lzehUBxdSflSWfAIfBx63LRYoYU_VtWkPa9e4" /* import.meta.env.VITE_UNSPLASH_ACCESS_KEY */,
		page: 10,
		per_page: 20,
	},
});

export const getImages = async (query: string) => {
	if (query === "") {
		try {
			const res = await axiosInstance.get("/photos");
			return res.data.map((item: any) => {
				const { id, alt_description, urls } = item;
				return { id, alt: alt_description, url: urls.regular };
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
			console.log(res);
			return res.data.results.map((item: any) => {
				const { id, description, urls } = item;
				return { id, alt: description, url: urls.regular };
			});
		} catch (error) {
			console.error("Error fetching images:", error);
			return [];
		}
	}
};
