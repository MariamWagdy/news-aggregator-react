import React, { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa"; // Import proper icons
import "./css/UserPreferencesSection.scss";

interface UserPreferencesSectionProps {
    title: string;
    items: { id?: number; name?: string; author?: string; source?: string }[];
    selectedItems: (number | string)[];
    onToggle: (itemId: number | string) => void;
}

const UserPreferencesSection: React.FC<UserPreferencesSectionProps> = ({
                                                                           title,
                                                                           items,
                                                                           selectedItems,
                                                                           onToggle
                                                                       }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="user-preferences-section">
            {/* Section Header (Collapsible) */}
            <div className="section-header" onClick={() => setIsOpen(!isOpen)}>
                <h3>{title}</h3>
                {isOpen ? <FaChevronDown className="toggle-icon" /> : <FaChevronRight className="toggle-icon" />}
            </div>

            {/* Section Content (Scroll & Selection) */}
            {isOpen && (
                <div className="section-content">
                    {items.map((item, index) => {
                        const itemValue = item.id ?? item.author ?? item.source;
                        return (
                            <span
                                key={index}
                                className={`pref-badge ${selectedItems.includes(itemValue) ? "selected" : ""}`}
                                onClick={() => onToggle(itemValue)}
                            >
                                {item.name || item.author || item.source}
                            </span>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default UserPreferencesSection;
