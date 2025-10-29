/**
 * FilterPanel Component
 * Modal overlay for filtering books by subject
 */

import React from "react";
import { X } from "lucide-react";
import { SUBJECT_FILTERS } from "../util/constants";

const FilterPanel = ({ filters, onFilterChange, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Filters</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close filters"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Filter Options */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Subject
            </label>
            <div className="grid grid-cols-2 gap-2">
              {SUBJECT_FILTERS.map((subject) => (
                <button
                  key={subject.value}
                  onClick={() => onFilterChange("subject", subject.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filters.subject === subject.value
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {subject.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <button
          onClick={onClose}
          className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
