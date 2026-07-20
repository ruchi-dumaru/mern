import axios from "axios";
import { AppConfig } from "./config";

const axiosInstance=axios.create({
  baseURL:AppConfig.apiUrl,
  timeout:60000,
  timeoutErrorMessage:"Server Time Out....",
  responseType:"json",
  headers:{
    "Content-Type":"application/json"
  }
})


axiosInstance.interceptors.response.use(
  (response)=>{
    return response?.data
  },
  (exception)=>{
    const errorResponse={...exception?.response?.data,statusCode:exception.status}
    throw errorResponse
  }
)

export default axiosInstance