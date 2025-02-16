import React, {useEffect, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import {getAuthData} from "@utils";
import {logout} from "@api";

import "./Css/Dashboard.css";

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

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    if (!user) return <p>Loading...</p>;

    // @ts-ignore
    return (
        <div className="dashboard-container">
            <h1>Welcome, {user.name}!</h1>
            <div className="dashboard-buttons">
                <Link to="/preferences" className="btn btn-edit">Edit Preferences</Link>
                <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Dashboard;
