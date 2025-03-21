import React, { useState } from 'react';
import {convertToBengaliNumber} from "../../numberConverter";

const YearDropdown = ({ selectedYear, onYearChange }) => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, index) => currentYear - index);

    const handleYearChange = (event) => {
        const year = parseInt(event.target.value);
        onYearChange(year); // Notify the parent component of the year change
    };

    return (
        <div >
            <label htmlFor="yearDropdown">প্রকাশনা বছর:</label>
            <select className='w-100'
                id="yearDropdown"
                value={selectedYear}
                onChange={handleYearChange}
            >
                {years.map((year) => (
                    <option key={year} value={year}>
                        {convertToBengaliNumber(year)}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default YearDropdown;
