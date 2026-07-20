import { useEffect } from "react";
import { LabelComponent } from "../../components/form/LabelComponent";
import { useForm } from "react-hook-form";
import { RegisterDTO, type IRegisterData } from "./Auth.contract";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  EmailInputComponent,
  TextInputComponent,
  PasswordInputComponent,
  MultipleOptionSingleSelectComponent,
  SingleFileInputComponent,
} from "../../components/form/InputComponent";
import { LoginLinkComponent } from "../../components/form/LinkComponent";
import axiosInstance from "../../config/axios.config";

const RegisterPage = () => {
  useEffect(() => {
    document.title = "Register Page";
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
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

  const submitHandle = async (data: IRegisterData) => {
    try {
      const response=await axiosInstance.post("auth/register",data,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      })
      console.log(response)
      //response.data=>API response
    } catch (exception) {
      console.log(exception);
      //exception.resonse.data=>API response
    }
  };


  //   return (
  //     <div className=" min-h-screen flex items-center justify-center p-6 ">
  //       <div className="w-full max-w-4xl">
  //       <h2 className="text-left text-2xl font-bold underline underline-offset-2 sm:text-3xl">
  //         Register Page
  //       </h2>

  //       <div className="mt-1 w-full">
  //         <form
  //           action=""
  //           onSubmit={handleSubmit(submitEvent)}
  //           className="space-y-1"
  //         >
  //           <div className="flex w-full flex-col gap-2">
  //             <LabelComponent
  //               htmlFor="username"
  //               value="Name:"
  //               className="w-full"
  //             />

  //             <TextInputComponent
  //               control={control}
  //               name="name"
  //               errorMessage={errors?.name?.message}
  //             />
  //           </div>

  //           <div className="flex w-full flex-col gap-2">
  //             <LabelComponent htmlFor="email" value="Email:" className="w-full" />

  //             <EmailInputComponent
  //               control={control}
  //               name="email"
  //               errorMessage={errors?.email?.message}
  //             />
  //           </div>

  //           <div className="flex w-full flex-col gap-2">
  //             <div className="mt-1 flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
  //               <LabelComponent
  //                 htmlFor="password"
  //                 value="Password:"
  //                 className="flex-1"
  //               />

  //               <NavLink
  //                 to="/forget"
  //                 className="text-black underline hover:text-gray-700"
  //               >
  //                 Forget Password?
  //               </NavLink>
  //             </div>

  //             <PasswordInputComponent
  //               control={control}
  //               name="password"
  //               errorMessage={errors?.password?.message}
  //             />
  //           </div>

  //           <div className="flex w-full flex-col gap-2">
  //             <div className="mt-1 flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
  //               <LabelComponent
  //                 htmlFor="confirmPassword"
  //                 value="Re-Password:"
  //                 className="flex-1"
  //               />
  //             </div>

  //             <PasswordInputComponent
  //               control={control}
  //               name="confirmPassword"
  //               errorMessage={errors?.confirmPassword?.message}
  //             />
  //           </div>

  //           <div className="flex w-full flex-col gap-2">
  //             <LabelComponent htmlFor="role" value="Role:" className="w-full" />

  //             <MultipleOptionSingleSelectComponent
  //               control={control}
  //               name="role"
  //               options={[
  //                 { label: "Buyer", value: "customer" },
  //                 { label: "Seller", value: "seller" },
  //               ]}
  //               errorMessage={errors?.role?.message}
  //             />
  //           </div>

  //           <div className="flex w-full flex-col gap-2">
  //             <LabelComponent htmlFor="image" value="Image:" className="w-full" />

  //             <SingleFileInputComponent
  //               control={control}
  //               name="image"
  //               errorMessage={errors?.role?.message}
  //             />
  //           </div>

  //           <div className="flex flex-col gap-2 pt-1 font-medium text-gray-400 sm:flex-row sm:gap-4">
  //             <button
  //             type="submit"
  //             disabled={isSubmitting}
  //             className="disabled:cursor-not-allowd w-full rounded-xl bg-green-950 p-2 transition duration-400 hover:scale-[0.98] sm:w-1/2">
  //               Register
  //             </button>
  //             <button
  //             type="reset"
  //             disabled={isSubmitting}
  //              className="disabled:cursor-not-allowd w-full rounded-xl bg-red-900 p-2 transition duration-400 hover:scale-[0.98] sm:w-1/2">
  //               Cancel
  //             </button>
  //           </div>

  //         </form>

  //         <div className="mt-4 w-full">
  //           <div className="flex w-full flex-col items-center justify-center gap-1 text-center text-sm text-gray-700 sm:flex-row">
  //             Already have an account?
  //             <LoginLinkComponent to="/" text="Login Here" />
  //           </div>
  //         </div>
  //       </div>

  //     </div>
  //     </div>
  //   );
  // };

  return (
    <div className="w-full">
      <h2 className="mb-8 text-center text-3xl font-bold text-black underline underline-offset-4">
        Register Page
      </h2>

      <form onSubmit={handleSubmit(submitHandle)} className="space-y-6">
        {/* Two Column Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Name */}
          <div className="space-y-2">
            <LabelComponent
              htmlFor="username"
              value="Name"
              className="font-semibold"
            />
            <TextInputComponent
              control={control}
              name="name"
              errorMessage={errors?.name?.message}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <LabelComponent
              htmlFor="email"
              value="Email"
              className="font-semibold"
            />
            <EmailInputComponent
              control={control}
              name="email"
              errorMessage={errors?.email?.message}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <LabelComponent
              htmlFor="password"
              value="Password"
              className="font-semibold"
            />

            <PasswordInputComponent
              control={control}
              name="password"
              errorMessage={errors?.password?.message}
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <LabelComponent
              htmlFor="confirmPassword"
              value="Confirm Password"
              className="font-semibold"
            />

            <PasswordInputComponent
              control={control}
              name="confirmPassword"
              errorMessage={errors?.confirmPassword?.message}
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <LabelComponent
              htmlFor="role"
              value="Role"
              className="font-semibold"
            />

            <MultipleOptionSingleSelectComponent
              control={control}
              name="role"
              options={[
                {
                  label: "Buyer",
                  value: "customer",
                },
                {
                  label: "Seller",
                  value: "seller",
                },
              ]}
              errorMessage={errors?.role?.message}
            />
          </div>

          {/* Image */}
          <div className="space-y-2">
            <LabelComponent
              htmlFor="image"
              value="Profile Image"
              className="font-semibold"
            />

            <SingleFileInputComponent
              control={control}
              name="image"
              errorMessage={errors?.image?.message}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 pt-4 sm:flex-row">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-green-900 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed"
          >
            Register
          </button>

          <button
            type="reset"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-red-800 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </form>

      <div className="mt-6 text-center text-sm text-gray-800">
        Already have an account? <LoginLinkComponent to="/" text="Login Here" />
      </div>
    </div>
  );
};

export default RegisterPage;
