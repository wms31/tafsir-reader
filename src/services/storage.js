// ============================================================
// LOCAL STORAGE ABSTRACTION
// ============================================================
// Thin wrapper around localStorage with JSON parsing.
// All app data uses this so we can swap to AsyncStorage
// (React Native) or IndexedDB later if needed.
// ============================================================

const PREFIX = 'tafsir_'

export const storage = {
  get(key) {
    try {
      const item = localStorage.getItem(PREFIX + key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  },

  remove(key) {
    localStorage.removeItem(PREFIX + key)
  },

  clear() {
    Object.keys(localStorage)
      .filter(k => k.startsWith(PREFIX))
      .forEach(k => localStorage.removeItem(k))
  },
}
