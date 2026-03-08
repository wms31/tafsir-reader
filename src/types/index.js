/**
 * @typedef {Object} TafsirCollection
 * @property {string} id - Unique identifier (slug)
 * @property {string} name - Display name
 * @property {string} slug - URL-friendly identifier
 * @property {string} description - Short description
 * @property {string} language - Language code ('en', 'ar', 'ur')
 * @property {string} [coverImage] - Cover image URL
 * @property {boolean} isActive - Whether available to users
 * @property {number} displayOrder - Order on home screen
 * @property {string} [scholar] - Scholar name
 * @property {number} totalVolumes - Number of volumes
 * @property {string[]} [tags] - Searchable tags
 */

/**
 * @typedef {Object} TafsirBook
 * @property {string} id - Unique identifier
 * @property {string} collectionId - Parent collection ID
 * @property {string} title - Volume title
 * @property {number} volumeNumber - Volume number
 * @property {string} pdfUrl - Direct URL to PDF (Firebase Storage or external)
 * @property {string} pdfFileName - Filename for display
 * @property {number} totalPages - Total pages in PDF
 * @property {string} [coverImage] - Cover image URL
 * @property {string} author - Author name
 * @property {string} language - Language code
 * @property {string[]} [tags] - Searchable tags
 * @property {number} displayOrder - Order in collection
 * @property {boolean} isActive - Whether available
 * @property {string} [surahRange] - Human-readable surah range
 * @property {number} [surahStart] - First surah number
 * @property {number} [surahEnd] - Last surah number
 */

/**
 * @typedef {Object} ReadingProgress
 * @property {string} bookId - Book identifier
 * @property {string} collectionId - Collection identifier
 * @property {number} currentPage - Current page number
 * @property {number} totalPages - Total pages
 * @property {number} lastRead - Timestamp (ms)
 * @property {string} bookTitle - For display
 * @property {string} collectionName - For display
 */

/**
 * @typedef {Object} Bookmark
 * @property {string} id - Unique identifier
 * @property {string} bookId - Book identifier
 * @property {string} collectionId - Collection identifier
 * @property {number} page - Bookmarked page number
 * @property {string} bookTitle - For display
 * @property {string} collectionName - For display
 * @property {string} [note] - Optional user note
 * @property {number} createdAt - Timestamp (ms)
 */

export {} // Make this a module
