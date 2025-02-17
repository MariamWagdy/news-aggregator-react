import React, {useState} from "react";
import {login} from "@api";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import LoadingSpinner from "@components/LoadingSpinner/LoadingSpinner";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        let newErrors: { email?: string; password?: string } = {};
        if (!email) newErrors.email = "Email is required.";
        if (!password) newErrors.password = "Password is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        if (!validateForm()) return;
        setLoading(true);
        try {
            await login(email, password);

        } catch (error) {
            toast.error("Invalid email or password. Please try again.");
        } finally {
            navigate("/dashboard");
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <LoadingSpinner loading={loading}/>
            <ToastContainer position="top-right" autoClose={3000}/>
            <div className="card p-4 shadow-lg w-50">
                <h2 className="text-center mb-3">Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            placeholder="name@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Sign In</button>
                    <p className="mt-3 text-center">
                        Don't have an account? <a href="/register">Sign Up</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
