import React from "react";
import "./css/LoadingSpinner.scss";

const LoadingSpinner: React.FC<{ loading: boolean }> = ({ loading }) => {
    if (!loading) return null;

    return (
        <div className="spinner-overlay">
            <div className="spinner"></div>
        </div>
    );
};

export default LoadingSpinner;
