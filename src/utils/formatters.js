/**
 * Format a timestamp to relative time (e.g., "2 days ago")
 * @param {number} timestamp - Unix timestamp in milliseconds
 * @returns {string}
 */
export function timeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)
  if (seconds < 60) return 'Just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  const weeks = Math.floor(days / 7)
  if (weeks < 4) return `${weeks}w ago`
  return new Date(timestamp).toLocaleDateString()
}

/**
 * Calculate reading progress as a percentage
 * @param {number} currentPage
 * @param {number} totalPages
 * @returns {number} 0–100
 */
export function progressPercent(currentPage, totalPages) {
  if (!totalPages || totalPages === 0) return 0
  return Math.round((currentPage / totalPages) * 100)
}

/**
 * Format page display string
 * @param {number} current
 * @param {number} total
 * @returns {string}
 */
export function formatPage(current, total) {
  return `Page ${current} of ${total}`
}
