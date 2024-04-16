import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const SearchTest = ({onSearch}) => {

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchQuery);
    };

    return (
        <form onSubmit={handleSubmit} className="searchBox">
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Type something..."
            />
            
            <button type="submit">
                <FontAwesomeIcon className="fasSearch" icon={faMagnifyingGlass} />
            </button>
        </form>
    )
};

export default SearchTest;