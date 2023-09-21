/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search2Icon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement, Spinner } from "@chakra-ui/react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, KeyboardSensor, MouseSensor, TouchSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { SortableContext, arrayMove, rectSortingStrategy, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Overlay from "../components/Overlay";
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
	const [isDragging, setIsDragging] = useState(false);
	const [activeId, setActiveId] = useState<any | null>(null);
	const tags = ["Earth", "Earth", "Rest", "Food", "Street", "Earth", "Street"];

	useEffect(() => {
		if (data) setItems(data);
		console.log(data);
	}, [data]);

	const onSubmit = (data: FieldValues) => {
		setSearchValue(data.search);
	};

	const OnDragStart = (event: DragStartEvent) => {
		const { active } = event;
		setIsDragging(true);
		setActiveId(active.id);
	};

	const OnDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (active.id === over?.id) return;
		setItems((items) => {
			const oldIndex = items.findIndex((item) => item?.id === active?.id);
			const newIndex = items.findIndex((item) => item?.id === over?.id);
			return arrayMove(items, oldIndex, newIndex);
		});
		setIsDragging(false);
		setActiveId(null);
	};

	const sensors = useSensors(
		useSensor(TouchSensor, {
			activationConstraint: {
				delay: 150,
				tolerance: 8,
			},
		}),
		useSensor(MouseSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
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
					<div className="w-full h-full overflow-y-auto grid grid-cols-3 lg:grid-cols-4 gap-5">
						<DndContext
							sensors={sensors}
							collisionDetection={closestCenter}
							onDragStart={OnDragStart}
							onDragEnd={OnDragEnd}
							modifiers={[restrictToWindowEdges]}
							autoScroll
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
							<DragOverlay dropAnimation={{ duration: 500, easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)" }}>{isDragging ? <Overlay src={items?.find((a) => a.id === activeId)?.url} /> : null}</DragOverlay>
						</DndContext>
					</div>
				)}
			</div>
		</div>
	);
};

export default Gallery;
