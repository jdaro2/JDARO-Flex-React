/* eslint-disable react/prop-types */
import { Box, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { imagePath } from "../services/api";

const CardComponent = ({ item }) => {
  return (
    <Link to="/">
      <Box
        position={"relative"}
        transform={"scale(1)"}
        _hover={{
          transform: { base: "scale(1)", md: "scale(1.08)" },
          transition: "transform 0.2s ease-in-out",
          "& .overlay": {
            opacity: 1,
          },
        }}
      >
        <Image
          src={`${imagePath}/${item?.poster_path}`}
          alt={item?.title || item?.name}
          height={"100%"}
        />
        <Box
          className="overlay"
          position={"absolute"}
          p="2"
          bottom={"0"}
          left={"0"}
          w={"100%"}
          height={"33%"}
          bg={"rgba(0,0,0,0.9)"}
          opacity={"0"}
          transition={"opacity 0.3s ease-in-out"}
        >
          <Text>{item?.title || item?.name}</Text>
        </Box>
      </Box>
    </Link>
  );
};

export default CardComponent;
