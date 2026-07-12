import { LabelComponent } from "../components/form/LabelComponent";

const HomePage = () => {
  return (
    <>
      <div className="bg-black w-full h-screen items-center justify-center flex ">
        <div className="w-2xl dark:bg-gray-500 rounded-xl p-10">
          <h2 className="flex flex-col text-start underline font-bold text-4xl underline-offset-2">
            Login
          </h2>
          <div className="w-full mt-3 ">
            <form action="" className="">
             
             
              <div className="flex gap-2 flex-col  w-full items-center">
             
             <LabelComponent htmlFor="username" value="username(email):"
             className="w-full"/>
             
                <input
                  type="email"
                  className="  rounded p-2 w-full dark:border-gray-50 outline-none dark:bg-gray-300"
                />
              </div>

              <div className="flex gap-2 flex-col  w-full items-center">
                <div className="flex items-center justify-between w-full mt-3 ">

                  
                   <LabelComponent htmlFor="password" value="Password:"
             className="flex-1"/>



                <a href="" className="text-black underline hover:text-gray-700">Forget Password?</a>
                </div>

                <input
                  type="password"
                  className="  rounded p-2 w-full dark:border-gray-50 outline-none dark:bg-gray-300"
                />
              </div>

              <div className="flex gap-10 mt-3 text-gray-400 font-medium ">
<button className="bg-green-950 w-1/2 p-2 rounded-xl cursor-pointer hover:scale-95 transition duration-400">login </button>
<button className="bg-red-900 w-1/2 p-2 rounded-xl cursor-pointer hover:scale-95 transition duration-400">Cancel </button>

              </div>
            </form>

            <div className="w-full flex items-center justify-center mt-2 text-gray-700 gap-1">Don't have an account?
              <a href="" className=" text-gray-700 hover:underline hover:text-gray-400 font-medium">Register here</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

{
  /*
   */
}
