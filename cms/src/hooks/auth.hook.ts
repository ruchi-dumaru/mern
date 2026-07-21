import { useContext } from "react";
import AuthContext from "../context/auth.context";

const useAuth = () => {
  const { loggedInUser,login,getLoggedInUser } = useContext(AuthContext);
  return {
    loggedInUser,
    login,
    getLoggedInUser
  };
};

export default useAuth;
