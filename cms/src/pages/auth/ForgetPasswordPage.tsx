
import { useForm } from "react-hook-form";
import { LabelComponent } from "../../components/form/LabelComponent";
import { LoginLinkComponent } from "../../components/form/LinkComponent";
import { EmailInputComponent } from "../../components/form/InputComponent";

import { type IForgetPasswordForm } from "./Auth.contract";
import useAuth from "../../hooks/auth.hook";
import { useEffect } from "react";
import { notifySuccess } from "../../utilities/helpers";
import { useNavigate } from "react-router";

const ForgetPasswordPage = () => {
  document.title = "Forget Password Page";

  const navigate=useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgetPasswordForm>({
    defaultValues: {
      email: "",
    },
  });

  const submitEvent = (data: IForgetPasswordForm) => {
    console.log(data);
  };

  
  const {loggedInUser}=useAuth()
    useEffect(()=>{
      if(loggedInUser && Object.entries(loggedInUser).length!==0){
        notifySuccess({title:"You are already logged in..."})
   navigate("/"+loggedInUser.role)
      }
    },[loggedInUser])

  return (
    <>
      <h2 className="flex flex-col text-start underline font-bold text-4xl underline-offset-2">
        Forget your password?
      </h2>

      <div className="w-full mt-3">
        <form onSubmit={handleSubmit(submitEvent)}>
          <div className="flex gap-2 flex-col w-full">
            <LabelComponent htmlFor="email" value="Email:" className="w-full" />

            

            <EmailInputComponent control={control} name="email" errorMessage={errors?.email?.message}/>
          </div>

          <div className="flex justify-start mt-3">
            <button
              type="submit"
              className="bg-green-950 px-6 py-2 rounded-xl cursor-pointer hover:scale-98 transition duration-400 text-white"
            >
              Reset Password
            </button>
          </div>
        </form>

        <div className="w-full flex items-center justify-center mt-4 text-gray-700 gap-1">
          Already have an account?
        

          <LoginLinkComponent to="/" text=" Login Here"/>
        </div>
      </div>
    </>
  );
};

export default ForgetPasswordPage;
