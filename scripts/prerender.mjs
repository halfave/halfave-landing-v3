// scripts/prerender.mjs
//
// Turns the built SPA into real HTML files so non-JS crawlers (GPTBot,
// ClaudeBot, PerplexityBot) can read the content. Runs AFTER `vite build`.
//
// It loads each route in a real browser, waits for React to finish, then
// writes the fully-rendered HTML. That captures the page text, the
// <title>/<meta> injected by useMeta, and the JSON-LD injected by useEffect.
//
// Output goes to BOTH:
//   dist/    - so `npm run preview` shows what will ship
//   public/  - so the HTML is committed and Vercel serves it without needing
//              a browser on the build machine (its image lacks Chromium's
//              system libraries, so prerendering in CI is not an option)
//
// IMPORTANT: the prerendered HTML references hashed asset filenames from the
// build it was captured against. Always re-run this before committing a code
// change, or the committed pages will point at a stale bundle.
//
//   npm i -D playwright sirv
//   npx playwright install chromium
//   npm run build:prod
//
import { chromium } from 'playwright'
import sirv from 'sirv'
import { createServer } from 'node:http'
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const PUBLIC = join(ROOT, 'public')
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

// Clear last run's staged output so deleted posts do not linger in public/.
rmSync(join(PUBLIC, 'blog'), { recursive: true, force: true })

const server = createServer(sirv(DIST, { single: true, dev: true }))
await new Promise(r => server.listen(PORT, r))

const browser = await chromium.launch()
const page = await browser.newPage()
let failed = 0

for (const route of routes) {
  const url = `http://localhost:${PORT}${route}`
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
    await page.waitForFunction(
      () => document.querySelector('#root')?.textContent?.trim().length > 200,
      { timeout: 15000 }
    )
    const html = await page.content()

    // The root route must not be staged into public/index.html: Vite uses that
    // file as the build entry, so writing rendered output there would corrupt
    // the next build. dist/index.html is fine to overwrite.
    const targets = route === '/' ? [DIST] : [DIST, PUBLIC]
    for (const base of targets) {
      const outDir = route === '/' ? base : join(base, route)
      mkdirSync(outDir, { recursive: true })
      writeFileSync(join(outDir, 'index.html'), html, 'utf8')
    }

    const words = (await page.locator('#root').innerText()).split(/\s+/).length
    const hasLd = html.includes('application/ld+json')
    console.log(`  ok   ${route.padEnd(52)} ${String(words).padStart(5)} words  ${hasLd ? 'JSON-LD' : 'NO SCHEMA'}`)
  } catch (err) {
    failed++
    console.error(`  FAIL ${route} -> ${err.message.split('\n')[0]}`)
  }
}

await browser.close()
server.close()

// sitemap-blog.xml, newest first.
// Deliberately NOT sitemap.xml: /sitemap.xml is rewritten to a Supabase
// function in vercel.json, and sitemap-marketing.xml ships from public/.
const urls = [
  { loc: SITE + '/', lastmod: null },
  { loc: SITE + '/blog', lastmod: null },
  ...slugs
    .map(s => ({ loc: `${SITE}/blog/${s}`, lastmod: dates[s] }))
    .sort((a, b) => (a.lastmod < b.lastmod ? 1 : -1)),
]
const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(u => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`).join('\n') +
  `\n</urlset>\n`
writeFileSync(join(DIST, 'sitemap-blog.xml'), xml, 'utf8')
writeFileSync(join(PUBLIC, 'sitemap-blog.xml'), xml, 'utf8')
console.log(`\nsitemap-blog.xml written with ${urls.length} urls (dist + public)`)

// An old version of this script wrote sitemap.xml, which would shadow the
// Supabase-generated one. Remove it if a previous run left it behind.
for (const stale of [join(DIST, 'sitemap.xml'), join(PUBLIC, 'sitemap.xml')]) {
  if (existsSync(stale)) {
    rmSync(stale)
    console.log(`removed stale ${stale.replace(ROOT, '.')}`)
  }
}

if (failed) {
  console.error(`\n${failed} route(s) failed to prerender`)
  process.exit(1)
}
console.log('\nDone. dist/ is ready to preview; public/blog is ready to commit.')
