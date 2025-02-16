import {toast} from "react-toastify";

export const setAuthData = (user: { id: number; name: string; email: string }, token: string) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
};

export const getAuthData = () => {
    try {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        //  Ensure both user and token exist
        if (!user || !token) {
            return null;
        }

        //  Try parsing JSON safely
        const parsedUser = JSON.parse(user);
        if (!parsedUser || typeof parsedUser !== "object") {
            throw new Error("Invalid user data");
        }

        return {user: parsedUser, token};
    } catch (error) {
        console.error("Error retrieving auth data:", error);
        logoutUser();
        return null;
    }
};
export const logoutUser = () => {
    localStorage.removeItem("user");
};
export const getAuthHeaders = () => {
    const authData = getAuthData();
    return {
        headers: {
            Authorization: `Bearer ${authData?.token}`,
        },
    };
};

export const handleApiError = (error: any) => {
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

export const extractResponseData = (response: any) => {
    return response?.data?.data || response?.data || null;
};
