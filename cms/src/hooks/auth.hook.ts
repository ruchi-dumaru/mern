import { useContext } from "react";
import AuthContext from "../context/auth.context";

const useAuth = () => {
  const { loggedInUser, login, getLoggedInUser, logout } =
    useContext(AuthContext);
  return {
    loggedInUser,
    login,
    getLoggedInUser,
    logout,
  };
};

export default useAuth;
