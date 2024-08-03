import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Flex,
  Heading,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import {
  fetchCredits,
  fetchDetails,
  fetchVideos,
  imagePath,
  imagePathOriginal,
} from "../services/api";
import {
  CalendarIcon,
  CheckCircleIcon,
  SmallAddIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import {
  minutesToHours,
  ratingToPercentage,
  resolveRatingColor,
} from "../utils/helpers";
import VideoComponent from "../components/VideoComponent";

const DetailsPage = () => {
  const router = useParams();
  const { type, id } = router;
  const actorUrl = "https://www.themoviedb.org/person";

  const [details, setDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     fetchDetails(type, id)
  //       .then((res) => {
  //         console.log(res, "res");
  //         setDetails(res);
  //       })
  //       .catch((err) => {
  //         console.log(err, "err");
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   }, [type, id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailsData, creditsData, videosData] = await Promise.all([
          fetchDetails(type, id),
          fetchCredits(type, id),
          fetchVideos(type, id),
        ]);
        // Set details
        setDetails(detailsData);

        // Set cast
        setCast(creditsData?.cast.slice(0, 10));

        // Set video/s
        const video = videosData?.results?.find(
          (video) => video?.type === "Trailer"
        );
        setVideo(video);
        const videos = videosData?.results
          ?.filter((video) => video?.type !== "Trailer")
          ?.slice(0, 10);
        setVideos(videos);
      } catch (error) {
        console.log(error, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, id]);

  //   console.log(video, "video");
  //   console.log(videos, "videos");
  console.log(cast, "cast");
  //   console.log(details, "details");

  if (loading) {
    return (
      <Flex justify={"center"}>
        <Spinner size={"xl"} color="purple.500" />
      </Flex>
    );
  }

  const title = details?.title || details?.name;
  const releaseDate =
    type === "tv" ? details?.first_air_date : details?.release_date;

  return (
    <Box>
      <Box
        background={`linear-gradient(rgba(0,0,0,.88), rgba(0,0,0,.88)), url(${imagePathOriginal}/${details?.backdrop_path})`}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        width={"100%"}
        height={{ base: "auto", md: "600px" }}
        py={"2"}
        display={"flex"}
        alignItems={"center"}
      >
        <Container maxW={"container.xl"}>
          <Flex
            alignItems={"center"}
            gap="10"
            flexDirection={{ base: "column", md: "row" }}
          >
            <Image
              height={"450px"}
              borderRadius={"sm"}
              src={`${imagePath}/${details?.poster_path}`}
            />
            <Box>
              <Heading fontSize={"3xl"}>
                {title}{" "}
                <Text as={"span"} fontWeight={"normal"} color="grey.400">
                  {new Date(releaseDate).getFullYear()}
                </Text>
              </Heading>

              <Flex alignItems={"center"} gap="4" nt={1} mb={5}>
                <Flex alignItems={"center"}>
                  <CalendarIcon mr={2} color={"gray.400"} />
                  <Text fontSize={"small"}>
                    {new Date(releaseDate).toLocaleDateString("en-US")} {"US"}
                  </Text>
                </Flex>
                {type === "movie" ? (
                  <>
                    <Box>*</Box>
                    <Flex alignItems={"center"}>
                      <TimeIcon mr="2" color={"gray.400"} />
                      <Text fontSize={"sm"}>
                        {minutesToHours(details?.runtime)}
                      </Text>
                    </Flex>
                  </>
                ) : (
                  <>
                    <Box>*</Box>
                    <Flex alignItems={"center"}>
                      <TimeIcon mr="2" color={"gray.400"} />
                      <Text fontSize={"sm"}>
                        {details?.number_of_seasons} Season/s {" | "}
                        {details?.number_of_episodes} episode/s
                      </Text>
                    </Flex>
                  </>
                )}
              </Flex>

              <Flex alignItems={"center"} gap={"4"}>
                <CircularProgress
                  value={ratingToPercentage(details?.vote_average)}
                  bg={"gray.800"}
                  borderRadius={"full"}
                  p={"0.5"}
                  size={"70px"}
                  color={resolveRatingColor(details?.vote_average)}
                  thickness={"6px"}
                >
                  <CircularProgressLabel fontSize={"lg"}>
                    {ratingToPercentage(details?.vote_average)}{" "}
                    <Box as="span" fontSize={"10px"}>
                      %
                    </Box>
                  </CircularProgressLabel>
                </CircularProgress>
                <Text display={{ base: "none", md: "initial" }}>
                  User Score
                </Text>
                <Button
                  display={"none"}
                  leftIcon={<CheckCircleIcon />}
                  colorScheme="purple"
                  variant={"outline"}
                  onClick={() => console.log("click")}
                >
                  In watchlist
                </Button>
                <Button
                  leftIcon={<SmallAddIcon />}
                  variant={"outline"}
                  onClick={() => console.log("click")}
                >
                  Add to watchlist
                </Button>
              </Flex>
              <Text
                color={"gray.400"}
                fontSize={"sm"}
                fontStyle={"italic"}
                my="5"
              >
                {details?.tagline}
              </Text>
              <Heading fontSize={"xl"} mb="3">
                Overview
              </Heading>
              <Text fontSize={"md"} mb={"3"}>
                {details?.overview}
              </Text>
              <Flex mt="6" gap="2">
                {details?.genres?.map((genre) => (
                  <Badge key={genre?.id} p="1">
                    {genre?.name}
                  </Badge>
                ))}
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>
      <Container maxW={"container.xl"} pb="10">
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"} mt="10">
          Cast
        </Heading>
        <Flex mt="5" mb="10" overflowX={"scroll"} gap="5">
          {cast?.length === 0 && <Text>No cast found</Text>}
          {cast &&
            cast?.map((item) => (
              <Box
                key={item?.id}
                minW={"150px"}
                _hover={{
                  transform: { base: "scale(1)", md: "scale(1.08)" },
                  transition: "transform 0.2s ease-in-out",
                  zIndex: "10",
                  "& .overlay": {
                    opacity: 1,
                  },
                }}
              >
                <Image
                  src={`${imagePath}/${item?.profile_path}`}
                  w={"100%"}
                  height={"240px"}
                  objectFit={"cover"}
                  borderRadius={"sm"}
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
                  <Link target="_blank" to={`${actorUrl}/${item?.id}`}>
                    <Text textAlign={"center"}>{item?.name}</Text>
                    <Text textAlign={"center"} fontSize={"xs"}>
                      {item?.character}
                    </Text>
                  </Link>

                  <Flex
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={"2"}
                    mt={"4"}
                  ></Flex>
                </Box>
              </Box>
            ))}
        </Flex>

        <Heading
          as="h2"
          fontSize={"md"}
          textTransform={"uppercase"}
          mt="10"
          mb="5"
        >
          Videos
        </Heading>
        <Text
          fontSize={"m"}
          mb="5"
          fontWeight={"bold"}
          fontStyle={"oblique"}
          textTransform={"uppercase"}
        >
          Trailer
        </Text>
        <VideoComponent id={video?.key} />
        <Text
          fontSize={"m"}
          mt="5"
          fontWeight={"bold"}
          fontStyle={"oblique"}
          textTransform={"uppercase"}
        >
          Extras
        </Text>
        <Flex mt="5" mb="10" overflowX={"scroll"} gap={"5"}>
          {videos?.length !== 0 ? (
            videos?.map((item) => (
              <Box key={item?.id} minW={"300px"}>
                <VideoComponent id={item?.key} small />
                <Text
                  textAlign={"center"}
                  as={"u"}
                  fontSize={""}
                  fontWeight={"bold"}
                  mt="2"
                  mb="2"
                  noOfLines={"2"}
                >
                  {item?.name}
                </Text>
              </Box>
            ))
          ) : (
            <Text
              textAlign={"center"}
              fontSize={"md"}
              fontWeight={"bold"}
              mt="2"
              mb="10"
              noOfLines={"2"}
              textTransform={"uppercase"}
            >
              No extras to display
            </Text>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default DetailsPage;
