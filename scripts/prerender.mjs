// scripts/prerender.mjs
//
// Turns the built SPA into real HTML files so non-JS crawlers (GPTBot,
// ClaudeBot, PerplexityBot) can read the content. Runs AFTER `vite build`.
//
// It loads each route in a real browser, waits for React to finish, then
// writes the fully-rendered HTML to disk. That captures the page text, the
// <title>/<meta> injected by useMeta, and the JSON-LD injected by useEffect.
//
//   npm i -D playwright sirv
//   npx playwright install chromium
//   node scripts/prerender.mjs

import { chromium } from 'playwright'
import sirv from 'sirv'
import { createServer } from 'node:http'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const SITE = 'https://halfave.co'
const PORT = 4178

// Read slugs straight out of the data file so this never drifts from the posts.
const postsSrc = readFileSync(join(ROOT, 'src/data/posts.ts'), 'utf8')
const slugs = [...postsSrc.matchAll(/slug: '([\w-]+)'/g)].map(m => m[1])
const dates = Object.fromEntries(
  [...postsSrc.matchAll(/slug: '([\w-]+)'[\s\S]*?date: '([\d-]+)'/g)].map(m => [m[1], m[2]])
)

const routes = ['/', '/blog', ...slugs.map(s => `/blog/${s}`)]
console.log(`Prerendering ${routes.length} routes\n`)

const server = createServer(sirv(DIST, { single: true, dev: true }))
await new Promise(r => server.listen(PORT, r))

const browser = await chromium.launch()
const page = await browser.newPage()
let failed = 0

for (const route of routes) {
  const url = `http://localhost:${PORT}${route}`
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
    // Wait for the app to actually paint something, not just for the shell.
    await page.waitForFunction(
      () => document.querySelector('#root')?.textContent?.trim().length > 200,
      { timeout: 15000 }
    )
    const html = await page.content()

    const outDir = route === '/' ? DIST : join(DIST, route)
    mkdirSync(outDir, { recursive: true })
    writeFileSync(join(outDir, 'index.html'), html, 'utf8')

    const words = (await page.locator('#root').innerText()).split(/\s+/).length
    const hasLd = html.includes('application/ld+json')
    console.log(`  ok   ${route.padEnd(52)} ${String(words).padStart(5)} words  ${hasLd ? 'JSON-LD' : 'no schema'}`)
  } catch (err) {
    failed++
    console.error(`  FAIL ${route} -> ${err.message.split('\n')[0]}`)
  }
}

await browser.close()
server.close()

// sitemap.xml, newest first
const urls = [
  { loc: SITE + '/', lastmod: null },
  { loc: SITE + '/blog', lastmod: null },
  ...slugs
    .map(s => ({ loc: `${SITE}/blog/${s}`, lastmod: dates[s] }))
    .sort((a, b) => (a.lastmod < b.lastmod ? 1 : -1)),
]
writeFileSync(
  join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(u => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`).join('\n') +
    `\n</urlset>\n`,
  'utf8'
)
console.log(`\nsitemap.xml written with ${urls.length} urls`)

if (failed) {
  console.error(`\n${failed} route(s) failed to prerender`)
  process.exit(1)
}
console.log('Prerender complete. Check dist/blog/<slug>/index.html for real content.')
