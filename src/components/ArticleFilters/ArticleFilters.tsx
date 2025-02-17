import React, {useState} from "react";
import CategoriesDropDown from "./CategoriesDropDown";
import PlatformsDropDown from "./PlatformsDropDown";
import DateRangePicker from "./DateRangePicker";
import KeywordSearch from "./KeywordSearch";
import SourceFilter from "./SourceFilter";

import "./css/ArticleFilters.scss"

interface ArticleFiltersProps {
    onFilterChange: (filters: any) => void;
}

const ArticleFilters: React.FC<FilterProps> = ({onFilterChange}) => {
    const [filters, setFilters] = useState({
        keyword: "",
        platform_id: "",
        category_id: "",
        from_date: "",
        to_date: "",
        source: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const updatedFilters = {...filters, [e.target.name]: e.target.value};
        setFilters(updatedFilters);

        if (e.target.name !== "from_date" && e.target.name !== "to_date") {
            onFilterChange(updatedFilters);
        }
    };
    const applyFilters = () => {
        onFilterChange(filters);
    };

    return (
        <div className="articles-filters-container">
            <KeywordSearch keyword={filters.keyword} onChange={handleChange}/>
            <PlatformsDropDown value={filters.platform_id} onChange={handleChange}/>
            <CategoriesDropDown value={filters.category_id} onChange={handleChange}/>
            <SourceFilter value={filters.source} onChange={handleChange}/>
            <DateRangePicker fromDate={filters.from_date} toDate={filters.to_date} onChange={handleChange}/>
            <button className="btn btn-filter" onClick={applyFilters}>
                Apply Filters
            </button>
        </div>
    );
};
export default ArticleFilters;
