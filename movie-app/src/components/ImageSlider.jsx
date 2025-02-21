/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { imagePathOriginal } from "../services/api";
import { Link } from "react-router-dom";
import { handleScrollToTop } from "../utils/helpers";
import { StarIcon } from "@chakra-ui/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = ({ slides }) => {
  // console.log(slides, "slides");
  const settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Box
      position={"relative"}
      maxW={"100%"}
      height={"auto"}
      className="slider-container"
    >
      <Slider {...settings}>
        {slides.map((slide) => {
          return (
            <Box>
              {/* Mobile */}

              <Flex display={{ base: "none", md: "flex" }}>
                <Link to={`/movie/${slide?.id}`} onClick={handleScrollToTop}>
                  <Image
                    src={`${imagePathOriginal}/${slide?.backdrop_path}`}
                    alt={slide?.title || slide?.name}
                    height={"auto"}
                    width="100%"
                  />

                  <Text textAlign={"center"} fontSize={"xl"}>
                    {slide?.title || slide?.name}
                  </Text>
                  <Text
                    textAlign={"center"}
                    fontSize={"medium"}
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
                    <StarIcon fontSize={"md"} />
                    <Text fontSize={"large"}>
                      {slide?.vote_average?.toFixed(1)}
                    </Text>
                  </Flex>
                </Link>
              </Flex>
              {/* Mobile */}
              <Flex display={{ base: "flex", md: "none" }}>
                <Link to={`/movie/${slide?.id}`} onClick={handleScrollToTop}>
                  <Image
                    src={`${imagePathOriginal}/${slide?.poster_path}`}
                    alt={slide?.title || slide?.name}
                    height={"auto"}
                    width="800px"
                  />

                  <Text textAlign={"center"} fontSize={"xl"}>
                    {slide?.title || slide?.name}
                  </Text>
                  <Text
                    textAlign={"center"}
                    color={"purple.200"}
                    fontSize={"s"}
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
                    <StarIcon fontSize={"md"} />
                    <Text fontSize={"md"}>
                      {slide?.vote_average?.toFixed(1)}
                    </Text>
                  </Flex>
                </Link>
              </Flex>
            </Box>
          );
        })}
      </Slider>
    </Box>
  );
};

export default ImageSlider;
