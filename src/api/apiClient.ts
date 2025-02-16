import axios from "axios";
import {logoutUser} from "@utils";
import {toast} from "react-toastify";

const apiClient = axios.create({
    baseURL: "http://localhost:8000/api", // Change if necessary
    withCredentials: true, // For Laravel Sanctum
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});
apiClient.interceptors.response.use(
    (response) => response, // Return response if no error
    async (error) => {
        if (error.response?.status === 401) {
            toast.error("Session expired. Please log in again.");
            logoutUser();
            window.location.href = "/login";
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);

export default apiClient;
