import { useState, type ReactNode } from "react";
import AuthContext, { type IUserProfile } from "./../auth.context";
import type { ICredentials } from "../../pages/auth/Auth.contract";
import { getRequest, postRequest } from "../../config/axios.config";
import { toast } from "sonner";
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
      return response.data
    } catch (exception) {
      console.log("Auth provide:", exception);
      //todo
      setLoggedInuser({} as IUserProfile)
      localStorage.removeItem("token")
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
      const userProfile=await getLoggedInuser() as IUserProfile;

      toast.success("Welcome to" + loggedInuser.role + "Panel!");

      // navigate("/"+loggedInuser.role)
window.location.href="/"+userProfile.role

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
