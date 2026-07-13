import { NavLink } from "react-router";


const RegisterPage = () => {
   document.title="Register Page"
  return (
    <>
     
          <h2 className="flex flex-col text-start underline font-bold text-4xl underline-offset-2">
            Register Page
          </h2>
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
        
    </>
  );
};


export default RegisterPage