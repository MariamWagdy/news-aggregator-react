import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthData } from "@utils";

const useAuth = () => {
    const [user, setUser] = useState<{ name?: string } | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const authData = getAuthData();
        if (!authData) {
            navigate("/login");
        } else {
            setUser(authData.user);
        }
    }, [navigate]);

    return user;
};

export default useAuth;
