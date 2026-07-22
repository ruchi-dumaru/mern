import { LabelComponent } from "../../components/form/LabelComponent";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {  CredentialDTO } from "./Auth.contract";
import {
  EmailInputComponent,
  PasswordInputComponent,
} from "../../components/form/InputComponent";
import { RegisterLinkComponent } from "../../components/form/LinkComponent";
import { ForgetPasswordLinkComponent } from "./../../components/form/LinkComponent";

import useAuth from "../../hooks/auth.hook";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { notifySuccess } from "../../utilities/helpers";

// import Cookies from "js-cookie"

const LoginPage = () => {
  document.title = "Login Page";
  const navigate=useNavigate()

  const { login ,loggedInUser} = useAuth();
  // const authData=useContext(AuthContext)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(CredentialDTO),
  });


  useEffect(()=>{
    if(loggedInUser){
      notifySuccess({title:"You are already logged in..."})
 navigate("/"+loggedInUser.role)
    }
  },[loggedInUser])
  // console.log(loggedInUser)

  // const submitEvent = async (data: ICredentials) => {
  //   try {
  //     const response = await postRequest("auth/login", data, {
  //       file: false,
  //       auth: false,
  //     });

  //     localStorage.setItem("token", response.data);

  //     //eslint-disable-next-line
  //   } catch (exception: any) {
  //     console.error(exception);
  //   }
  // };

  // console.log(register("email"));
  return (
    <>
      <h2 className="flex flex-col text-start underline font-bold text-4xl underline-offset-2">
        Login Page
      </h2>
      <div className="w-full mt-3 ">
        <form action="" onSubmit={handleSubmit(login)} className="">
          <div className="flex gap-2 flex-col  w-full ">
            <LabelComponent
              htmlFor="username"
              value="username(email):"
              className="w-full"
            />

            <EmailInputComponent
              control={control}
              name="email"
              errorMessage={errors?.email?.message}
            />
            {/* <Controller
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
            /> */}

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

              <ForgetPasswordLinkComponent
                to="/forget"
                text="Forget Password?"
              />
            </div>

            <PasswordInputComponent
              control={control}
              name="password"
              errorMessage={errors?.password?.message}
            />
          </div>

          <div className="flex gap-10 mt-3 text-gray-400 font-medium ">
            <button
              type="submit"
              className="bg-green-950 w-1/2 p-2 rounded-xl cursor-pointer hover:scale-95 transition duration-400"
            >
              login{" "}
            </button>
            <button
              type="reset"
              className="bg-red-900 w-1/2 p-2 rounded-xl cursor-pointer hover:scale-95 transition duration-400"
            >
              Cancel{" "}
            </button>
          </div>
        </form>

        <div className="w-full flex items-center justify-center mt-2 text-gray-700 gap-1">
          Don't have an account?
          <RegisterLinkComponent to="/register" text="Register here" />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
