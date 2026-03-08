// ============================================================
// QURAN DATA SERVICE
// ============================================================
// Fetches Quran text + tafsir from /public/data/ (static JSON).
// Data was downloaded via: node scripts/download-quran-data.mjs
//
// To add a new tafsir collection:
// 1. Add its slug to the collection in mockData.js as `dataSlug`
// 2. Download its data into public/data/tafsir/{dataSlug}/
// 3. Everything else works automatically
// ============================================================

// Simple in-memory cache to avoid re-fetching same surah
const cache = new Map()

async function fetchCached(url) {
  if (cache.has(url)) return cache.get(url)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  const data = await res.json()
  cache.set(url, data)
  return data
}

/**
 * Get all surah metadata (name, transliteration, type, verse count)
 * @returns {Promise<Array>}
 */
export async function getAllSurahs() {
  return fetchCached('/data/quran/quran_en.json')
}

/**
 * Get a single surah with all its ayahs + translations
 * @param {number} surahNumber - 1 to 114
 * @returns {Promise<{id, name, transliteration, translation, type, total_verses, verses: Array}>}
 */
export async function getSurah(surahNumber) {
  return fetchCached(`/data/quran/${surahNumber}.json`)
}

/**
 * Get Ibn Kathir tafsir for an entire surah
 * Returns a map: { ayahNumber: tafsirText }
 * @param {number} surahNumber - 1 to 114
 * @param {string} dataSlug - tafsir folder slug (default: 'ibn-kathir')
 * @returns {Promise<Record<string, string>>}
 */
export async function getSurahTafsir(surahNumber, dataSlug = 'ibn-kathir') {
  return fetchCached(`/data/tafsir/${dataSlug}/${surahNumber}.json`)
}

/**
 * Get tafsir for a single ayah
 * @param {number} surahNumber
 * @param {number} ayahNumber
 * @param {string} dataSlug
 * @returns {Promise<string|null>}
 */
export async function getAyahTafsir(surahNumber, ayahNumber, dataSlug = 'ibn-kathir') {
  const map = await getSurahTafsir(surahNumber, dataSlug)
  return map[ayahNumber] || map[String(ayahNumber)] || null
}
