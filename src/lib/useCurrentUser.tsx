import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export const useCurrentUser = () => {
  const currentUser = useContext(AuthContext);

  return {
    currentUser
  };
};
