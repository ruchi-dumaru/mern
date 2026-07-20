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

export default axiosInstance