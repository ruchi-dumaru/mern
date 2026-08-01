import { createBrowserRouter, RouterProvider } from "react-router";
import { AuthRouter } from "../pages/auth/AuthRouter";
import ProductListPage from "../pages/product/ProductListPage";
import { Toaster } from "sonner";
import useAuth from "../hooks/auth.hook";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../components/ui/spinner";
import { AdminRouter } from "../pages/admin/AdminRouter";
import ChatPage from "../pages/chat/ChatPage";
import AuthUserLayoutPage from './../pages/layouts/AuthUserLayoutPage';

const routerConfig = createBrowserRouter([
  ...AuthRouter,
  { path: "/productlist", element: <ProductListPage /> },
  ...AdminRouter,
  {path:"/customer",element:<AuthUserLayoutPage role="customer"/>,children:[
    {index:true,Component:ChatPage}
  ]},
  {path:"/seller",element:<AuthUserLayoutPage  role="seller"/>,children:[
    {index:true,Component:ChatPage}
  ]},

]);

const RouterConfig = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { getLoggedInUser } = useAuth();

  const loadLoggedInUser = async () => {
    try {
      await getLoggedInUser();
    } catch (exception) {
      console.error(exception);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLoggedInUser();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex gap-5 h-screen w-full items-center justify-center">
          <LoadingSpinner />
          <p className="text-gray-900 ">Api SERVER is under progress</p>

        </div>
      ) : (
        <>
          <Toaster theme="system" />
          <RouterProvider router={routerConfig} />
        </>
      )}
    </>
  );
};

export default RouterConfig;
