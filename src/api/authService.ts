import apiClient from "./apiClient";
import {toast} from "react-toastify";
import {logoutUser, setAuthData, handleApiError, extractResponseData, getAuthHeaders} from "@utils";

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
        const extractedData = extractResponseData(response);

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
        const extractedData = extractResponseData(response);

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
        const response = await apiClient.post("/logout", {}, getAuthHeaders());
        if (response.status === 200) {
            logoutUser();
            toast.success("Logout successful!");
        }
    } catch (error: any) {
        console.error("Logout Error:", error.response?.data || error.message);
        if (error.response?.status === 401) {
            logoutUser();
            toast.warning("Session expired. Logging out...");
        } else {
            handleApiError(error);
        }
    }
};



