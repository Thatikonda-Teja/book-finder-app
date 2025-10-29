/**
 * Book Service - Handles all API interactions with Open Library API
 * Using the API specified in the Take-Home Challenge PDF
 */

const API_BASE_URL = 'https://openlibrary.org';

/**
 * Transform Open Library API response to match our app structure
 * Open Library has different data structure than Google Books
 * 
 * @param {object} doc - Open Library book document
 * @returns {object} Normalized book object
 */
const transformOpenLibraryBook = (doc) => {
  return {
    id: doc.key || doc.cover_edition_key || Math.random().toString(),
    volumeInfo: {
      title: doc.title || 'Untitled',
      authors: doc.author_name || ['Unknown Author'],
      publishedDate: doc.first_publish_year ? doc.first_publish_year.toString() : 'N/A',
      description: doc.first_sentence ? doc.first_sentence.join(' ') : 'No description available',
      imageLinks: {
        thumbnail: doc.cover_i 
          ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
          : null,
        large: doc.cover_i 
          ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
          : null
      },
      pageCount: doc.number_of_pages_median || 'N/A',
      categories: doc.subject ? doc.subject.slice(0, 3) : ['General'],
      averageRating: doc.ratings_average || 0,
      ratingsCount: doc.ratings_count || 0,
      publisher: doc.publisher ? doc.publisher[0] : 'Unknown Publisher',
      language: doc.language ? doc.language[0] : 'en',
      isbn: doc.isbn ? doc.isbn[0] : null,
      previewLink: doc.key ? `https://openlibrary.org${doc.key}` : null
    }
  };
};

/**
 * Search for books using Open Library Search API
 * Endpoint: https://openlibrary.org/search.json?title={bookTitle}
 * 
 * @param {string} query - Search query (title, author, ISBN)
 * @param {number} startIndex - Pagination offset (Open Library uses 'page')
 * @param {number} maxResults - Number of results per page (Open Library uses 'limit')
 * @param {object} filters - Filter options (subject, language)
 * @returns {Promise<{books: Array, totalItems: number}>}
 */
export const searchBooks = async (query, startIndex = 0, maxResults = 12, filters = {}) => {
  try {
    // Build search query with default fallback
    let searchQuery = query && query.trim() !== '' ? query.trim() : 'bestseller';
    
    // Open Library uses 'page' instead of 'startIndex'
    const page = Math.floor(startIndex / maxResults) + 1;
    
    // Build URL parameters for Open Library API
    const params = new URLSearchParams({
      q: searchQuery,
      page: page.toString(),
      limit: maxResults.toString(),
      fields: 'key,title,author_name,first_publish_year,number_of_pages_median,cover_i,isbn,publisher,language,subject,ratings_average,ratings_count,first_sentence,cover_edition_key'
    });

    // Add subject filter if specified
    if (filters.subject && filters.subject !== 'all') {
      params.append('subject', filters.subject);
    }

    // Add language filter if specified
    if (filters.language && filters.language !== 'en') {
      params.append('language', filters.language);
    }

    const url = `${API_BASE_URL}/search.json?${params}`;
    console.log('🔍 Fetching from Open Library:', url);

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ Open Library Response:', data);
    
    // Transform Open Library format to our app format
    const transformedBooks = (data.docs || []).map(transformOpenLibraryBook);
    
    return {
      books: transformedBooks,
      totalItems: data.numFound || 0
    };
  } catch (error) {
    console.error('❌ Open Library API Error:', error);
    throw new Error(error.message || 'Failed to fetch books from Open Library. Please try again.');
  }
};

/**
 * Get detailed information for a specific book from Open Library
 * Uses the Works API: https://openlibrary.org/works/{id}.json
 * 
 * @param {string} bookId - Book key (e.g., "/works/OL45804W")
 * @returns {Promise<object>} Book details
 */
export const getBookDetails = async (bookId) => {
  try {
    // Clean the book ID (remove leading slash if present)
    const cleanId = bookId.startsWith('/') ? bookId : `/${bookId}`;
    
    // Fetch work details
    const workResponse = await fetch(`${API_BASE_URL}${cleanId}.json`);
    
    if (!workResponse.ok) {
      throw new Error('Failed to fetch book details from Open Library');
    }
    
    const workData = await workResponse.json();
    
    // Fetch additional edition details if available
    let editionData = null;
    if (workData.covers && workData.covers[0]) {
      // We have cover info, that's good enough
    }
    
    // Transform the detailed data
    return {
      id: workData.key,
      volumeInfo: {
        title: workData.title || 'Untitled',
        authors: workData.authors 
          ? await Promise.all(workData.authors.map(async (author) => {
              try {
                const authorResponse = await fetch(`${API_BASE_URL}${author.author.key}.json`);
                const authorData = await authorResponse.json();
                return authorData.name || 'Unknown Author';
              } catch {
                return 'Unknown Author';
              }
            }))
          : ['Unknown Author'],
        publishedDate: workData.first_publish_date || 'N/A',
        description: typeof workData.description === 'string' 
          ? workData.description 
          : workData.description?.value || 'No description available',
        imageLinks: {
          thumbnail: workData.covers && workData.covers[0]
            ? `https://covers.openlibrary.org/b/id/${workData.covers[0]}-M.jpg`
            : null,
          large: workData.covers && workData.covers[0]
            ? `https://covers.openlibrary.org/b/id/${workData.covers[0]}-L.jpg`
            : null
        },
        pageCount: 'N/A', // Not available in works API
        categories: workData.subjects ? workData.subjects.slice(0, 5) : ['General'],
        averageRating: 0, // Open Library doesn't provide ratings in works API
        ratingsCount: 0,
        publisher: 'Various Publishers',
        language: 'en',
        previewLink: `https://openlibrary.org${workData.key}`
      }
    };
  } catch (error) {
    console.error('❌ Book details error:', error);
    throw new Error(error.message || 'Failed to load book details from Open Library');
  }
};

/**
 * Search books by author
 * Open Library specific endpoint
 * 
 * @param {string} authorName - Author name to search
 * @param {number} limit - Number of results
 * @returns {Promise<Array>} List of books by author
 */
export const searchByAuthor = async (authorName, limit = 12) => {
  try {
    const params = new URLSearchParams({
      author: authorName,
      limit: limit.toString()
    });

    const response = await fetch(`${API_BASE_URL}/search.json?${params}`);
    const data = await response.json();
    
    return (data.docs || []).map(transformOpenLibraryBook);
  } catch (error) {
    console.error('Error searching by author:', error);
    return [];
  }
};

/**
 * Search books by ISBN
 * Open Library specific endpoint
 * 
 * @param {string} isbn - ISBN number (10 or 13 digits)
 * @returns {Promise<object|null>} Book details or null
 */
export const searchByISBN = async (isbn) => {
  try {
    const response = await fetch(`${API_BASE_URL}/isbn/${isbn}.json`);
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    
    return {
      id: data.key,
      volumeInfo: {
        title: data.title || 'Untitled',
        authors: data.authors ? data.authors.map(a => a.name || 'Unknown') : ['Unknown Author'],
        publishedDate: data.publish_date || 'N/A',
        description: data.description || 'No description available',
        imageLinks: {
          thumbnail: data.covers && data.covers[0]
            ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg`
            : null
        },
        publisher: data.publishers ? data.publishers[0] : 'Unknown',
        pageCount: data.number_of_pages || 'N/A',
        isbn: isbn,
        previewLink: `https://openlibrary.org${data.key}`
      }
    };
  } catch (error) {
    console.error('Error searching by ISBN:', error);
    return null;
  }
};