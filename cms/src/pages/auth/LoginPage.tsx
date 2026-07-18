import { NavLink } from "react-router";
import { LabelComponent } from "../../components/form/LabelComponent";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordRegex } from "../../config/constants/regex";


export interface ICredentials {
  email: string;
  password: string;
}


const CredentialDTO= Yup.object({
  email:Yup.string().email().required(),
  password:Yup.string().matches(passwordRegex).required("Password is mandatory")
})


const LoginPage = () => {
  document.title = "Login Page";

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver:yupResolver(CredentialDTO)
  });

  const submitEvent = (data: ICredentials) => {
    console.log(data);
  };

  console.log(register("email"));
  return (
    <>
      <h2 className="flex flex-col text-start underline font-bold text-4xl underline-offset-2">
        Login Page
      </h2>
      <div className="w-full mt-3 ">
        <form action="" onSubmit={handleSubmit(submitEvent)} className="">
          <div className="flex gap-2 flex-col  w-full ">
            <LabelComponent
              htmlFor="username"
              value="username(email):"
              className="w-full"
            />

            <Controller
              control={control}
              name="email"
              rules={{required:true}}//used for internal validation
              render={({field}) => (
                <>
                  <input
                    type="email"
                    className="  rounded p-2 w-full dark:border-gray-50 outline-none dark:bg-gray-300"
                    {...field}
                  />

                 
                    <span className="text-sm text-red-900 italic text-start">
                     {errors?.email?.message}
                    </span>
                 
                </>
              )}
            />

            {/* <input
              type="email"
              {...register("email", { required: true })}
              className="  rounded p-2 w-full dark:border-gray-50 outline-none dark:bg-gray-300"
            />
            {errors?.email ? (
              <span className="text-sm text-red-900 italic text-start">
                Email is required
              </span>
            ) : (
              <></>
            )} */}
          </div>

          <div className="flex gap-2 flex-col  w-full ">
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

            <Controller
              control={control}
              name="password"
              rules={{required:true}}
              render={({field}) => (
                <>
                  <input
                    type="password"
                    className="  rounded p-2 w-full dark:border-gray-50 outline-none dark:bg-gray-300"
                    {...field}
                  />

                  <span className="text-sm text-red-900 italic text-start">
                     {errors?.password?.message}
                    </span>
                </>
              )}
            />

            {/* <input
              type="password"
              {...register("password", { required: true })}
              className="  rounded p-2 w-full dark:border-gray-50 outline-none dark:bg-gray-300"
            /> */}

            {/* {errors?.password ? (
              <span className="text-sm text-red-900 text-start italic">
                Password is required
              </span>
            ) : (
              <></>
            )} */}
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
