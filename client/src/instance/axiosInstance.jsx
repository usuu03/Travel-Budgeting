// axiosInstance.js
import axios from "axios";
import { useAuthState } from "../context/authContext";

const useAxiosInstance = () => {
  const { token } = useAuthState();

  const axiosInstance = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }), // Add Authorization header if token exists
    },
  });

  return axiosInstance;
};

export default useAxiosInstance;
