import React, {useState, useEffect} from "react";
import {useNavigate, Link} from "react-router-dom";
import useAuth from "@hooks/useAuth";
import useArticles from "@hooks/useArticles";
import {logout} from "@api";
import {ArticleFilters, Articles, LoadingSpinner} from "@components";
import "./css/Dashboard.scss";

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const user = useAuth();
    const {articles, loading, fetchArticles} = useArticles();
    const [logoutLoading, setLogoutLoading] = useState(false);

    const handleLogout = async () => {
        setLogoutLoading(true);
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setLogoutLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles({});
    }, []);


    return (
        <div className="page-container">
            <LoadingSpinner loading={loading || logoutLoading} />
            <div className="content-wrapper">
                <div className="dashboard-header">
                    <div className="right-side">Welcome, {user?.name}!</div>
                    <div className="left-side">
                        <Link to="/preferences" className="btn btn-edit">Edit Preferences</Link>
                        <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
                <div className="dashboard-body">
                    <ArticleFilters onFilterChange={fetchArticles}/>
                    <Articles articles={articles} loading={loading}/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
