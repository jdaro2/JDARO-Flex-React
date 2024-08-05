import { SearchIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Navbar = () => {
  const { user, signInWithGoogle, logout } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      console.log("success");
    } catch (error) {
      console.log(error, "error");
    }
  };

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
            {user && (
              <Menu>
                <MenuButton>
                  <Avatar
                    bg={"purple.500"}
                    color={"white"}
                    size={"sm"}
                    name={user?.email}
                    src={user?.photoURL}
                  />
                </MenuButton>
                <MenuList>
                  <Link to="/watchlist">
                    <MenuItem>Watch List</MenuItem>
                  </Link>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            )}
            {!user && <Link onClick={handleGoogleLogin}>Log In</Link>}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
