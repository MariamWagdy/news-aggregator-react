import React, {useEffect, useState} from "react";
import {getAvailablePlatforms} from "@api";
import "./css/PlatformsDropDown.scss";

interface PlatformsDropDownProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PlatformsDropDown: React.FC<PlatformsDropDownProps> = ({value, onChange}) => {
    const [platforms, setPlatforms] = useState<{ id: number; name: string }[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPlatforms();
    }, []);

    const fetchPlatforms = async () => {
        setLoading(true);
        try {
            const response = await getAvailablePlatforms();
            setPlatforms(response);
        } catch (error) {
            console.error("Failed to fetch platforms:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="platforms-dropdown">
            <select id="platform_id" name="platform_id" value={value} onChange={onChange} disabled={loading}>
                <option value="">All Platforms</option>
                {platforms.map((platform) => (
                    <option key={platform.id} value={platform.id}>
                        {platform.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default PlatformsDropDown;
