import React, { useState, useRef, useEffect } from 'react';
import Input from './Input'; // Assuming you have an Input component
import { CiSearch } from 'react-icons/ci';

const Search = () => {
    const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);
    const [searchVal, setSearchVal] = useState('');
    const searchRef = useRef(null); // Ref for the input box

    // Handle when search icon is clicked
    const handleSearchClick = () => {
        setIsSearchInputVisible(true); // Show input
        setTimeout(() => {
            searchRef.current?.focus(); // Focus the input after it appears
        }, 0);
    };

    // Detect click outside the input box to close it
    const handleClickOutside = (e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
            setIsSearchInputVisible(false); // Hide input
            console.log('click outside ');
        }
    };

    useEffect(() => {
        // Add event listener for click outside
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Clean up event listener on unmount
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative">
            {!isSearchInputVisible && (
                <CiSearch
                    width="50"
                    height="50"
                    className="w-[30px] h-[40px] cursor-pointer"
                    onClick={handleSearchClick} // Show input on click
                />
            )}
            {isSearchInputVisible && (
                <input
                    type="text"
                    // className='search-input'
                    className="flex h-10 w-[250px] rounded-md bg-gray-100 px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Search"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)} // Update search value
                    ref={searchRef} // Input ref to detect outside clicks and focus
                />
            )}
        </div>
    );
};

export default Search;
