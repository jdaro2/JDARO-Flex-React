import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Select,
  Skeleton,
} from "@chakra-ui/react";
import { fetchTrending, fetchCurrentlyInTheatres } from "../services/api";
import CardComponent from "../components/CardComponent";
import ImageSlider from "../components/ImageSlider";

const Home = () => {
  const [data, setData] = useState([]);
  const [inTheatres, setInTheatres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeWindow, setTimeWindow] = useState("day");

  useEffect(() => {
    setLoading(true);
    fetchTrending(timeWindow)
      .then((res) => {
        // console.log(res, "res");
        setData(res);
      })
      .catch((err) => {
        console.log(err, "err");
      })
      .finally(() => {
        setLoading(false);
      });

    fetchCurrentlyInTheatres()
      .then((res) => {
        // console.log(res?.results, "in theatres");
        setInTheatres(res?.results);
      })
      .catch((err) => {
        console.log(err, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [timeWindow]);

  // console.log(data, "data");
  // console.log(inTheatres, "In theatres");

  return (
    <Container maxW={"container.xl"}>
      <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
        Watch now in theatres!
      </Heading>
      <Box w="100%" p={4} color="white" height="">
        <ImageSlider slides={inTheatres} />
      </Box>
      <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Trending Movies & TV Shows
        </Heading>

        {/* Desktop */}
        <Flex
          alignItems={"center"}
          gap={"2"}
          border={"1px solid teal"}
          borderRadius={"20px"}
          display={{ base: "none", md: "flex" }}
        >
          <Box
            as="button"
            px="3"
            py="1"
            borderRadius={"20px"}
            bg={`${timeWindow === "day" ? "gray.800" : ""}`}
            onClick={() => setTimeWindow("day")}
          >
            Today
          </Box>
          <Box
            as="button"
            px="3"
            py="1"
            borderRadius={"20px"}
            bg={`${timeWindow === "week" ? "gray.800" : ""}`}
            onClick={() => setTimeWindow("week")}
          >
            This Week
          </Box>
        </Flex>
        {/* Mobile */}
        <Select
          w={"150px"}
          onChange={(e) => {
            setTimeWindow(e.target.value);
          }}
          display={{ base: "flex", md: "none" }}
        >
          <option value="day">Today</option>
          {/* &vote_count.gte=1000 */}
          <option value="week">This Week</option>
        </Select>
      </Flex>
      {/* {loading && <div>Loading...</div>} */}
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={"4"}
        mb="10"
      >
        {data &&
          data?.map((item, i) =>
            loading ? (
              <Skeleton height={"500px"} key={i} />
            ) : (
              <CardComponent
                key={item?.id}
                item={item}
                type={item?.media_type}
              />
            )
          )}
      </Grid>
    </Container>
  );
};

export default Home;
