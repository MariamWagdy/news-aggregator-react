import React, { useEffect, useState } from "react";
import { getAvailableSources } from "@api";
import "./css/SourceFilter.scss";

interface SourceFilterProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SourceFilter: React.FC<SourceFilterProps> = ({ value, onChange }) => {
    const [sources, setSources] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSources();
    }, []);

    const fetchSources = async () => {
        setLoading(true);
        try {
            const response = await getAvailableSources();
            setSources(response); // ✅ Expecting an array of strings
        } catch (error) {
            console.error("Failed to fetch sources:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="source-filter">
            <select name="source" value={value} onChange={onChange} disabled={loading}>
                <option value="">All Sources</option>
                {sources.map((source, index) => (
                    <option key={index} value={source.source}>
                        {source.source}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SourceFilter;
