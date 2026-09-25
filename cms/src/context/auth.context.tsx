import { createContext } from "react";
import type { ICredentials } from "../pages/auth/Auth.contract";

export interface IUserProfile {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  image: {
    id: string;
    optimizedUrl: string;
    originalUrl: string;
  };
}

const AuthContext = createContext({
  loggedInUser: {} as IUserProfile,
  login: async (credentials: ICredentials): Promise<void> => {},
  getLoggedInUser: async (): Promise<IUserProfile | void> => {},
  logout: async (): Promise<void> => {},
});

export default AuthContext;
