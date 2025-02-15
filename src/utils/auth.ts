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
    localStorage.removeItem("token");
};