import { Navigate, Outlet } from "react-router-dom";
import { getAuthData } from "@utils/auth";

const PublicRoute = () => {
    const authData = getAuthData();
    return authData ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;
