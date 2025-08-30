import React, { useState, useEffect } from "react";
const SearchBar = ({ onSearch, products }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const clearSuggestions = () => {
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Handle input change
  const handleChange = (e) => {
    const term = e.target.value;
    console.log("🔍 Search term:", term);
    setSearchTerm(e.target.value);

    if (term.trim().length > 0) {
      const lower = term.toLowerCase();
      const filteredSuggestions = products
        .filter((product) => product.name.toLowerCase().includes(lower))
        .slice(0, 5) // Limit suggestions to 5
        .map((product) => product.name);
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      clearSuggestions();
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    console.log("🔍 Search triggered with suggestion:", suggestion);

    setSearchTerm(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion); // Trigger search with selected suggestion
  };

  // Handle search button click
  const handleSearch = () => {
    console.log("🔍 Search button clicked with term:", searchTerm);
    onSearch(searchTerm);
    setShowSuggestions(false);
  };

  // Handle key press
  const handleKeyPress = (e) => {
    const key = e.key;
    if (key === "Enter") {
      console.log("🔍 Enter key pressed, searching for:", searchTerm);
      handleSearch();
    } else if (key === "ArrowDown") {
      console.log("🔍 ArrowDown key pressed, navigating suggestions");
      // Logic to navigate through suggestions can be added here
    } else if (key === "ArrowUp") {
      console.log("🔍 ArrowUp key pressed, navigating suggestions");
      // Logic to navigate through suggestions can be added here
    } else if (key === "Escape") {
      console.log("🔍 Escape key pressed, clearing suggestions");
      clearSuggestions();
    }
  };

  return (
    <div className="search-bar relative w-full max-w-md">
      {/* Search input with integrated button */}
      <div className="flex items-center">
        {/* <div className="relative flex-1"> */}
        <input
          type="text"
          className="flex-1 px-4 py-2 pr-16 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
        {/* Clear button - positioned inside input */}
        {searchTerm.length > 0 && (
          <button
            onClick={() => {
              setSearchTerm("");
              onSearch("");
              clearSuggestions();
            }}
            className="absolute right-24 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-100" // Changed right-20 to right-24
          >
            ×
          </button>
        )}
        {/* </div> */}
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition-colors whitespace-nowrap min-w-[100px]" // Added min-width
        >
          🔍 Search
        </button>
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 rounded-lg w-full mt-1 max-h-60 overflow-y-auto shadow-lg z-50 top-full">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800 border-b border-gray-100 last:border-b-0"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default SearchBar;
