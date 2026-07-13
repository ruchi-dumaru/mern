import { createBrowserRouter } from "react-router";
import { AuthRouter } from "../pages/auth/AuthRouter";
import { RouterProvider } from "react-router/dom";


// import LoginPage from "../pages/auth/LoginPage";
// import RegisterPage from "../pages/auth/RegisterPage";
// import ForgetPasswordPage from "../pages/auth/ForgetPasswordPage";
// import ProductListPage from "../pages/product/ProductListPage";


const routerConfig = createBrowserRouter([
  // { path: "/", Component: LoginPage },
  // { path: "/register", Component: RegisterPage },
  // { path: "/forget", element: <ForgetPasswordPage /> },
  // {path:"/productlist",Component:ProductListPage}

  ...AuthRouter
]);
const RouterConfig = () => {
  return (
    <>
      <RouterProvider router={routerConfig} />
    </>
  );
};

export default RouterConfig;
