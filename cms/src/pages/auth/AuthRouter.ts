import LoginPage from "./LoginPage";
import ForgetPasswordPage from "./ForgetPasswordPage";
import RegisterPage from "./RegisterPage";
import AuthLayoutPage from "../layouts/AuthLayoutPage";

export const AuthRouter = [
  {
    path: "/",
    Component: AuthLayoutPage,
    children: [
      { index:true, Component: LoginPage },
      { path: "/register", Component: RegisterPage },
      { path: "/forget", Component: ForgetPasswordPage },
    ],
  },
];
