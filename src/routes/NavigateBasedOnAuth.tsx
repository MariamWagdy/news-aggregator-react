import { Navigate } from "react-router-dom";
import { getAuthData } from "@utils/auth";

const NavigateBasedOnAuth = () => {
    const authData = getAuthData();
    return authData ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

export default NavigateBasedOnAuth;
