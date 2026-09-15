#!/usr/bin/env node
/**
 * Cover-art optimization pipeline (perf brief Phases 1-4/23).
 *
 * For every public/covers/*.png we emit WebP + AVIF derivatives at the widths
 * the art actually renders at (queue thumb ≈56px, gallery/language tile
 * ≈300px, phone now-playing art ≤512px) plus a 2x retina tier. The PNG files
 * are left untouched (kept as the universal fallback), derivatives sit next
 * to them so the existing /covers/*.png paths keep working.
 *
 * Derivative naming is explicit, not opaque:  <name>-<width>w.webp / .avif
 */
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises'
import { join, basename, extname } from 'node:path'

import sharp from 'sharp'

const ROOT = process.cwd()
const COVERS_DIR = join(ROOT, 'public', 'covers')

/** Render tiers ×2 retina. Queue thumb 56px, gallery/language tile ~300px, phone art ≤512. */
const WIDTHS = [160, 320, 640]
const FORMATS = [
  { codec: 'webp', ext: 'webp', opt: { quality: 80, effort: 6 } },
  { codec: 'avif', ext: 'avif', opt: { quality: 55, effort: 5 } },
]

const report = []
let totalSrc = 0
let totalWebp = 0
let totalAvif = 0
let totalFiles = 0

await mkdir(COVERS_DIR, { recursive: true })
const pngs = (await readdir(COVERS_DIR)).filter((f) => f.toLowerCase().endsWith('.png'))

for (const file of pngs) {
  const src = join(COVERS_DIR, file)
  const name = basename(file, extname(file))
  const info = await stat(src)
  const srcKb = Math.round(info.size / 1024)
  totalSrc += srcKb
  totalFiles += 1

  for (const width of WIDTHS) {
    for (const { codec, ext, opt } of FORMATS) {
      const out = join(COVERS_DIR, `${name}-${width}w.${ext}`)
      await sharp(src)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .toFormat(codec, opt)
        .toFile(out)
      const o = await stat(out)
      const kb = Math.round(o.size / 1024)
      if (ext === 'webp') totalWebp += kb
      else totalAvif += kb
      report.push({ file: basename(out), kind: `${ext}-${width}w`, kb })
    }
  }
}

report.sort((a, b) => b.kb - a.kb)
console.log('\nDerivatives:')
for (const r of report) console.log(`  ${r.file.padEnd(46)} ${String(r.kb).padStart(5)} KB`)

console.log('\nTotals (' + totalFiles + ' covers):')
console.log(`  PNG source   : ${(totalSrc / 1024).toFixed(2)} MB (${totalSrc} KB)`)
console.log(`  WebP set     : ${(totalWebp / 1024).toFixed(2)} MB (${totalWebp} KB) — ${(totalWebp / 3).toFixed(0)} KB per tier`)
console.log(`  AVIF set     : ${(totalAvif / 1024).toFixed(2)} MB (${totalAvif} KB) — ${(totalAvif / 3).toFixed(0)} KB per tier`)
console.log(`  WebP vs PNG  : ${((1 - totalWebp / 3 / totalSrc) * 100).toFixed(1)}% smaller (single best tier loaded)`)
console.log(`  AVIF vs PNG  : ${((1 - totalAvif / 3 / totalSrc) * 100).toFixed(1)}% smaller (single best tier loaded)`)

await writeFile(
  join(ROOT, 'covers-opt-report.json'),
  JSON.stringify(
    {
      totalPngKb: totalSrc,
      totalWebpKb: totalWebp,
      totalAvifKb: totalAvif,
      perTierWebpKb: Math.round(totalWebp / 3),
      perTierAvifKb: Math.round(totalAvif / 3),
      widths: WIDTHS,
      files: report,
    },
    null,
    2,
  ),
)
console.log('\nWrote covers-opt-report.json')
