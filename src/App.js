/**
 * Main App Component
 * Orchestrates all child components and manages global state
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Book, Grid, List } from 'lucide-react';
//components
import SearchBar from './components/SearchBar';
import BookCard from './components/BookCard';
import BookDetails from './components/BookDetails';
import ErrorMessage from './components/ErrorMessage';
import Pagination from './components/Pagination';
import EmptyState from './components/EmptyState';
import FilterPanel from './components/FilterPanel';
import { BookCardSkeleton } from './components/LoadingStates';

// Services & Utils
import { searchBooks } from './services/bookService';
import { useDebounce } from './hooks/useDebounce';
import { BOOKS_PER_PAGE, MAX_PAGES, SEARCH_DEBOUNCE_DELAY, VIEW_MODES } from './util/constants';

const App = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState(VIEW_MODES.GRID);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ subject: 'all', language: 'en' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedBookId, setSelectedBookId] = useState(null);

  // Debounce search term to reduce API calls
  const debouncedSearchTerm = useDebounce(searchTerm, SEARCH_DEBOUNCE_DELAY);

  /**
   * Fetch books from API
   * Memoized to prevent unnecessary re-renders
   */
  const fetchBooks = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);
        setError(null);

        const startIndex = (page - 1) * BOOKS_PER_PAGE;
        const result = await searchBooks(
          debouncedSearchTerm,
          startIndex,
          BOOKS_PER_PAGE,
          filters
        );

        setBooks(result.books);
        setTotalItems(result.totalItems);
        setCurrentPage(page);
      } catch (err) {
        setError(err.message);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    },
    [debouncedSearchTerm, filters]
  );

  // Fetch books when search term or filters change
  useEffect(() => {
    fetchBooks(1);
  }, [fetchBooks]);

  /**
   * Handle filter changes
   */
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  /**
   * Handle page navigation
   */
  const handlePageChange = (page) => {
    fetchBooks(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate total pages
  const totalPages = Math.min(Math.ceil(totalItems / BOOKS_PER_PAGE), MAX_PAGES);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Logo and View Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Book className="w-8 h-8 text-blue-500" />
              <h1 className="text-3xl font-bold text-gray-900">Book Finder</h1>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode(VIEW_MODES.GRID)}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === VIEW_MODES.GRID
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
                aria-label="Grid view"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode(VIEW_MODES.LIST)}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === VIEW_MODES.LIST
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
                aria-label="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex justify-center">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onFilterClick={() => setShowFilters(true)}
            />
            </div>

          {/* Active Filters Display */}
          {filters.subject !== 'all' && (
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <span className="text-sm text-gray-600">Active filters:</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {filters.subject}
              </span>
              <button
                onClick={() => setFilters({ subject: 'all', language: 'en' })}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          // Loading State
          <div
            className={
              viewMode === VIEW_MODES.GRID
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }
          >
            {[...Array(BOOKS_PER_PAGE)].map((_, i) => (
              <BookCardSkeleton key={i} viewMode={viewMode} />
            ))}
          </div>
        ) : error ? (
          // Error State
          <ErrorMessage message={error} onRetry={() => fetchBooks(currentPage)} />
        ) : books.length === 0 ? (
          // Empty State
          <EmptyState searchTerm={debouncedSearchTerm} />
        ) : (
          // Results
          <>
            <div className="mb-4 text-sm text-gray-600">
              Found {totalItems.toLocaleString()} books
              {debouncedSearchTerm && ` for "${debouncedSearchTerm}"`}
            </div>

            <div
              className={
                viewMode === VIEW_MODES.GRID
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
              }
            >
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onBookClick={setSelectedBookId}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </main>

      {/* Modals */}
      {showFilters && (
        <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          onClose={() => setShowFilters(false)}
        />
      )}

      {selectedBookId && (
        <BookDetails bookId={selectedBookId} onClose={() => setSelectedBookId(null)} />
      )}
    </div>
  );
};

export default App;