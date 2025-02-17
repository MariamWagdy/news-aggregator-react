import React from "react";
import "./css/DateRangePicker.scss";

interface DateRangePickerProps {
    fromDate: string;
    toDate: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ fromDate, toDate, onChange }) => {
    return (
        <div className="date-range-picker">
            <input
                type="date"
                name="from_date"
                value={fromDate}
                onChange={onChange}
                className="date-input"
            />
            <span className="date-separator">—</span>
            <input
                type="date"
                name="to_date"
                value={toDate}
                onChange={onChange}
                className="date-input"
            />
        </div>
    );
};

export default DateRangePicker;
