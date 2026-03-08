/**
 * PWA Icon Generator
 * Converts favicon.svg into required PNG sizes using sharp
 *
 * Usage:
 *   node generate-icons.mjs
 *
 * Requires: npm install sharp --save-dev (one-time only)
 */

import { readFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const SIZES = [
  { size: 192, name: 'icon-192x192.png' },
  { size: 512, name: 'icon-512x512.png' },
  { size: 180, name: 'apple-touch-icon.png' },  // iOS Safari
  { size: 32,  name: 'favicon-32x32.png' },
  { size: 16,  name: 'favicon-16x16.png' },
]

async function generateIcons() {
  // Dynamically import sharp (installed separately)
  let sharp
  try {
    sharp = (await import('sharp')).default
  } catch {
    console.error('\n❌  sharp is not installed. Run:\n')
    console.error('   npm install sharp --save-dev\n')
    console.error('Then run this script again:\n')
    console.error('   node generate-icons.mjs\n')
    process.exit(1)
  }

  const svgPath = join(__dirname, 'public', 'favicon.svg')
  const svgBuffer = readFileSync(svgPath)
  const outDir = join(__dirname, 'public', 'icons')

  mkdirSync(outDir, { recursive: true })

  console.log('🎨 Generating PWA icons from favicon.svg...\n')

  for (const { size, name } of SIZES) {
    const outPath = join(size <= 32 ? join(__dirname, 'public') : outDir, name)
    await sharp(svgBuffer)
      .resize(size, size)
      .png({ quality: 100 })
      .toFile(outPath)
    console.log(`  ✓  ${name} (${size}×${size})`)
  }

  console.log('\n✅  All icons generated successfully!')
  console.log('\nFiles created:')
  console.log('  public/icons/icon-192x192.png   ← PWA icon')
  console.log('  public/icons/icon-512x512.png   ← PWA icon (large)')
  console.log('  public/icons/apple-touch-icon.png ← iOS home screen')
  console.log('  public/favicon-32x32.png         ← Browser tab')
  console.log('  public/favicon-16x16.png         ← Browser tab (small)')
}

generateIcons()
