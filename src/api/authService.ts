import apiClient from "./apiClient";
import {toast} from "react-toastify";
import {logoutUser, setAuthData} from "../utils/auth";

// Interface for authentication response
interface AuthResponse {
    user: {
        id: number;
        name: string;
        email: string;
    };
    token: string;
}

export const login = async (email: string, password: string): Promise<AuthResponse | null> => {
    try {
        const response = await apiClient.post<AuthResponse>("/login", {email, password});
        const extractedData = extractData(response);

        if (response.status === 200) {
            setAuthData(extractedData.user, extractedData.token);
            toast.success("Login successful!");
            return extractedData;
        }
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        handleApiError(error);
    }
    return null;
};

export const register = async (name: string, email: string, password: string): Promise<AuthResponse | null> => {
    try {
        const response = await apiClient.post<AuthResponse>("/register", {name, email, password});
        const extractedData = extractData(response);

        if (response.status === 200) {
            setAuthData(extractedData.user, extractedData.token);
            toast.success("Registration successful!");
            return extractedData;
        }
    } catch (error: any) {
        console.error("Register Error:", error.response?.data || error.message);
        handleApiError(error);
    }
    return null;
};

export const logout = async () => {
    try {
        await apiClient.post("/logout");
        toast.success("Logout successful!");
        logoutUser();
    } catch (error: any) {
        console.error("Logout Error:", error.response?.data || error.message);
        handleApiError(error);
    }
};

const extractData = (response: any) => {
    return response?.data?.data || response?.data || null;
};

const handleApiError = (error: any) => {
    if (error.response) {
        if (error.response.status === 400) {
            toast.error("Bad request. Please check your input.");
        } else if (error.response.status === 401) {
            toast.error("Unauthorized. Invalid credentials.");
        } else if (error.response.status === 403) {
            toast.error("Forbidden. You don't have permission.");
        } else if (error.response.status === 404) {
            toast.error("Not found. Please try again later.");
        } else if (error.response.status === 500) {
            toast.error("Server error. Please try again later.");
        } else {
            toast.error(error.response.data?.message || "Something went wrong.");
        }
    } else if (error.request) {
        toast.error("No response from server. Check your connection.");
    } else {
        toast.error("An unexpected error occurred.");
    }
};
