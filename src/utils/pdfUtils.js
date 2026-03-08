import * as pdfjsLib from 'pdfjs-dist'

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`

export { pdfjsLib }

export async function loadPDF(url) {
  const loadingTask = pdfjsLib.getDocument({
    url,
    cMapUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/cmaps/`,
    cMapPacked: true,
  })
  return await loadingTask.promise
}

/**
 * Render a PDF page onto a canvas element.
 * Returns the render task so callers can cancel it.
 *
 * @param {PDFPageProxy} page
 * @param {HTMLCanvasElement} canvas
 * @param {number} scaleMultiplier - user zoom (1 = fit container width)
 * @param {number} containerWidth  - container width in CSS pixels
 * @returns {PDFRenderTask}
 */
export function renderPage(page, canvas, scaleMultiplier = 1, containerWidth = 0) {
  const dpr = window.devicePixelRatio || 1
  const naturalViewport = page.getViewport({ scale: 1 })

  const fitScale = containerWidth > 0 ? containerWidth / naturalViewport.width : 1
  const finalScale = fitScale * scaleMultiplier * dpr

  const viewport = page.getViewport({ scale: finalScale })

  // Pixel dimensions of the backing store
  canvas.width = Math.floor(viewport.width)
  canvas.height = Math.floor(viewport.height)

  // CSS display size = backing store / dpr → crisp on all screens
  const cssWidth = Math.floor(viewport.width / dpr)
  const cssHeight = Math.floor(viewport.height / dpr)
  canvas.style.width = `${cssWidth}px`
  canvas.style.height = `${cssHeight}px`

  const ctx = canvas.getContext('2d')
  // Return the task — caller awaits .promise and can call .cancel()
  return page.render({ canvasContext: ctx, viewport })
}
