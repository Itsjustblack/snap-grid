/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search2Icon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement, Spinner } from "@chakra-ui/react";
import { DndContext, DragEndEvent, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import SortableImage from "../components/SortableImage";
import { useImages } from "../hooks/useImages";

interface IPhoto {
	id: string;
	src: string;
	url: string;
	alt: string;
}

const Gallery = () => {
	const { handleSubmit, register } = useForm();
	const [searchValue, setSearchValue] = useState("");
	const { data, isLoading } = useImages(searchValue);
	const [items, setItems] = useState<IPhoto[]>([]);
	const tags = ["Earth", "Earth", "Rest", "Food", "Street", "Earth", "Street"];

	useEffect(() => {
		if (data) setItems(data);
	}, [data]);

	const onSubmit = (data: FieldValues) => {
		setSearchValue(data.search);
	};

	const OnDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (active.id === over?.id) return;
		setItems((items) => {
			const oldIndex = items.findIndex((item) => item?.id === active?.id);
			const newIndex = items.findIndex((item) => item?.id === over?.id);
			return arrayMove(items, oldIndex, newIndex);
		});
	};

	const sensors = useSensors(
		useSensor(TouchSensor),
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

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
				{isLoading ? (
					<div className="flex w-full justify-center items-center h-[300px]">
						<Spinner
							thickness="4px"
							speed="0.65s"
							emptyColor="gray.200"
							color="blue.500"
							size="xl"
						/>
					</div>
				) : (
					<div className="w-full h-screen grid grid-cols-3 lg:grid-cols-4 gap-5">
						<DndContext
							sensors={sensors}
							collisionDetection={closestCenter}
							onDragEnd={OnDragEnd}
						>
							<SortableContext
								items={items}
								strategy={rectSortingStrategy}
							>
								{items?.map((image: IPhoto, index: number) => (
									<SortableImage
										key={image.id}
										id={image.id}
										src={image.url}
										alt={image.alt}
										tag={searchValue || tags[index]}
									/>
								))}
							</SortableContext>
						</DndContext>
					</div>
				)}
			</div>
		</div>
	);
};

export default Gallery;
