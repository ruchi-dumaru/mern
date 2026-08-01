import { useState, type ReactNode } from "react";
import AuthContext, { type IUserProfile } from "./../auth.context";
import type { ICredentials } from "../../pages/auth/Auth.contract";
import { getRequest, postRequest } from "../../config/axios.config";
import { toast } from "sonner";
// import { useNavigate } from "react-router";

const resolveUserProfile = (response: unknown): IUserProfile | null => {
  if (response && typeof response === "object") {
    if (
      "data" in response &&
      response.data &&
      typeof response.data === "object"
    ) {
      return response.data as IUserProfile;
    }

    if (
      "user" in response &&
      response.user &&
      typeof response.user === "object"
    ) {
      return response.user as IUserProfile;
    }

    return response as IUserProfile;
  }

  return null;
};

const resolveToken = (response: unknown): string | null => {
  if (typeof response === "string") {
    return response;
  }

  if (!response || typeof response !== "object") {
    return null;
  }

  if ("token" in response && typeof response.token === "string") {
    return response.token;
  }

  if ("accessToken" in response && typeof response.accessToken === "string") {
    return response.accessToken;
  }

  if ("data" in response && typeof response.data === "string") {
    return response.data;
  }

  return null;
};

const AuthProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
  const [loggedInuser, setLoggedInuser] = useState<IUserProfile>(
    {} as IUserProfile,
  );

  // const navigate=useNavigate()
  const getLoggedInuser = async (): Promise<IUserProfile | void> => {
    //loggedIn User Profile
    try {
      const response = await getRequest("auth/me");
      const userProfile = resolveUserProfile(response);

      if (!userProfile) {
        throw new Error("Unable to resolve logged in user profile");
      }

      setLoggedInuser(userProfile);
      return userProfile;
    } catch (exception) {
      console.log("Auth provide:", exception);
      //todo
      setLoggedInuser({} as IUserProfile);
      localStorage.removeItem("token");
    }
  };
  const login = async (credentials: ICredentials): Promise<void> => {
    //login api call
    try {
      const response = await postRequest("auth/login", credentials, {
        file: false,
        auth: false,
      });

      const token = resolveToken(response);
      if (token) {
        localStorage.setItem("token", token);
      }

      const userProfile = (await getLoggedInuser()) as IUserProfile;

      if (!userProfile?.role) {
        throw new Error("Logged in user role was not returned by the server");
      }

      toast.success(`Welcome to ${userProfile.role} Panel!`);

      // navigate("/"+loggedInuser.role)
      window.location.href = "/" + userProfile.role;

      //loggedin user Profile fetch
      //eslint-disable-next-line
    } catch (exception: any) {
      console.error(exception);
    }
  };
  return (
    <>
      <AuthContext.Provider
        value={{
          loggedInUser: loggedInuser,
          login: login,
          getLoggedInUser: getLoggedInuser,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
