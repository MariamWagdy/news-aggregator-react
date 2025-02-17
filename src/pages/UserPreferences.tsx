import React, { useEffect, useState } from "react";
import {
    getAvailableCategories,
    getAvailableAuthors,
    getAvailableSources,
    getUserPreferences,
    saveUserPreferences
} from "@api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserPreferencesSection, LoadingSpinner } from "@components";

import "./css/UserPreferences.scss";

const UserPreferences: React.FC = () => {
    const sections = [
        { title: "Categories", key: "categories", fetch: getAvailableCategories },
        { title: "Authors", key: "authors", fetch: getAvailableAuthors },
        { title: "Sources", key: "sources", fetch: getAvailableSources },
    ];

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<{ [key: string]: any[] }>({
        categories: [],
        authors: [],
        sources: []
    });

    const [userPreferences, setUserPreferences] = useState<{
        categories: number[];
        authors: string[];
        sources: string[];
    }>({
        categories: [],
        authors: [],
        sources: []
    });

    // Handle selection toggling
    const handleToggle = (item: any, type: "categories" | "authors" | "sources") => {
        setUserPreferences((prev) => ({
            ...prev,
            [type]: prev[type].includes(item)
                ? prev[type].filter((id) => id !== item)
                : [...prev[type], item]
        }));
    };

    // Handle save
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await saveUserPreferences(userPreferences);
            toast.success("Preferences saved successfully!");
            navigate("/dashboard");
        } catch (error) {
            toast.error("Failed to save preferences.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const results = await Promise.all(sections.map((section) => section.fetch()));

                // Map results dynamically
                const newData: { [key: string]: any[] } = {};
                sections.forEach((section, index) => {
                    newData[section.key] = results[index] || [];
                });

                setData(newData);

                // Fetch user preferences
                const userPrefs = await getUserPreferences();
                if (userPrefs) {
                    setUserPreferences({
                        categories: userPrefs.categories ? userPrefs.categories.map((c: { id: number }) => c.id) : [],
                        authors: userPrefs.authors || [],
                        sources: userPrefs.sources || []
                    });
                }
            } catch (error) {
                toast.error("Failed to load preferences.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="user-preferences-container">
            <h2 className="page-title">Customize Your News Preferences</h2>

            {loading ? (
                <LoadingSpinner loading={loading} />
            ) : (
                <>
                    <p className="page-subtitle">
                        Select the categories, authors, and sources you prefer to tailor your news feed.
                    </p>

                    {/* Dynamically Render Sections */}
                    {sections.map(({ title, key }) => (
                        <UserPreferencesSection
                            key={key}
                            title={title}
                            items={data[key]}
                            selectedItems={userPreferences[key]}
                            onToggle={(item) => handleToggle(item, key)}
                        />
                    ))}

                    <button className="btn btn-primary save-btn" onClick={handleSubmit}>
                        Save Preferences
                    </button>
                </>
            )}
        </div>
    );
};

export default UserPreferences;
