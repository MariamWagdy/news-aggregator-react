import apiClient from "./apiClient";
import {getAuthHeaders, extractResponseData, handleApiError} from "@utils";


export const getArticles = async (filters) => {
    try {
        const response = await apiClient.get("/articles", {
            params: filters,
            ...getAuthHeaders(),
        });
        if (response.status === 200) {
            return extractResponseData(response);
        }
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        handleApiError(error);
    }
};