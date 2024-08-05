import { db } from "./firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { useToast } from "@chakra-ui/react";

// Webhook for various firestore functions
export const useFirestore = () => {
  const toast = useToast();
  // Function to add movie/tv show to watchlist
  const addDocument = async (collectionName, data) => {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  };

  const addToWatchlist = async (userId, dataId, data) => {
    try {
      if (await checkIfInWatchlist(userId, dataId)) {
        toast({
          title: "Error!",
          description: "This movie/tv show is already in your watchlist",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return false;
      }
      await setDoc(doc(db, "users", userId, "watchlist", dataId), data);
      toast({
        title: "Success",
        description: "Added to your watchlist",
        colorScheme: "purple",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.log(error, "Error adding document");
      toast({
        title: "Error!",
        description: "An error occurred",
        status: "error",
        isClosable: true,
      });
    }
  };
  const checkIfInWatchlist = async (userId, dataId) => {
    const docRef = doc(
      db,
      "users",
      userId?.toString(),
      "watchlist",
      dataId?.toString()
    );

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return true;
    } else {
      return false;
    }
  };

  const removeFromWatchlist = async (userId, dataId) => {
    try {
      await deleteDoc(
        doc(db, "users", userId?.toString(), "watchlist", dataId?.toString())
      );
      toast({
        title: "Success!",
        description: "Removed from your watchlist",
        colorScheme: "purple",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error!",
        description: "An error occurred",
        status: "error",
        isClosable: true,
      });
      console.log(error, "Error while deleting doc");
    }
  };

  return {
    addDocument,
    addToWatchlist,
    checkIfInWatchlist,
    removeFromWatchlist,
  };
};
