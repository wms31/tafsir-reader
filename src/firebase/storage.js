// ============================================================
// FIREBASE STORAGE HELPERS
// ============================================================
// Use these to get download URLs for PDFs stored in Firebase Storage.
// Upload PDFs in Firebase Console under Storage, then use getPdfUrl()
// to generate the URL to put in mockData.js pdfUrl fields.
// ============================================================

import { storage } from './config'
import { ref, getDownloadURL, listAll } from 'firebase/storage'

/**
 * Get a download URL for a PDF in Firebase Storage
 * @param {string} path - e.g., 'tafsir-ibn-kathir/volume-1.pdf'
 * @returns {Promise<string>} download URL
 */
export async function getPdfUrl(path) {
  const storageRef = ref(storage, path)
  return await getDownloadURL(storageRef)
}

/**
 * List all files in a storage folder
 * @param {string} folderPath - e.g., 'tafsir-ibn-kathir/'
 * @returns {Promise<import('firebase/storage').StorageReference[]>}
 */
export async function listPdfs(folderPath) {
  const folderRef = ref(storage, folderPath)
  const result = await listAll(folderRef)
  return result.items
}
