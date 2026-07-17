import { NavLink } from "react-router";
import { LabelComponent } from "../../components/form/LabelComponent";
import { useState, type BaseSyntheticEvent } from "react";

export interface ICredentials{
  email:string,
  password:string
}

const LoginPage = () => {
  document.title="Login Page"

  const [credentials,setCredentials]=useState<ICredentials>({
    email:"",
    password:""
  })


  const handleInputChange=(e:BaseSyntheticEvent)=>{
                const name=e.target.name
                setCredentials({
                  ...credentials,
                  [name]:e.target.value
                })
              }


console.log(credentials);
  return (
    <>
      <h2 className="flex flex-col text-start underline font-bold text-4xl underline-offset-2">
        Login Page
      </h2>
      <div className="w-full mt-3 ">
        <form action="" className="">
          <div className="flex gap-2 flex-col  w-full items-center">
            <LabelComponent
              htmlFor="username"
              value="username(email):"
              className="w-full"
            />

            <input
              type="email"
              name="email"
              onChange={handleInputChange}
              className="  rounded p-2 w-full dark:border-gray-50 outline-none dark:bg-gray-300"
            />
          </div>

          <div className="flex gap-2 flex-col  w-full items-center">
            <div className="flex items-center justify-between w-full mt-3 ">
              <LabelComponent
                htmlFor="password"
                value="Password:"
                className="flex-1"
              />

              <NavLink
                to="/forget"
                className="text-black underline hover:text-gray-700"
              >
                Forget Password?
              </NavLink>
            </div>

            <input
              type="password"
              name="password"
              onChange={handleInputChange}
              className="  rounded p-2 w-full dark:border-gray-50 outline-none dark:bg-gray-300"
            />
          </div>

          <div className="flex gap-10 mt-3 text-gray-400 font-medium ">
            <button className="bg-green-950 w-1/2 p-2 rounded-xl cursor-pointer hover:scale-95 transition duration-400">
              login{" "}
            </button>
            <button className="bg-red-900 w-1/2 p-2 rounded-xl cursor-pointer hover:scale-95 transition duration-400">
              Cancel{" "}
            </button>
          </div>
        </form>

        <div className="w-full flex items-center justify-center mt-2 text-gray-700 gap-1">
          Don't have an account?
          <NavLink
            to="/register"
            className=" text-gray-700 hover:underline hover:text-gray-400 font-medium"
          >
            Register here
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

{
  /*
   */
}
