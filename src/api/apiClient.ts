import axios from "axios";
import {logoutUser} from "@utils";

const API_URL = process.env.REACT_APP_API_URL
const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true, // For Laravel Sanctum
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});
export const setupInterceptors = (navigate: any) => {
    apiClient.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response?.status === 401) {
                logoutUser();
                navigate("/login");
                return Promise.reject(error);
            }
            return Promise.reject(error);
        }
    );
};

export default apiClient;
