import { SearchIcon } from "@chakra-ui/icons";
import { Box, Container, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box py="4" mb="2">
      <Container maxW={"container.xl"}>
        <Flex justifyContent={"space-between"}>
          <Link to="/">
            <Box
              fontSize={"2xl"}
              fontWeight={"bold"}
              color={"purple.500"}
              letterSpacing={"widest"}
              fontFamily={"mono"}
            >
              JDARO Flex
            </Box>
          </Link>

          {/* Desktop */}
          <Flex gap="4" alignItems={"center"}>
            <Link to="/">Home</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/shows">Television</Link>
            <Link to="/search">
              <SearchIcon />
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
