import React from "react";
import "./css/KeywordSearch.scss";

interface KeywordSearchProps {
    keyword: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const KeywordSearch: React.FC<KeywordSearchProps> = ({ keyword, onChange }) => {
    return (
        <div className="keyword-search">
            <input
                type="text"
                name="keyword"
                value={keyword}
                onChange={onChange}
                placeholder="Search articles..."
                className="search-input"
            />
        </div>
    );
};

export default KeywordSearch;
