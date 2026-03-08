/**
 * Downloads Quran text + Ibn Kathir tafsir JSON into public/data/
 * Run once: node scripts/download-quran-data.mjs
 *
 * Sources:
 *   Quran text + metadata: github.com/risan/quran-json  (dist/quran_en.json)
 *   Tafsir text:           github.com/spa5k/tafsir_api
 */

import { mkdir, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const QURAN_EN_URL = 'https://raw.githubusercontent.com/risan/quran-json/main/dist/quran_en.json'
const TAFSIR_BASE  = 'https://raw.githubusercontent.com/spa5k/tafsir_api/main/tafsir/en-tafisr-ibn-kathir'

async function fetchJSON(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`)
  return res.json()
}

async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try { return await fetchJSON(url) }
    catch (e) {
      if (i === retries - 1) throw e
      await new Promise(r => setTimeout(r, 800 * (i + 1)))
    }
  }
}

async function ensureDir(p) {
  if (!existsSync(p)) await mkdir(p, { recursive: true })
}

async function main() {
  const quranDir  = join(ROOT, 'public', 'data', 'quran')
  const tafsirDir = join(ROOT, 'public', 'data', 'tafsir', 'ibn-kathir')

  await ensureDir(quranDir)
  await ensureDir(tafsirDir)

  // ── 1. Download full Quran (all surahs + translations in one file) ───
  console.log('\n📖 Downloading full Quran text...')
  const quranAllPath = join(quranDir, 'quran_en.json')
  if (!existsSync(quranAllPath)) {
    const quranAll = await fetchWithRetry(QURAN_EN_URL)
    await writeFile(quranAllPath, JSON.stringify(quranAll))
    console.log(`  ✓ quran_en.json (${quranAll.length} surahs)`)

    // Also split into per-surah files for efficient loading
    for (const surah of quranAll) {
      await writeFile(
        join(quranDir, `${surah.id}.json`),
        JSON.stringify(surah)
      )
    }
    console.log('  ✓ Split into 114 per-surah files')
  } else {
    console.log('  ✓ Already downloaded (skipping)')
  }

  // ── 2. Download Ibn Kathir tafsir per surah ──────────────────────────
  console.log('\n📚 Downloading Ibn Kathir tafsir...')
  let ok = 0, fail = 0, skipped = 0

  for (let i = 1; i <= 114; i++) {
    const outPath = join(tafsirDir, `${i}.json`)
    if (existsSync(outPath)) { process.stdout.write('.'); skipped++; continue }

    try {
      const raw = await fetchWithRetry(`${TAFSIR_BASE}/${i}.json`)
      // Flatten to { ayahNumber: text } map for fast lookup
      const map = {}
      for (const item of (raw.ayahs || [])) {
        map[item.ayah] = item.text
      }
      await writeFile(outPath, JSON.stringify(map))
      process.stdout.write('✓')
      ok++
    } catch (e) {
      process.stdout.write('✗')
      fail++
    }
    await new Promise(r => setTimeout(r, 60))
  }

  console.log(`\n  Downloaded: ${ok}, Skipped: ${skipped}, Failed: ${fail}`)

  if (fail > 0) {
    console.warn(`\n⚠️  ${fail} surahs failed. Re-run the script to retry.`)
  } else {
    console.log('\n✅ All data downloaded successfully!')
  }

  console.log('\nOutput:')
  console.log('  public/data/quran/quran_en.json            — full Quran')
  console.log('  public/data/quran/{1-114}.json             — per-surah ayahs')
  console.log('  public/data/tafsir/ibn-kathir/{1-114}.json — tafsir per surah\n')
}

main().catch(e => { console.error('\n❌', e.message); process.exit(1) })
