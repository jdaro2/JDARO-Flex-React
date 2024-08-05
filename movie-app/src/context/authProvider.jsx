import { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  //   signInWithEmailAndPassword,
} from "firebase/auth";
import PropTypes from "prop-types";
import { useToast } from "@chakra-ui/react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const toast = useToast();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
  }, []);

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    toast({
      title: "You have logged in!",
      description: `Welcome to JDARO!`,
      status: "success",
      isClosable: true,
    });
  }

  async function logout() {
    await signOut(auth);
    toast({
      title: "Logged out",
      description: "You have successfully logged out",
      status: "success",
      isClosable: true,
    });
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
