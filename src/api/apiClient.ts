import axios from "axios";
import {logoutUser} from "@utils";

const apiClient = axios.create({
    baseURL: "http://localhost:8000/api",
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
