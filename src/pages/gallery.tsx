/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search2Icon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import DroppableImage from "../components/DroppableImage";
import { useImages } from "../hooks/useImages";

const Gallery = () => {
	const [searchValue, setSearchValue] = useState("");
	const { data: images } = useImages(searchValue);
	const { handleSubmit, register } = useForm();

	const onSubmit = (data: FieldValues) => {
		setSearchValue(data.search);
	};

	return (
		<div className="relative mt-20 mb-10">
			<div className="fixed flex justify-center items-center top-0 py-3 w-full bg-[#1A202C] px-5 sm:px-10 z-10">
				<form
					className="w-[500px] text-white"
					onSubmit={handleSubmit(onSubmit)}
				>
					<InputGroup>
						<InputLeftElement children={<Search2Icon color={"white"} />} />
						<Input
							id="search"
							borderRadius={20}
							variant="filled"
							{...register("search")}
							placeholder="Search Something..."
						/>
					</InputGroup>
				</form>
			</div>
			<div className="pt-10 px-5 sm:px-10 z-0">
				<div className="w-full h-screen grid min-[425px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
					{images?.map((image: any, key: number) => (
						<DroppableImage
							key={key}
							src={image.urls.regular}
							alt={image.alt}
							tag={searchValue || "Technology"}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Gallery;
