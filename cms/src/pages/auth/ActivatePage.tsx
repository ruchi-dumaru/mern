import { useNavigate, useParams } from "react-router";
import { LoadingSpinner } from "../../components/ui/spinner";
import { useEffect } from "react";
import { getRequest } from "../../config/axios.config";
import { notifyError, notifySuccess } from "../../utilities/helpers";
import useAuth from "../../hooks/auth.hook";

export default function ActivatePage() {
  //
  const params = useParams();
  const navigate = useNavigate();

  const asyncCall = async () => {
    try {
      await getRequest("auth/activate/" + params.token);

      notifySuccess({
        title: "Your account activated successfully...",
      });
      // navigate('/')

      //eslint-disable-next-line
    } catch (exception: any) {
      // console.error(exception)
      notifyError({
        title: "Cannot activate your account at this moment!!",
      });
    } finally {
      navigate("/");
    }
  };


  const {loggedInUser}=useAuth()
  useEffect(()=>{
    if(loggedInUser){
      notifySuccess({title:"You are already logged in..."})
 navigate("/"+loggedInUser.role)
    }
  },[loggedInUser])


  useEffect(() => {
    //api call

    asyncCall();
  }, [params]);

  return (
    <>
      <div className="flex max-w-full h-40 items-center justify-center">
        <LoadingSpinner className="w-20 h-20 text-gray-300 fill-blue-600" />
      </div>
    </>
  );
}
