/**
 * EmptyState Component
 * Displays when no search results are found
 */

import React from "react";
import { BookOpen } from "lucide-react";

const EmptyState = ({ searchTerm }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <BookOpen className="w-24 h-24 text-gray-300 mb-4" />
      <h3 className="text-2xl font-bold text-gray-900 mb-2">No books found</h3>
      <p className="text-gray-600 text-center max-w-md">
        {searchTerm
          ? `We couldn't find any books matching "${searchTerm}". Try different keywords or check your spelling.`
          : "Start searching for your next great read!"}
      </p>
    </div>
  );
};

export default EmptyState;
