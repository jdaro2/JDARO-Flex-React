import { useEffect, useState } from "react";
import { Box, Container, Flex, Grid, Heading } from "@chakra-ui/react";
import { fetchTrending } from "../services/api";
import CardComponent from "../components/CardComponent";

const Home = () => {
  const [data, setData] = useState([]);
  const [timeWindow, setTimeWindow] = useState("day");

  useEffect(() => {
    fetchTrending(timeWindow)
      .then((res) => {
        // console.log(res, "res");
        setData(res);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, [timeWindow]);

  console.log(data, "data");

  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Trending
        </Heading>
        <Flex
          alignItems={"center"}
          gap={"2"}
          border={"1px solid teal"}
          borderRadius={"20px"}
        >
          <Box
            as="button"
            px="3"
            py="1"
            borderRadius={"20px"}
            bg={`${timeWindow === "day" ? "gray" : ""}`}
            onClick={() => setTimeWindow("day")}
          >
            Today
          </Box>
          <Box
            as="button"
            px="3"
            py="1"
            borderRadius={"20px"}
            bg={`${timeWindow === "week" ? "gray" : ""}`}
            onClick={() => setTimeWindow("week")}
          >
            This Week
          </Box>
        </Flex>
      </Flex>

      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={"4"}
      >
        {data &&
          data?.map((item) => <CardComponent key={item?.id} item={item} />)}
      </Grid>
    </Container>
  );
};

export default Home;
