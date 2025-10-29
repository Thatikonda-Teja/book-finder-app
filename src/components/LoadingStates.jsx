/**
 * LoadingStates Component
 * Skeleton screens for better perceived performance
 */

import React from "react";

export const BookCardSkeleton = ({ viewMode }) => {
  // List view skeleton
  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-xl p-4 flex gap-4 border border-gray-100 animate-pulse">
        <div className="w-24 h-32 bg-gray-200 rounded-lg flex-shrink-0"></div>
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  // Grid view skeleton
  return (
    <div className="bg-white rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-[2/3] bg-gray-200"></div>
      <div className="p-4">
        <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
};
