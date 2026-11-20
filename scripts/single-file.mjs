// Turns an offline Vite build (`vite build --mode offline`) into a site that opens by double-clicking.
//
//   node scripts/single-file.mjs <build-folder> single <output.html>
//     ONE self-contained HTML file: JS, CSS, fonts, images and videos all embedded.
//
//   node scripts/single-file.mjs <build-folder> folder <output-folder>
//     index.html (JS, CSS and fonts embedded) next to the img/ and video/ folders it uses.
import fs from 'node:fs'
import path from 'node:path'

const [dir, kind, out] = process.argv.slice(2)
if (!dir || !['single', 'folder'].includes(kind) || !out) {
  console.error('Usage: node scripts/single-file.mjs <build-folder> single|folder <output>')
  process.exit(1)
}

const MIME = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.woff2': 'font/woff2', '.woff': 'font/woff' }
const dataUri = (file) => {
  const type = MIME[path.extname(file).toLowerCase()]
  if (!type) throw new Error(`No MIME type for ${file}`)
  return `data:${type};base64,${fs.readFileSync(file).toString('base64')}`
}

let html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8')

// CSS: inline it with fonts embedded (browsers block font files loaded from disk). Keep woff2 only.
html = html.replace(/<link rel="stylesheet"[^>]*href="\.\/([^"]+)"[^>]*>/, (_, href) => {
  const cssPath = path.join(dir, href)
  let css = fs.readFileSync(cssPath, 'utf8')
  css = css.replace(/,\s*url\(\.\/[^)]+\.woff\) format\("woff"\)/g, '')
  css = css.replace(/url\(\.\/([^)]+)\)/g, (_, f) => `url(${dataUri(path.join(path.dirname(cssPath), f))})`)
  return `<style>${css}</style>`
})

// JS: inline as a classic script at the end of <body> (module scripts are blocked in some viewers).
let js = ''
html = html.replace(/<script type="module" crossorigin src="\.\/([^"]+)"><\/script>\s*/, (_, src) => {
  js = fs.readFileSync(path.join(dir, src), 'utf8')
  return ''
})
if (!js) throw new Error('Could not find the app script in index.html')

// In the offline (iife) build Vite moves the CSS into the script and points at fonts with
// new URL("font.woff2", document.currentScript…).href — embed those files as data URIs.
js = js.replace(/new URL\("([^"]+\.(?:woff2?|jpe?g|png|svg))",[^;]*?document\.baseURI\)\.href/g, (_, f) =>
  JSON.stringify(dataUri(path.join(dir, 'assets', f))))
if (/new URL\("[^"]+\.(?:woff2?|jpe?g|png|svg)"/.test(js)) throw new Error('Some asset URLs were not embedded')

if (kind === 'single') {
  const missing = new Set()
  js = js.replace(/(["'`])((?:img|video)\/[^"'`]+?)\1/g, (m, q, p) => {
    const f = path.join(dir, p)
    if (!fs.existsSync(f)) { missing.add(p); return m }
    return `${q}${dataUri(f)}${q}`
  })
  if (missing.size) console.warn('Not found, left as-is:', [...missing].join(', '))
}

// Shown only if JavaScript doesn't run (e.g. a file preview), instead of a blank page.
const fallback = `<div id="offline-note" style="font:16px/1.5 system-ui,sans-serif;max-width:520px;margin:20vh auto;padding:0 24px;text-align:center;color:#0b1a16">
      <h1 style="font-size:22px;margin:0 0 8px">Ar Rasyidin Academy</h1>
      <p style="margin:0;color:#4a5f59">Loading… If this message stays, this viewer is blocking the page. Open the file in Google Chrome, Safari or Edge (right-click → Open With), not in a preview.</p>
    </div>`
html = html.replace('<div id="root"></div>', `<div id="root"></div>\n    ${fallback}`)
html = html.replace('</body>', `<script>document.getElementById('offline-note').remove();\n${js.replace(/<\/script/gi, '<\\/script')}</script>\n  </body>`)

html = html.replace(/href="\.\/(favicon\.svg)"/, (_, f) => `href="${dataUri(path.join(dir, f))}"`)

if (kind === 'single') {
  fs.writeFileSync(out, html)
  console.log(`Wrote ${out} (${(fs.statSync(out).size / 1048576).toFixed(1)} MB)`)
} else {
  fs.rmSync(out, { recursive: true, force: true })
  fs.mkdirSync(out, { recursive: true })
  for (const sub of ['img', 'video']) fs.cpSync(path.join(dir, sub), path.join(out, sub), { recursive: true, filter: (s) => !s.endsWith('.DS_Store') })
  fs.writeFileSync(path.join(out, 'index.html'), html)
  console.log(`Wrote ${out}/ (index.html + img/ + video/)`)
}
