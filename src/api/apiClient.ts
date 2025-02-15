import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8000/api", // Change if necessary
    withCredentials: true, // For Laravel Sanctum
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Global Response Interceptor (Handles Non-200 Errors)
apiClient.interceptors.response.use(
    (response) => response, // If response is OK, return it
    (error) => {
        // Check if response exists
        if (error.response) {
            return Promise.resolve({
                success: false,
                status: error.response.status,
                message: error.response.data.message || "Something went wrong",
                data: null,
            });
        }

        // Handle Network Errors
        return Promise.resolve({
            success: false,
            status: 500,
            message: "Network error. Please try again.",
            data: null,
        });
    }
);

export default apiClient;
