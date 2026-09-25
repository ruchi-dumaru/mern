import axios from "axios";
import { AppConfig } from "./config";

const axiosInstance = axios.create({
  baseURL: AppConfig.apiUrl,
  timeout: 60000,
  timeoutErrorMessage: "Server Time Out....",
  responseType: "json",
});

//axios ma api call ma eror aayo bhanea we can check this

//axios request
//
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") ?? null;

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
});

//response
axiosInstance.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (exception) => {
    const errorResponse = {
      ...exception?.response?.data,
      statusCode: exception.status,
    };
    throw errorResponse;
  },
);

//eslint-disable-next-line
export const postRequest = async (
  url: string,
  data: any,
  config = { file: true, auth: false },
) => {
  //eslint-disable-next-line
  let headers: any = {};
  if (config.file && !(data instanceof FormData)) {
    headers["Content-Type"] = "multipart/form-data";
  }

  return await axiosInstance.post(url, data, {
    headers,
  });
};

export const putRequest = async (url: string, data: any) => {
  return await axiosInstance.put(url, data, {
    headers:
      data instanceof FormData ? {} : { "Content-Type": "application/json" },
  });
};

export const deleteRequest = async (url: string) => {
  return await axiosInstance.delete(url);
};

export const getRequest = async (url: string, config = { params: {} }) => {
  return await axiosInstance.get(url, {
    params: { ...config.params },
  });
};

export default axiosInstance;
