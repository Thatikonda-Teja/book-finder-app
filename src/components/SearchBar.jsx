/**
 * SearchBar Component
 * Provides search input with filter button
 */

import React from "react";
import { Search, Filter } from "lucide-react";

const SearchBar = ({ searchTerm, onSearchChange, onFilterClick }) => {
  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        {/* Search Icon */}
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

        {/* Search Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search books by title, author, or ISBN..."
          className="w-full pl-12 pr-12 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg transition-all"
          aria-label="Search books"
        />

        {/* Filter Button */}
        <button
          onClick={onFilterClick}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
          aria-label="Open filters"
        >
          <Filter className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
