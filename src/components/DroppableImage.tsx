import { Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FC } from "react";

interface Props {
	src: string;
	alt: string;
	tag: string;
}

const DroppableImage: FC<Props> = ({ src, alt, tag }) => {
	// Implement lazy loading
	return (
		<div className="relative flex flex-col items-center overflow-hidden w-full h-[300px] rounded-lg justify-self-center">
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
			<div className="absolute bottom-3 px-3 py-1 bg-[#DD6B20] rounded-md">{tag}</div>
		</div>
	);
};

export default DroppableImage;
