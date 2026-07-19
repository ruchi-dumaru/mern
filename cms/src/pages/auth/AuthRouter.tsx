import LoginPage from "./LoginPage";
import ForgetPasswordPage from "./ForgetPasswordPage";
import RegisterPage from "./RegisterPage";
import AuthLayoutPage from "../layouts/AuthLayoutPage";

export const AuthRouter = [
  {
    path: "/",
    element: <AuthLayoutPage />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "forget", element: <ForgetPasswordPage /> },
    ],
  },
];
