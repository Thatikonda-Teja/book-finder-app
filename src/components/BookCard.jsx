/**
 * BookCard Component
 * Displays individual book in grid or list format
 * Updated to handle Open Library API data structure
 */

import React from "react";
import { BookOpen, Star, Calendar, User } from "lucide-react";

const BookCard = ({ book, onBookClick, viewMode }) => {
  const volumeInfo = book.volumeInfo || {};
  const thumbnail = volumeInfo.imageLinks?.thumbnail || "";
  const title = volumeInfo.title || "Untitled";
  const authors = Array.isArray(volumeInfo.authors)
    ? volumeInfo.authors.join(", ")
    : volumeInfo.authors || "Unknown Author";
  const publishedDate = volumeInfo.publishedDate || "N/A";
  const rating = volumeInfo.averageRating || 0;
  const description = volumeInfo.description || "No description available";

  // List view layout
  if (viewMode === "list") {
    return (
      <div
        onClick={() => onBookClick(book.id)}
        className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer p-4 flex gap-4 border border-gray-100"
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === "Enter" && onBookClick(book.id)}
      >
        {/* Book Cover */}
        <div className="w-24 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.innerHTML =
                  '<div class="w-full h-full flex items-center justify-center"><svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg></div>';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-gray-300" />
            </div>
          )}
        </div>

        {/* Book Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-gray-900 mb-1 truncate">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
            <User className="w-3 h-3" />
            {authors}
          </p>
          <p className="text-xs text-gray-500 line-clamp-2 mb-2">
            {typeof description === "string"
              ? description.replace(/<[^>]*>/g, "").substring(0, 120)
              : "No description available"}
            ...
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            {rating > 0 && (
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                {rating.toFixed(1)}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {publishedDate.toString().substring(0, 4)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Grid view layout
  return (
    <div
      onClick={() => onBookClick(book.id)}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden group"
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === "Enter" && onBookClick(book.id)}
    >
      {/* Book Cover */}
      <div className="aspect-[2/3] bg-gray-100 overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.innerHTML =
                '<div class="w-full h-full flex items-center justify-center"><svg class="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg></div>';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-gray-300" />
          </div>
        )}
      </div>

      {/* Book Info */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 min-h-[3rem]">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mb-2 truncate">{authors}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          {rating > 0 && (
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              {rating.toFixed(1)}
            </span>
          )}
          <span>{publishedDate.toString().substring(0, 4)}</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
