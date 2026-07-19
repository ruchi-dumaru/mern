import { createBrowserRouter, RouterProvider } from "react-router";
import { AuthRouter } from "../pages/auth/AuthRouter";
import ProductListPage from "../pages/product/ProductListPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminLayoutPage from "../pages/layouts/AdminLayoutPage";
import BannerListPage from "../pages/admin/banner/BannerListPage";

const routerConfig = createBrowserRouter([
  ...AuthRouter,
  { path: "/productlist", element: <ProductListPage /> },
  {
    path: "/admin",
    element: <AdminLayoutPage />,
    children: [
      { index: true, element: <AdminDashboardPage /> },
      {
        path: "banners",
        Component: BannerListPage,
      },
    ],
  },
]);

const RouterConfig = () => {
  return <RouterProvider router={routerConfig} />;
};

export default RouterConfig;
