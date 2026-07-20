import { Outlet } from "react-router";

const AuthLayoutPage = () => {
  return (
    <>
      <div className="bg-black w-full h-screen items-center justify-center flex ">
      <div className="w-full max-w-5xl rounded-2xl bg-gray-500 p-10 shadow-2xl">
<Outlet/>
        </div>
      </div>
    </>
  );
};
export default AuthLayoutPage  