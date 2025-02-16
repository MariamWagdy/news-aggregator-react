import { Navigate, Outlet } from "react-router-dom";
import { getAuthData } from "@utils/auth"; // Ensure this function correctly gets user authentication

const ProtectedRoute = () => {
    const authData = getAuthData(); // Retrieve authentication data
    return authData ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
