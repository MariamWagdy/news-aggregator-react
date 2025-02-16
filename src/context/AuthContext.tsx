import React, { createContext, useState, ReactNode, useContext } from "react";
import { login, register, logout } from "@api";

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    loginUser: (email: string, password: string) => Promise<void>;
    registerUser: (name: string, email: string, password: string) => Promise<void>;
    logoutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const loginUser = async (email: string, password: string) => {
        try {
            const response = await login(email, password);
            setUser(response.user);
            localStorage.setItem("user", JSON.stringify(response.user));
            localStorage.setItem("token", response.token);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const registerUser = async (name: string, email: string, password: string) => {
        try {
            const response = await register(name, email, password);
            setUser(response.user);
            localStorage.setItem("user", JSON.stringify(response.user));
            localStorage.setItem("token", response.token);
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    const logoutUser = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setUser(null);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, registerUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
