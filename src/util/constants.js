/**
 * Application Constants
 * Centralized configuration for consistent values across the app
 */

// Filter options
export const SUBJECT_FILTERS = [
  { value: "all", label: "All Subjects" },
  { value: "fiction", label: "Fiction" },
  { value: "science", label: "Science" },
  { value: "history", label: "History" },
  { value: "biography", label: "Biography" },
  { value: "technology", label: "Technology" },
  { value: "poetry", label: "Poetry" },
  { value: "business", label: "Business" },
];

// Pagination configuration
export const BOOKS_PER_PAGE = 12;
export const MAX_PAGES = 50; // Limit total pages for performance

// Debounce delay for search input
export const SEARCH_DEBOUNCE_DELAY = 600; // milliseconds

// View modes
export const VIEW_MODES = {
  GRID: "grid",
  LIST: "list",
};
