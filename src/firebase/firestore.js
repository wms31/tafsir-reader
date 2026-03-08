// ============================================================
// FIRESTORE SERVICE LAYER
// ============================================================
// These functions are ready to use once Firebase is configured.
// Currently the app uses localStorage (services/progressService.js).
// Switch to these by updating the hooks to import from here.
// ============================================================

import { db } from './config'
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore'

// ---- Progress ----

/**
 * Save reading progress to Firestore
 * @param {string} userId
 * @param {string} bookId
 * @param {Object} progress - { currentPage, totalPages, bookTitle, collectionId, collectionName }
 */
export async function saveProgressFirestore(userId, bookId, progress) {
  const ref = doc(db, 'users', userId, 'progress', bookId)
  await setDoc(
    ref,
    {
      ...progress,
      bookId,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  )
}

/**
 * Get reading progress from Firestore
 * @param {string} userId
 * @param {string} bookId
 * @returns {Promise<Object|null>}
 */
export async function getProgressFirestore(userId, bookId) {
  const ref = doc(db, 'users', userId, 'progress', bookId)
  const snap = await getDoc(ref)
  return snap.exists() ? snap.data() : null
}

/**
 * Get all progress records for a user (for "continue reading")
 * @param {string} userId
 * @returns {Promise<Object[]>}
 */
export async function getAllProgressFirestore(userId) {
  const ref = collection(db, 'users', userId, 'progress')
  const snap = await getDocs(ref)
  return snap.docs.map(d => d.data())
}

// ---- Bookmarks ----

/**
 * Add bookmark to Firestore
 * @param {string} userId
 * @param {Object} bookmark - { bookId, collectionId, page, bookTitle, collectionName, note }
 * @returns {Promise<string>} bookmark ID
 */
export async function addBookmarkFirestore(userId, bookmark) {
  const id = `${bookmark.bookId}_page_${bookmark.page}`
  const ref = doc(db, 'users', userId, 'bookmarks', id)
  await setDoc(ref, {
    ...bookmark,
    id,
    createdAt: serverTimestamp(),
  })
  return id
}

/**
 * Remove bookmark from Firestore
 * @param {string} userId
 * @param {string} bookmarkId
 */
export async function removeBookmarkFirestore(userId, bookmarkId) {
  const ref = doc(db, 'users', userId, 'bookmarks', bookmarkId)
  await deleteDoc(ref)
}

/**
 * Get all bookmarks for a user
 * @param {string} userId
 * @returns {Promise<Object[]>}
 */
export async function getBookmarksFirestore(userId) {
  const ref = collection(db, 'users', userId, 'bookmarks')
  const snap = await getDocs(ref)
  return snap.docs.map(d => d.data())
}
