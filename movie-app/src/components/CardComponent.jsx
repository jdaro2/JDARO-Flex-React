/* eslint-disable react/prop-types */
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { imagePath } from "../services/api";
import { StarIcon } from "@chakra-ui/icons";
import { handleScrollToTop } from "../utils/helpers";

const CardComponent = ({ item, type }) => {
  const actorUrl = "https://www.themoviedb.org/person";

  return (
    <Box>
      {type === "person" ? (
        <Link target="_blank" to={`${actorUrl}/${item?.id}`}>
          <Box
            position={"relative"}
            transform={"scale(1)"}
            height={"100%"}
            _hover={{
              transform: { base: "scale(1)", md: "scale(1.08)" },
              transition: "transform 0.2s ease-in-out",
              zIndex: "10",
              "& .overlay": {
                opacity: 1,
              },
            }}
          >
            {item?.profile_path ? (
              <Image
                src={`${imagePath}/${item?.profile_path}`}
                alt={item?.title || item?.name}
                height={"100%"}
              />
            ) : (
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/7/72/Default-welcomer.png"
                alt={item?.title || item?.name}
                w={"100%"}
                height={"300px"}
                objectFit={"cover"}
                borderRadius={"sm"}
              />
            )}

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
              <Text textAlign={"center"}>{item?.title || item?.name}</Text>

              <Flex
                alignItems={"center"}
                justifyContent={"center"}
                gap={"2"}
                mt={"4"}
              >
                <StarIcon fontSize={"small"} />
                <Text> Popularity: {item?.popularity?.toFixed(1)}</Text>
              </Flex>
            </Box>
          </Box>
        </Link>
      ) : (
        <Link to={`/${type}/${item?.id}`} onClick={handleScrollToTop}>
          <Box
            position={"relative"}
            transform={"scale(1)"}
            height={"100%"}
            _hover={{
              transform: { base: "scale(1)", md: "scale(1.08)" },
              transition: "transform 0.2s ease-in-out",
              zIndex: "10",
              "& .overlay": {
                opacity: 1,
              },
            }}
          >
            {item?.poster_path ? (
              <Image
                src={`${imagePath}/${item?.poster_path}`}
                alt={item?.title || item?.name}
                height={"100%"}
              />
            ) : (
              <Image
                src="https://media.istockphoto.com/id/1472933890/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=Rdn-lecwAj8ciQEccm0Ep2RX50FCuUJOaEM8qQjiLL0="
                alt={item?.title || item?.name}
                w={"100%"}
                height={"100%"}
                objectFit={"cover"}
                borderRadius={"sm"}
              />
            )}

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
              <Text textAlign={"center"}>{item?.title || item?.name}</Text>
              <Text
                textAlign={"center"}
                fontSize={"x-small"}
                color={"purple.200"}
              >
                {new Date(
                  item?.release_date || item?.first_air_date
                ).getFullYear() || "N/A"}
              </Text>
              <Flex
                alignItems={"center"}
                justifyContent={"center"}
                gap={"2"}
                mt={"4"}
              >
                <StarIcon fontSize={"small"} />
                <Text>{item?.vote_average?.toFixed(1)}</Text>
              </Flex>
            </Box>
          </Box>
        </Link>
      )}
    </Box>
  );
};

export default CardComponent;
