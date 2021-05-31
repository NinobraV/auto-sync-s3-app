import Axios, { AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = Axios.create({
  baseURL: "http://localhost:8080",
  timeout: 60 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
  transformRequest: (data, headers) => {
    if (typeof data === "string") {
      return data;
    }
    return JSON.stringify(data);
  },
});
