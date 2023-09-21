import { Image } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import { FC } from "react";
import { CSS } from "@dnd-kit/utilities";

interface Props {
	id: string;
	src: string;
	alt: string;
	tag: string;
}

const SortableImage: FC<Props> = ({ id, src, alt, tag }) => {
	// Implement lazy loading
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id });
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};
	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className="relative flex flex-col items-center overflow-hidden w-[27vw] h-[30vw] md:w-full md:h-[300px] rounded-lg justify-self-center bg-blue-800"
		>
			<Image
				zIndex={0}
				as={motion.img}
				height={"100%"}
				width={"100%"}
				src={src}
				alt={alt}
				objectFit="cover"
				fallbackSrc="https://placehold.co/800?text=Unavailable&font=lato"
				whileHover={{ scale: 1.2 }}
				transition="0.1s ease"
			/>
			<div className="absolute bottom-3 px-3 py-1 bg-[#DD6B20] rounded-md max-[375px]:text-xs text-sm md:text-base">{tag}</div>
		</div>
	);
};

export default SortableImage;
