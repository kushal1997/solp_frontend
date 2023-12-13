import React, { useState, useRef, useEffect } from 'react';
import "../admin/admin.css"
import search from "../assets/search-v1.png"

function MultiSelectDropdown({ options, selectedOptions, onSelectionChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState(options);
    const dropdownRef = useRef(null);

    function handleFilter(filterText) {
        const filteredOptions = options.filter((option) => {
            return option.toLowerCase().includes(filterText.toLowerCase());
        });

        setFilteredOptions(filteredOptions);
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        if (selectedOptions.includes(option)) {
            onSelectionChange(selectedOptions.filter((item) => item !== option));
        } else {
            onSelectionChange([...selectedOptions, option]);
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }

        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div className="multiselect-dropdown" ref={dropdownRef}>
            <div className="multiselect">
                <div className="dropdown-header" onClick={toggleDropdown}>
                    Assign Courses
                </div>
                <div className="search-box">
                    <button type='button' class="btn-search"><img width="35" height="35" src={search} alt="search--v1" /></button>

                    <input type="text" className="input-search" placeholder="Filter User ..."
                        // value={searchText}
                        onChange={(e) => handleFilter(e.target.value)}
                    />
                </div>
            </div>

            {isOpen && (
                <div className="dropdown-options">
                    {/* {options.map((option) => { */}
                    {filteredOptions.map((option) => {
                        const isSelected = selectedOptions.includes(option); // Corrected variable name
                        return (
                            <div
                                key={option}
                                onClick={() => handleOptionClick(option)}
                                className={`option ${isSelected ? 'selected' : ''}`}
                            >
                                {option}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default MultiSelectDropdown;