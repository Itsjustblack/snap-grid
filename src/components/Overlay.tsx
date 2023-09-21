import { Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FC } from "react";

interface Props {
	src: string | undefined;
}

const Overlay: FC<Props> = ({ src }) => {
	return (
		<div className="relative flex flex-col items-center overflow-hidden w-[27vw] h-[30vw] md:w-full md:h-[300px] rounded-lg justify-self-center touch-none">
			<Image
				opacity={0.8}
				zIndex={0}
				as={motion.img}
				height={"100%"}
				width={"100%"}
				src={src}
				objectFit="cover"
				whileHover={{ scale: 1.2 }}
				transition="0.1s ease"
			/>
		</div>
	);
};

export default Overlay;
