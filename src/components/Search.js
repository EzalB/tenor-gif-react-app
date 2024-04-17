import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'

const Search = ({onSearch}) => {

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const clearSearch = () => {
        setSearchQuery('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchQuery);
    };

    return (
            <form onSubmit={handleSubmit} className="searchBox" id="search-bar">
                <input
                    type="search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Type something..."
                    className="searchBox__input"
                />
                <FontAwesomeIcon className="cancelSearch" icon={faXmark} onClick={clearSearch} />
                
                <button type="submit" className="searchBox__btn" id="search-button">
                    <FontAwesomeIcon className="fasSearch searchBox__icon" icon={faMagnifyingGlass} />
                </button>
            </form>
    )
};

export default Search;