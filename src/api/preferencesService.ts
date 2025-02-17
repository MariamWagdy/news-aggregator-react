import apiClient from "./apiClient";
import {getAuthHeaders, extractResponseData, handleApiError} from "@utils";


export const getAvailablePlatforms = async () => {
    try {
        const response = await apiClient.get("/platforms", {...getAuthHeaders()});
        if (response.status === 200) {
            return extractResponseData(response);
        }
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        handleApiError(error);
    }
};


export const getAvailableCategories = async () => {
    try {
        const response = await apiClient.get("/categories", {...getAuthHeaders()});
        if (response.status === 200) {
            return extractResponseData(response);
        }
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        handleApiError(error);
    }
};

export const getAvailableAuthors = async () => {
    try {
        const response = await apiClient.get("/authors", {...getAuthHeaders()});
        if (response.status === 200) {
            return extractResponseData(response);
        }
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        handleApiError(error);
    }
};

export const getAvailableSources = async () => {
    try {
        const response = await apiClient.get("/sources", {...getAuthHeaders()});
        if (response.status === 200) {
            return extractResponseData(response);
        }
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        handleApiError(error);
    }
};


export const getUserPreferences = async () => {
    try {
        const response = await apiClient.get("/user/preferences", {...getAuthHeaders()});
        if (response.status === 200) {
            return extractResponseData(response);
        }
    } catch (error) {
        console.error("Error fetching user preferences:", error);
        throw error;
    }
};

export const saveUserPreferences = async (preferences: {
    categories: [],
    authors: [],
    sources: []
}) => {
    try {
        const response = await apiClient.post("/user/preferences", preferences, {...getAuthHeaders()});
        if (response.status === 200) {
            return extractResponseData(response);
        }
    } catch (error) {
        console.error("Error saving preferences:", error);
        throw error;
    }
};
