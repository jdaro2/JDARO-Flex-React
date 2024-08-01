import { useEffect } from "react";
import { Container, Heading } from "@chakra-ui/react";
import { fetchTrending } from "../services/api";

const Home = () => {
  useEffect(() => {
    fetchTrending("day")
      .then((res) => {
        console.log(res, "res");
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, []);

  return (
    <Container maxW={"container.xl"}>
      <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
        Trending
      </Heading>
    </Container>
  );
};

export default Home;
