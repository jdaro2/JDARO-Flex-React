import { useState, useEffect } from "react";
import { useFirestore } from "../services/firestore";
import { useAuth } from "../context/useAuth";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Progress,
  Spinner,
} from "@chakra-ui/react";
import WatchlistCard from "../components/WatchlistCard";

const Watchlist = () => {
  const { getWatchlist } = useFirestore();
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      getWatchlist(user?.uid)
        .then((data) => {
          setWatchlist(data);
          // console.log(data, "data");
        })
        .catch((err) => {
          console.log(err, "error");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [user?.uid, getWatchlist]);

  if (isLoading) {
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

  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Watchlist
        </Heading>
      </Flex>
      {!isLoading && watchlist?.length === 0 && (
        <Flex justify={"center"} mt="10">
          <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
            No movies/tv shows in watchlist
          </Heading>
        </Flex>
      )}
      {!isLoading && watchlist?.length > 0 && (
        <Grid
          templateColumns={{
            base: "1fr",
          }}
          gap={"4"}
        >
          {watchlist?.map((item) => (
            <WatchlistCard
              key={item?.id}
              item={item}
              type={item?.type}
              setWatchlist={setWatchlist}
            />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Watchlist;

// {!isLoading && watchlist?.length === 0 && (
//     <Flex justify={"center"} mt="10">
//       <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
//         Watchlist is empty
//       </Heading>
//     </Flex>
//   )}
//   {!isLoading && watchlist?.length > 0 && (
//     <Grid
//       templateColumns={{
//         base: "1fr",
//       }}
//       gap={"4"}
//     >
//       {watchlist?.map((item) => (
//         <WatchlistCard
//           key={item?.id}
//           item={item}
//           type={item?.type}
//           setWatchlist={setWatchlist}
//         />
//       ))}
