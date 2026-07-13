import { Outlet } from "react-router";

const AuthLayoutPage = () => {
  return (
    <>
      <div className="bg-black w-full h-screen items-center justify-center flex ">
        <div className="w-2xl dark:bg-gray-500 rounded-xl p-10">
<Outlet/>

        </div>
      </div>
    </>
  );
};
export default AuthLayoutPage