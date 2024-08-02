import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { fetchDetails, imagePath, imagePathOriginal } from "../services/api";

const DetailsPage = () => {
  const router = useParams();
  const { type, id } = router;

  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetails(type, id)
      .then((res) => {
        console.log(res, "res");
        setDetails(res);
      })
      .catch((err) => {
        console.log(err, "err");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [type, id]);

  if (loading) {
    return (
      <Flex justify={"center"}>
        <Spinner size={"xl"} color="purple.500" />
      </Flex>
    );
  }

  const title = details?.title || details?.name;

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
              <Heading fontSize={"3xl"}>{title}</Heading>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default DetailsPage;
