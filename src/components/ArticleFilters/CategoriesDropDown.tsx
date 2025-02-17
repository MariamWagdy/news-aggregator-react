import React, { useEffect, useState } from "react";
import { getAvailableCategories } from "@api";
import './css/CategoriesDropDown.scss';

interface CategoriesDropDownProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CategoriesDropDown: React.FC<CategoriesDropDownProps> = ({ value, onChange }) => {
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await getAvailableCategories();
            setCategories(response);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="categories-dropdown">
            <select id="category_id" name="category_id" value={value} onChange={onChange} disabled={loading}>
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategoriesDropDown;
