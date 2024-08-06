import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { imagePathOriginal } from "../services/api";
import { Link } from "react-router-dom";
import { handleScrollToTop } from "../utils/helpers";
import { StarIcon } from "@chakra-ui/icons";

// Credits to: https://codesandbox.io/s/chakra-ui-carousel-wgdp6?file=/src/SlideData.js:0-970 as I built off their framework

// If you want to use your own Selectors look up the Advancaed Story book examples
const ImageSlider = ({ slides }) => {
  console.log(slides, "slides");

  return (
    <Box
      position={"relative"}
      transform={"scale(1)"}
      height={"100%"}
      _hover={{
        transform: { base: "scale(1)", md: "scale(1.02)" },
        transition: "transform 0.2s ease-in-out",
        zIndex: "10",
        "& .overlay": {
          opacity: 1,
        },
      }}
    >
      <Carousel infiniteLoop autoPlay interval={6000}>
        {slides.map((slide) => {
          return (
            <Link to={`/movie/${slide?.id}`} onClick={handleScrollToTop}>
              <Box
                position={"relative"}
                transform={"scale(1)"}
                height={"100%"}
                mb="10"
                _hover={{
                  transform: { base: "scale(1)", md: "scale(1.0)" },
                  transition: "transform 0.2s ease-in-out",
                  zIndex: "10",
                  "& .overlay": {
                    opacity: 1,
                  },
                }}
              >
                <Image
                  src={`${imagePathOriginal}/${slide?.backdrop_path}`}
                  alt={slide?.title || slide?.name}
                  height={"auto"}
                  width="800px"
                />

                <Text textAlign={"center"}>{slide?.title || slide?.name}</Text>
                <Text
                  textAlign={"center"}
                  fontSize={"x-small"}
                  color={"purple.200"}
                >
                  {new Date(
                    slide?.release_date || slide?.first_air_date
                  ).getFullYear() || "N/A"}
                </Text>
                <Flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={"2"}
                  mt={"4"}
                >
                  <StarIcon fontSize={"small"} />
                  <Text>{slide?.vote_average?.toFixed(1)}</Text>
                </Flex>
              </Box>
            </Link>
          );
        })}
      </Carousel>
    </Box>
  );
};

export default ImageSlider;
