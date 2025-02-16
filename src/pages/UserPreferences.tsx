import React, {useEffect, useState} from "react";
import {
    getAvailableCategories,
    getAvailableAuthors,
    getAvailableSources,
    getUserPreferences,
    saveUserPreferences
} from "@api";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import "./Css/UserPreferences.css";

const UserPreferences: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<{
        categories: { id: number; name: string }[];
        authors: string[];  // Authors are just names (strings)
        sources: { id: number; name: string }[];
    }>({
        categories: [],
        authors: [],
        sources: []
    });

    const [userPreferences, setUserPreferences] = useState<{
        categories: number[];
        authors: string[];
        sources: number[];
    }>({
        categories: [],
        authors: [],
        sources: []
    });

    const [loading, setLoading] = useState(true);

    // Handle checkbox change
    const handleCheckboxChange = (itemId: number, type: "categories" | "authors" | "sources") => {
        setUserPreferences((prev) => ({
            ...prev,
            [type]: prev[type as keyof typeof prev].includes(itemId)
                ? prev[type as keyof typeof prev].filter((id) => id !== itemId) // Remove if already selected
                : [...prev[type as keyof typeof prev], itemId], // Add if not selected
        }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await saveUserPreferences(userPreferences);
            toast.success("Preferences saved successfully!");
            navigate("/dashboard");
        } catch (error) {
            toast.error("Failed to save preferences.");
            console.error("Error saving preferences", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch all data in parallel
                const [responseCategories, responseAuthors, responseSources] = await Promise.all([
                    getAvailableCategories(),
                    getAvailableAuthors(),
                    getAvailableSources()
                ]);
                setData({
                    categories: responseCategories || [],
                    authors: responseAuthors || [],
                    sources: responseSources || []
                });
                // Fetch user preferences
                const userPrefs = await getUserPreferences();
                if (userPrefs) {
                    setUserPreferences({
                        categories: userPrefs.categories ? userPrefs.categories.map((cat: {
                            id: number
                        }) => cat.id) : [],
                        authors: userPrefs.authors || [],
                        sources: userPrefs.sources || []
                    });
                }
            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="preferences-container">
            {loading && (
                <div className="spinner-overlay">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            <div className={loading ? "content-disabled" : ""}>
                <h2 className="preferences-title">Select Your Preferences</h2>
                <form onSubmit={handleSubmit}>
                    {/* Categories Section */}
                    <div className="pref-section">
                        <h4 className="section-title">Categories</h4>
                        <div className="pref-list">
                            {data.categories.map((category) => (
                                <label key={category.id} className="custom-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={userPreferences.categories.includes(category.id)}
                                        onChange={() => handleCheckboxChange(category.id, "categories")}
                                    />
                                    <span className="checkmark"></span>
                                    {category.name}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Authors Section */}
                    <div className="pref-section">
                        <h4 className="section-title">Authors</h4>
                        <div className="pref-list">
                            {data.authors.map((author, index) => (
                                <label key={index} className="custom-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={userPreferences.authors.includes(author.author)}
                                        onChange={() => handleCheckboxChange(author.author, "authors")}
                                    />
                                    <span className="checkmark"></span>
                                    {author.author}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Sources Section */}
                    <div className="pref-section">
                        <h4 className="section-title">Sources</h4>
                        <div className="pref-list">
                            {data.sources.map((source, index) => (
                                <label key={index} className="custom-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={userPreferences.sources.includes(source.source)}
                                        onChange={() => handleCheckboxChange(source.source, "sources")}
                                    />
                                    <span className="checkmark"></span>
                                    {source.source}
                                </label>
                            ))}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary save-btn">Save Preferences</button>
                </form>
            </div>
        </div>
    );
};

export default UserPreferences;
