// ============================================================
// PROGRESS SERVICE — localStorage MVP
// ============================================================
// TO SWITCH TO FIRESTORE:
// 1. Import functions from '../firebase/firestore.js'
// 2. Replace each function body with the Firestore equivalent
// 3. Pass userId as first argument (from auth context)
// ============================================================

import { storage } from './storage'

const PROGRESS_KEY = 'reading_progress'

/**
 * Save reading progress for a book
 * @param {string} bookId
 * @param {string} collectionId
 * @param {number} currentPage
 * @param {number} totalPages
 * @param {string} bookTitle
 * @param {string} collectionName
 */
export function saveProgress(bookId, collectionId, currentPage, totalPages, bookTitle, collectionName) {
  const all = storage.get(PROGRESS_KEY) || {}
  all[bookId] = {
    bookId,
    collectionId,
    currentPage,
    totalPages,
    bookTitle,
    collectionName,
    lastRead: Date.now(),
  }
  storage.set(PROGRESS_KEY, all)
}

/**
 * Get progress for a specific book
 * @param {string} bookId
 * @returns {import('../types/index.js').ReadingProgress | null}
 */
export function getProgress(bookId) {
  const all = storage.get(PROGRESS_KEY) || {}
  return all[bookId] || null
}

/**
 * Get all progress records sorted by lastRead (most recent first)
 * @returns {import('../types/index.js').ReadingProgress[]}
 */
export function getAllProgress() {
  const all = storage.get(PROGRESS_KEY) || {}
  return Object.values(all).sort((a, b) => b.lastRead - a.lastRead)
}

/**
 * Remove progress for a book
 * @param {string} bookId
 */
export function clearProgress(bookId) {
  const all = storage.get(PROGRESS_KEY) || {}
  delete all[bookId]
  storage.set(PROGRESS_KEY, all)
}
