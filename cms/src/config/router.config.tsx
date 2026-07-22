import { createBrowserRouter, RouterProvider } from "react-router";
import { AuthRouter } from "../pages/auth/AuthRouter";
import ProductListPage from "../pages/product/ProductListPage";
import { Toaster } from "sonner";
import useAuth from "../hooks/auth.hook";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../components/ui/spinner";
import { AdminRouter } from "../pages/admin/AdminRouter";

const routerConfig = createBrowserRouter([
  ...AuthRouter,
  { path: "/productlist", element: <ProductListPage /> },
  ...AdminRouter
]);

const RouterConfig = () => {
  const { loading, setLoading } = useState<boolean>(true);
  const {getLoggedInUser}=useAuth()


  const loadLoggedInUser=async ()=>{
    try{
await getLoggedInUser()
    }catch(exception){
      console.error(exception)
    }
    finally{
      setLoading(false)
    }
  }
  useEffect(() => {
loadLoggedInUser()
  }, []);


  // const {loggedInUser}=useAuth()
  // console.log({loggedInUser})
  return (
    <>
      {loading ? (
      <div className="flex h-screen w-full items-center justify-center"> <LoadingSpinner /></div>

      ) : (
        <>
          <Toaster theme="system" />
          <RouterProvider router={routerConfig} />;
        </>
      )}
    </>
  );
};

export default RouterConfig;
