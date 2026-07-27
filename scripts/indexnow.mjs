// scripts/indexnow.mjs
//
// Tells Bing (and therefore ChatGPT Search, Copilot, DuckDuckGo, Yahoo) that
// pages have changed, without waiting for a crawl cycle. Run after deploying.
//
// SETUP, once:
//   1. bing.com/webmasters -> IndexNow -> generate an API key
//   2. save it as public/<key>.txt  containing ONLY the key, nothing else
//      e.g. public/a1b2c3d4e5f6.txt  ->  a1b2c3d4e5f6
//   3. deploy, then confirm https://halfave.co/<key>.txt loads
//
// USAGE:
//   node scripts/indexnow.mjs            submit every blog url + / and /blog
//   node scripts/indexnow.mjs /blog/foo  submit specific urls only
//
import { readFileSync, readdirSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SITE = 'https://halfave.co'
const HOST = 'halfave.co'

// Find the key file in public/. It is a bare hex filename with a .txt extension
// whose contents equal its own name; that is how IndexNow proves ownership.
const pub = join(ROOT, 'public')
const keyFile = readdirSync(pub).find(f => {
  if (!/^[a-f0-9]{8,128}\.txt$/i.test(f)) return false
  return readFileSync(join(pub, f), 'utf8').trim() === f.replace(/\.txt$/i, '')
})

if (!keyFile) {
  console.error('No IndexNow key file found in public/.')
  console.error('Generate a key at bing.com/webmasters -> IndexNow, then save it as')
  console.error('public/<key>.txt containing only the key itself.')
  process.exit(1)
}
const key = keyFile.replace(/\.txt$/i, '')
console.log(`Using key file public/${keyFile}`)

// URLs: either the ones passed on the command line, or everything.
let urlList = process.argv.slice(2).map(u => (u.startsWith('http') ? u : SITE + u))
if (!urlList.length) {
  const src = readFileSync(join(ROOT, 'src/data/posts.ts'), 'utf8')
  const slugs = [...src.matchAll(/slug: '([\w-]+)'/g)].map(m => m[1])
  urlList = [`${SITE}/`, `${SITE}/blog`, ...slugs.map(s => `${SITE}/blog/${s}`)]
}

console.log(`Submitting ${urlList.length} urls to IndexNow\n`)
urlList.forEach(u => console.log('  ' + u))

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key,
    keyLocation: `${SITE}/${keyFile}`,
    urlList,
  }),
})

// 200 = accepted, 202 = accepted but key validation pending.
// 403 = key file not reachable, 422 = url/host mismatch, 429 = too many requests.
const body = await res.text()
console.log(`\nHTTP ${res.status} ${res.statusText}`)
if (res.status === 200 || res.status === 202) {
  console.log('Accepted. Bing typically processes the queue within 24 hours.')
} else {
  console.error(body || '(no body)')
  console.error('403 = key file unreachable, 422 = host mismatch, 429 = rate limited.')
  process.exit(1)
}
