// ============================================================
// TAFSIR DATA — Tafsir Ibn Kathir
// ============================================================
// PDF hosting: Cloudflare R2 (free tier)
//
// TO PLUG IN YOUR R2 URLs:
// 1. Create a Cloudflare account at cloudflare.com
// 2. Go to R2 → Create bucket (e.g. "tafsir-pdfs")
// 3. Upload all 10 PDFs from the /PDFs folder
// 4. Enable "Public access" on the bucket
// 5. Replace CLOUDFLARE_R2_BASE_URL below with your bucket's public URL
//    It looks like: https://pub-xxxxxxxxxxxxxxxx.r2.dev
// 6. That's it — all pdfUrl fields are built from it automatically
//
// TO ADD A SECOND TAFSIR COLLECTION:
// 1. Add a new object to COLLECTIONS array
// 2. Add its books to BOOKS array with the new collectionId
// 3. No other changes needed — the app auto-adapts
// ============================================================

const PDF_BASE_URL = 'https://pub-9f45c5d5f3f54015aba1fe51f644095b.r2.dev'

function r2Url(filename) {
  return `${PDF_BASE_URL}/${filename}`
}

/** @type {import('../types/index.js').TafsirCollection[]} */
export const COLLECTIONS = [
  {
    id: 'tafsir-ibn-kathir',
    name: 'Tafsir Ibn Kathir',
    slug: 'tafsir-ibn-kathir',
    description:
      'The most widely read Tafsir in the world. Written by Imam Ibn Kathir (rahimahullah), it is known for its reliance on the Quran and authentic Hadith to explain the meanings of the Quran.',
    language: 'en',
    scholar: 'Imam Ibn Kathir',
    coverImage: null,
    isActive: true,
    displayOrder: 1,
    totalVolumes: 10,
    tags: ['quran', 'tafsir', 'ibn kathir', 'classical', 'hadith-based'],
  },
  {
    id: 'maariful-quran',
    name: 'Maariful Quran',
    slug: 'maariful-quran',
    description:
      'A comprehensive Tafsir by Mufti Muhammad Shafi Usmani, covering the meanings and wisdom of the Quran in a clear and accessible manner.',
    language: 'en',
    scholar: 'Mufti Muhammad Shafi Usmani',
    coverImage: null,
    isActive: false, // Set to true when PDFs are ready
    displayOrder: 2,
    totalVolumes: 8,
    tags: ['quran', 'tafsir', 'maariful', 'deobandi', 'hanafi'],
  },
]

/** @type {import('../types/index.js').TafsirBook[]} */
export const BOOKS = [
  {
    id: 'ibn-kathir-vol-1',
    collectionId: 'tafsir-ibn-kathir',
    title: 'Volume 1',
    volumeNumber: 1,
    pdfUrl: r2Url('Tafsir_Ibn_Kathir_Vol._1.pdf'),
    pdfFileName: 'Tafsir_Ibn_Kathir_Vol._1.pdf',
    totalPages: 696,
    coverImage: null,
    author: 'Imam Ibn Kathir',
    language: 'en',
    tags: ['al-fatihah', 'al-baqarah', 'volume-1'],
    displayOrder: 1,
    isActive: true,
    surahRange: 'Al-Fatihah (1) — Al-Baqarah (2)',
    surahStart: 1,
    surahEnd: 2,
  },
  {
    id: 'ibn-kathir-vol-2',
    collectionId: 'tafsir-ibn-kathir',
    title: 'Volume 2',
    volumeNumber: 2,
    pdfUrl: r2Url('Tafsir_Ibn_Kathir_Vol._2.pdf'),
    pdfFileName: 'Tafsir_Ibn_Kathir_Vol._2.pdf',
    totalPages: 624,
    coverImage: null,
    author: 'Imam Ibn Kathir',
    language: 'en',
    tags: ['al-baqarah', 'al-imran', 'an-nisa', 'volume-2'],
    displayOrder: 2,
    isActive: true,
    surahRange: "Al-Baqarah (2) cont. — An-Nisa' (4)",
    surahStart: 2,
    surahEnd: 4,
  },
  {
    id: 'ibn-kathir-vol-3',
    collectionId: 'tafsir-ibn-kathir',
    title: 'Volume 3',
    volumeNumber: 3,
    pdfUrl: r2Url('Tafsir_Ibn_Kathir_Vol._3.pdf'),
    pdfFileName: 'Tafsir_Ibn_Kathir_Vol._3.pdf',
    totalPages: 550,
    coverImage: null,
    author: 'Imam Ibn Kathir',
    language: 'en',
    tags: ['al-maidah', 'al-anam', 'al-araf', 'al-anfal', 'at-tawbah', 'volume-3'],
    displayOrder: 3,
    isActive: true,
    surahRange: 'Al-Maidah (5) — At-Tawbah (9)',
    surahStart: 5,
    surahEnd: 9,
  },
  {
    id: 'ibn-kathir-vol-4',
    collectionId: 'tafsir-ibn-kathir',
    title: 'Volume 4',
    volumeNumber: 4,
    pdfUrl: r2Url('Tafsir_Ibn_Kathir_Vol._4.pdf'),
    pdfFileName: 'Tafsir_Ibn_Kathir_Vol._4.pdf',
    totalPages: 668,
    coverImage: null,
    author: 'Imam Ibn Kathir',
    language: 'en',
    tags: ['yunus', 'hud', 'yusuf', 'ar-rad', 'ibrahim', 'al-hijr', 'an-nahl', 'al-isra', 'volume-4'],
    displayOrder: 4,
    isActive: true,
    surahRange: 'Yunus (10) — Al-Isra (17)',
    surahStart: 10,
    surahEnd: 17,
  },
  {
    id: 'ibn-kathir-vol-5',
    collectionId: 'tafsir-ibn-kathir',
    title: 'Volume 5',
    volumeNumber: 5,
    pdfUrl: r2Url('Tafsir_Ibn_Kathir_Vol._5.pdf'),
    pdfFileName: 'Tafsir_Ibn_Kathir_Vol._5.pdf',
    totalPages: 626,
    coverImage: null,
    author: 'Imam Ibn Kathir',
    language: 'en',
    tags: ['al-kahf', 'maryam', 'ta-ha', 'al-anbiya', 'al-hajj', 'al-muminun', 'volume-5'],
    displayOrder: 5,
    isActive: true,
    surahRange: 'Al-Kahf (18) — Al-Muminun (23)',
    surahStart: 18,
    surahEnd: 23,
  },
  {
    id: 'ibn-kathir-vol-6',
    collectionId: 'tafsir-ibn-kathir',
    title: 'Volume 6',
    volumeNumber: 6,
    pdfUrl: r2Url('Tafsir_Ibn_Kathir_Vol._6.pdf'),
    pdfFileName: 'Tafsir_Ibn_Kathir_Vol._6.pdf',
    totalPages: 704,
    coverImage: null,
    author: 'Imam Ibn Kathir',
    language: 'en',
    tags: ['an-nur', 'al-furqan', 'ash-shuara', 'an-naml', 'al-qasas', 'al-ankabut', 'volume-6'],
    displayOrder: 6,
    isActive: true,
    surahRange: 'An-Nur (24) — Al-Ahzab (33)',
    surahStart: 24,
    surahEnd: 33,
  },
  {
    id: 'ibn-kathir-vol-7',
    collectionId: 'tafsir-ibn-kathir',
    title: 'Volume 7',
    volumeNumber: 7,
    pdfUrl: r2Url('Tafsir_Ibn_Kathir_Vol._7.pdf'),
    pdfFileName: 'Tafsir_Ibn_Kathir_Vol._7.pdf',
    totalPages: 720,
    coverImage: null,
    author: 'Imam Ibn Kathir',
    language: 'en',
    tags: ['saba', 'fatir', 'ya-sin', 'as-saffat', 'sad', 'az-zumar', 'volume-7'],
    displayOrder: 7,
    isActive: true,
    surahRange: "Saba' (34) — Az-Zumar (39)",
    surahStart: 34,
    surahEnd: 39,
  },
  {
    id: 'ibn-kathir-vol-8',
    collectionId: 'tafsir-ibn-kathir',
    title: 'Volume 8',
    volumeNumber: 8,
    pdfUrl: r2Url('Tafsir_Ibn_Kathir_Vol._8.pdf'),
    pdfFileName: 'Tafsir_Ibn_Kathir_Vol._8.pdf',
    totalPages: 694,
    coverImage: null,
    author: 'Imam Ibn Kathir',
    language: 'en',
    tags: ['ghafir', 'fussilat', 'ash-shura', 'az-zukhruf', 'ad-dukhan', 'al-jathiyah', 'volume-8'],
    displayOrder: 8,
    isActive: true,
    surahRange: 'Ghafir (40) — Al-Fath (48)',
    surahStart: 40,
    surahEnd: 48,
  },
  {
    id: 'ibn-kathir-vol-9',
    collectionId: 'tafsir-ibn-kathir',
    title: 'Volume 9',
    volumeNumber: 9,
    pdfUrl: r2Url('Tafsir_Ibn_Kathir_Vol._9.pdf'),
    pdfFileName: 'Tafsir_Ibn_Kathir_Vol._9.pdf',
    totalPages: 662,
    coverImage: null,
    author: 'Imam Ibn Kathir',
    language: 'en',
    tags: ['al-hujurat', 'qaf', 'adh-dhariyat', 'at-tur', 'an-najm', 'al-qamar', 'volume-9'],
    displayOrder: 9,
    isActive: true,
    surahRange: 'Al-Hujurat (49) — Al-Mursalat (77)',
    surahStart: 49,
    surahEnd: 77,
  },
  {
    id: 'ibn-kathir-vol-10',
    collectionId: 'tafsir-ibn-kathir',
    title: 'Volume 10',
    volumeNumber: 10,
    pdfUrl: r2Url('Tafsir_Ibn_Kathir_Vol._10.pdf'),
    pdfFileName: 'Tafsir_Ibn_Kathir_Vol._10.pdf',
    totalPages: 666,
    coverImage: null,
    author: 'Imam Ibn Kathir',
    language: 'en',
    tags: ['an-naba', 'an-naziat', 'abasa', 'at-takwir', 'al-infitar', 'al-falaq', 'an-nas', 'volume-10'],
    displayOrder: 10,
    isActive: true,
    surahRange: "An-Naba' (78) — An-Nas (114)",
    surahStart: 78,
    surahEnd: 114,
  },
]

/** Get collection by ID */
export function getCollection(id) {
  return COLLECTIONS.find(c => c.id === id) || null
}

/** Get books by collection ID (active only, sorted by displayOrder) */
export function getBooksByCollection(collectionId) {
  return BOOKS.filter(b => b.collectionId === collectionId && b.isActive).sort(
    (a, b) => a.displayOrder - b.displayOrder
  )
}

/** Get a single book by ID */
export function getBook(bookId) {
  return BOOKS.find(b => b.id === bookId) || null
}

/** Get active collections sorted by displayOrder */
export function getActiveCollections() {
  return COLLECTIONS.filter(c => c.isActive).sort((a, b) => a.displayOrder - b.displayOrder)
}
