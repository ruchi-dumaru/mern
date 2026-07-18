import { NavLink } from "react-router";
import { LabelComponent } from "../../components/form/LabelComponent";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { passwordRegex, rolesRegex } from "../../config/constants/regex";
import { yupResolver } from "@hookform/resolvers/yup";
export interface IRegisterData {
  name: null | string;
  email: null | string;
  password: null | string;
  confirmPassword: null | string;
  role: null | string;
  //eslint-disable-next-line
  image: null | any;
}

const RegisterDTO = Yup.object({
  name: Yup.string().min(3).max(50).required(),
  email: Yup.string().email().required(),
  password: Yup.string().matches(passwordRegex).required(),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")]),
  role: Yup.string().matches(rolesRegex).default("customer"),
  //eslint-disable-next-line
  image: Yup.mixed().nullable(),
});
//name,email,password,confirmPassword,role,image

const RegisterPage = () => {
  document.title = "Register Page";
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      image: "",
    },
    //eslint-disable-next-line
    resolver: yupResolver(RegisterDTO) as any,
  });

  const submitEvent = (data: IRegisterData) => {
    console.log(data);
  };

  return (
    <>
      <h2 className="flex flex-col text-start underline font-bold text-4xl underline-offset-2">
        Register Page
      </h2>

      <div className="w-full mt-3 ">
        <form action="" onSubmit={handleSubmit(submitEvent)} className="">
          <div className="flex gap-2 flex-col  w-full ">
            <LabelComponent
              htmlFor="username"
              value="Name:"
              className="w-full"
            />

            <Controller
              control={control}
              name="name"
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <input
                    type="text"
                    className="  rounded p-2 w-full dark:border-gray-50 outline-none dark:bg-gray-300"
                    {...field}
                  />

                  <span className="text-sm text-red-900 italic text-start">
                    {errors?.name?.message}
                  </span>
                </>
              )}
            />
          </div>

          <div className="flex gap-2 flex-col  w-full ">
            <LabelComponent
              htmlFor="username"
              value="Email:"
              className="w-full"
            />

            <Controller
              control={control}
              name="email"
              rules={{ required: true }}
              render={({ field }) => (
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
              rules={{ required: true }}
              render={({ field }) => (
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
          </div>

          <div className="flex gap-2 flex-col  w-full ">
            <div className="flex items-center justify-between w-full mt-3 ">
              <LabelComponent
                htmlFor="password"
                value="Confirm Password:"
                className="flex-1"
              />
            </div>

            <Controller
              control={control}
              name="confirmPassword"
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <input
                    type="password"
                    className="  rounded p-2 w-full dark:border-gray-50 outline-none dark:bg-gray-300"
                    {...field}
                  />

                  <span className="text-sm text-red-900 italic text-start">
                    {errors?.confirmPassword?.message}
                  </span>
                </>
              )}
            />
          </div>

          <div className="flex gap-2 flex-col  w-full ">
            <div className="flex items-center justify-between w-full mt-3 ">
              <LabelComponent htmlFor="role" value="Role:" className="flex-1" />
            </div>

            <Controller
              control={control}
              name="role"
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <input
                    type="radio"
                    className="  rounded p-2 w-full dark:border-gray-50 outline-none dark:bg-gray-300"
                    {...field}
                  />
                </>
              )}
            />
          </div>

          <div className="flex gap-2 flex-col  w-full ">
            <LabelComponent htmlFor="image" value="Image:" className="w-full" />

            <Controller
              control={control}
              name="image"
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <input
                    type="file"
                    className="  rounded p-2 w-full dark:border-gray-50 outline-none dark:bg-gray-300"
                    {...field}
                  />

                  <span className="text-sm text-red-900 italic text-start">
                    {errors?.image?.message}
                  </span>
                </>
              )}
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

        <div className="w-full mt-3 ">
          <div className="w-full flex items-center justify-center mt-2 text-gray-700 gap-1">
            Already have an account?
            <NavLink
              to="/"
              className=" text-gray-700 hover:underline hover:text-gray-400 font-medium"
            >
              Login Here
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
