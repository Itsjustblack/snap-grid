import { useQuery } from "@tanstack/react-query";
import { getImages } from "../services/config";

export const useImages = (query: string) =>
	useQuery({
		queryKey: ["images", query],
		queryFn: () => getImages(query),
	});
