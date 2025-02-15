import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {getAuthData} from "../utils/auth";

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<{ name: string } | null>(null);

    useEffect(() => {
        const authData = getAuthData();
        if (!authData) {
            setTimeout(() => navigate("/login"), 0);
        } else {
            setUser(authData.user);
        }
    }, [navigate]);

    if (!user) return <p>Loading...</p>;

    return (
        <div className="container text-center mt-5">
            <h1>Welcome, {user.name}!</h1>
            <p>You are successfully logged in.</p>
            <button
                className="btn btn-danger mt-3"
                onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    navigate("/login");
                }}
            >
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
