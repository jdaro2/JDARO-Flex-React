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
  Grid,
  Heading,
  Image,
  Progress,
  Skeleton,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  fetchCredits,
  fetchDetails,
  fetchRecommendations,
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
import CardComponent from "../components/CardComponent";
import { useAuth } from "../context/useAuth";
import { useFirestore } from "../services/firestore";

const DetailsPage = () => {
  const router = useParams();
  const { type, id } = router;
  const actorUrl = "https://www.themoviedb.org/person";

  const { user } = useAuth();
  const { addToWatchlist, checkIfInWatchlist, removeFromWatchlist } =
    useFirestore();
  const toast = useToast();

  const [details, setDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

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
        const [detailsData, creditsData, videosData, recommendationsData] =
          await Promise.all([
            fetchDetails(type, id),
            fetchCredits(type, id),
            fetchVideos(type, id),
            fetchRecommendations(type, id),
          ]);
        // Set details
        setDetails(detailsData);

        // Set cast
        setCast(creditsData?.cast.slice(0, 15));

        // Set video/s
        const video = videosData?.results?.find(
          (video) => video?.type === "Trailer"
        );
        setVideo(video);
        const videos = videosData?.results
          ?.filter((video) => video?.type !== "Trailer")
          ?.slice(0, 10);
        setVideos(videos);

        // Set recommendations
        setRecommendation(recommendationsData?.results.slice(0, 12));
        // console.log(recommendationsData, "recommendations data");
      } catch (error) {
        console.log(error, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, id]);

  //   console.log(video, "video");
  // console.log(videos, "videos");
  // console.log(cast, "cast");
  // console.log(details, "details");
  // console.log(recommendation, "recommendation");

  const handleSaveToWatchlist = async () => {
    if (!user) {
      toast({
        title: "Login to add to watchlist",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    const data = {
      id: details?.id,
      title: details?.title || details?.name,
      type: type,
      poster_path: details?.poster_path,
      release_date: details?.release_date || details?.first_air_date,
      vote_average: details?.vote_average,
      overview: details?.overview,
    };

    // console.log(data, "data");
    const dataId = details?.id?.toString();
    await addToWatchlist(user?.uid, dataId, data);

    const isSetToWatchlist = await checkIfInWatchlist(user?.uid, dataId);
    setIsInWatchlist(isSetToWatchlist);
  };

  useEffect(() => {
    if (!user) {
      setIsInWatchlist(false);
      return;
    }

    checkIfInWatchlist(user?.uid, id).then((data) => {
      setIsInWatchlist(data);
    });
  }, [id, user, checkIfInWatchlist]);

  const handleRemoveFromWatchlist = async () => {
    await removeFromWatchlist(user?.uid, id);
    const isSetToWatchlist = await checkIfInWatchlist(user?.uid, id);
    setIsInWatchlist(isSetToWatchlist);
  };

  if (loading) {
    return (
      <Box>
        <Progress size="xs" isIndeterminate color="purple.500" mb={"20"} />
        <Flex justify={"center"}>
          <Spinner
            size={"xl"}
            color="purple.500"
            thickness="7px"
            speed="0.65s"
          />
        </Flex>
      </Box>
    );
  }

  const title = details?.title || details?.name;
  const releaseDate =
    type === "tv" ? details?.first_air_date : details?.release_date;

  return (
    <Box>
      {/* <Progress size="xs" isAnimated={true} value={10} /> */}
      {/* <Progress size="xs" isAnimated={true} value={100} /> */}

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
        <Progress size="xs" isIndeterminate />

        <Container maxW={"container.xl"}>
          <Flex
            alignItems={"center"}
            gap="10"
            flexDirection={{ base: "column", md: "row" }}
          >
            {details?.poster_path ? (
              <Image
                height={"450px"}
                borderRadius={"sm"}
                src={`${imagePath}/${details?.poster_path}`}
              />
            ) : (
              <Image
                src="https://media.istockphoto.com/id/1472933890/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=Rdn-lecwAj8ciQEccm0Ep2RX50FCuUJOaEM8qQjiLL0="
                alt={details?.title || details?.name}
                w={"300px"}
                height={"400px"}
                objectFit={"cover"}
                borderRadius={"sm"}
              />
            )}

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
                        {details?.number_of_seasons} season/s {" | "}
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
                {isInWatchlist ? (
                  <Button
                    leftIcon={<CheckCircleIcon />}
                    colorScheme="purple"
                    variant={"outline"}
                    onClick={handleRemoveFromWatchlist}
                  >
                    In watchlist
                  </Button>
                ) : (
                  <Button
                    leftIcon={<SmallAddIcon />}
                    variant={"outline"}
                    onClick={handleSaveToWatchlist}
                  >
                    Add to watchlist
                  </Button>
                )}
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
                  <Badge color={"purple.200"} key={genre?.id} p="1">
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
                minW={"175px"}
                _hover={{
                  transform: { base: "scale(1)", md: "scale(1.08)" },
                  transition: "transform 0.2s ease-in-out",
                  zIndex: "10",
                  "& .overlay": {
                    opacity: 1,
                  },
                }}
              >
                <Link target="_blank" to={`${actorUrl}/${item?.id}`}>
                  {item?.profile_path ? (
                    <Image
                      src={`${imagePath}/${item?.profile_path}`}
                      alt={item?.title || item?.name}
                      w={"100%"}
                      height={"250px"}
                      objectFit={"cover"}
                      borderRadius={"sm"}
                    />
                  ) : (
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/7/72/Default-welcomer.png"
                      alt={item?.title || item?.name}
                      w={"100%"}
                      height={"250px"}
                      objectFit={"cover"}
                      borderRadius={"sm"}
                    />
                  )}

                  {/* <Box
                  className="overlay"
                  position={"relative"}
                  p="2"
                  bottom={"0"}
                  left={"0"}
                  w={"100%"}
                  height={"33%"}
                  bg={"rgba(0,0,0,0.9)"}
                  opacity={"0"}
                  transition={"opacity 0.3s ease-in-out"}
                > */}
                  <Text textAlign={"center"}>{item?.name}</Text>

                  <Text
                    textAlign={"center"}
                    fontSize={"xs"}
                    color={"purple.200"}
                  >
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
              // </Box>
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
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"} mt="10">
          Recommendations
        </Heading>
        <Box mt="10">
          <Grid
            templateColumns={{
              base: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={"4"}
          >
            {recommendation?.length > 0 &&
              !loading &&
              recommendation?.map((item, i) =>
                loading ? (
                  <Skeleton height={300} key={i} />
                ) : (
                  <CardComponent
                    key={item?.id}
                    item={item}
                    type={item?.media_type}
                  />
                )
              )}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default DetailsPage;
