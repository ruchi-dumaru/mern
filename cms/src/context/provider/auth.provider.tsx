import { useState, type ReactNode } from "react";
import AuthContext, { type IUserProfile } from "./../auth.context";
import type { ICredentials } from "../../pages/auth/Auth.contract";
import { getRequest, postRequest } from "../../config/axios.config";
import { toast } from "sonner";
import { notifyError } from "../../utilities/helpers";
// import { useNavigate } from "react-router";

const AuthProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
  const [loggedInuser, setLoggedInuser] = useState<IUserProfile>(
    {} as IUserProfile,
  );

  // const navigate=useNavigate()
  const getLoggedInuser = async (): Promise<IUserProfile | void> => {
    //loggedIn User Profile
    try {
      const response = await getRequest("auth/me");
      setLoggedInuser(response.data);
      return response.data;
    } catch (exception) {
      setLoggedInuser({} as IUserProfile);
      localStorage.removeItem("token");
      return undefined;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await getRequest("auth/logout");
    } finally {
      window.dispatchEvent(new Event("chat:logout"));
      localStorage.removeItem("token");
      setLoggedInuser({} as IUserProfile);
    }
  };
  const login = async (credentials: ICredentials): Promise<void> => {
    //login api call
    try {
      const response = await postRequest("auth/login", credentials, {
        file: false,
        auth: false,
      });

      localStorage.setItem("token", response.data);
      const userProfile = (await getLoggedInuser()) as IUserProfile;
      if (!userProfile || userProfile.role !== "admin") {
        throw new Error("Only admin users can access this panel");
      }
      toast.success("Welcome to the Admin Panel");

      //loggedin user Profile fetch
      //eslint-disable-next-line
    } catch (exception) {
      notifyError({
        title: "Login failed",
        description:
          (exception as { message?: string })?.message ||
          "Please check your credentials.",
      });
    }
  };
  return (
    <>
      <AuthContext.Provider
        value={{
          loggedInUser: loggedInuser,
          login: login,
          getLoggedInUser: getLoggedInuser,
          logout: logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
