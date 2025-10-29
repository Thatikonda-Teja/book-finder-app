/**
 * BookDetail Component
 * Modal displaying comprehensive book information
 */

import React, { useState, useEffect } from "react";
import { X, BookOpen, Star, Loader2 } from "lucide-react";
import { getBookDetails } from "../services/bookService";

const BookDetails = ({ bookId, onClose }) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const data = await getBookDetails(bookId);
        setBook(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  // Loading state
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  const volumeInfo = book?.volumeInfo || {};
  const thumbnail =
    volumeInfo.imageLinks?.large ||
    volumeInfo.imageLinks?.thumbnail?.replace("http:", "https:") ||
    "";
  const title = volumeInfo.title || "Untitled";
  const authors = volumeInfo.authors?.join(",") || "Unknown Author";
  const publisher = volumeInfo.publisher || "Unknown";
  const publishedDate = volumeInfo.publishedDate || "N/A";
  const pageCount = volumeInfo.pageCount || "N/A";
  const categories = volumeInfo.categories?.join(", ") || "N/A";
  const rating = volumeInfo.averageRating || 0;
  const ratingsCount = volumeInfo.ratingsCount || 0;
  const description = volumeInfo.description || "No description available";
  const previewLink = volumeInfo.previewLink;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full">
          {/* Header */}
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Book Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Book Cover */}
              <div className="flex-shrink-0">
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt={title}
                    className="w-full md:w-64 rounded-xl shadow-lg"
                  />
                ) : (
                  <div className="w-full md:w-64 aspect-[2/3] bg-gray-100 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-24 h-24 text-gray-300" />
                  </div>
                )}
              </div>

              {/* Book Information */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {title}
                </h1>
                <p className="text-lg text-gray-600 mb-4">by {authors}</p>

                {/* Rating */}
                {rating > 0 && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.round(rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {rating.toFixed(1)} ({ratingsCount} reviews)
                    </span>
                  </div>
                )}

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Publisher</p>
                    <p className="font-semibold text-gray-900">{publisher}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Published</p>
                    <p className="font-semibold text-gray-900">
                      {publishedDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pages</p>
                    <p className="font-semibold text-gray-900">{pageCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Categories</p>
                    <p className="font-semibold text-gray-900">{categories}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 mb-2">Description</h3>
                  <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </div>

                {/* Preview Link */}

                {previewLink && (
                  <a
                    href={previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                  >
                    <BookOpen className="w-5 h-5" />
                    Preview Book
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
