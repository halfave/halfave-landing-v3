import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const sb = createClient(
  'https://mjkkzniagexfooclqsjr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qa2t6bmlhZ2V4Zm9vY2xxc2pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3NDc4OTUsImV4cCI6MjA4NjMyMzg5NX0.RuaeazBn_IFWfXOlQ0ZDDTPsnTApNGmE_WpPi0o52gQ'
)

// Neighborhood names sourced from USPS/NYC standard ZIP assignments
const NEIGHBORHOOD: Record<string, string> = {
  // Manhattan
  '10280': 'Battery Park City',  '10075': 'Upper East Side',
  '10028': 'Upper East Side',    '10004': 'Financial District',
  '10014': 'West Village',       '10022': 'Midtown East',
  '10011': 'Chelsea',            '10021': 'Upper East Side',
  '10128': 'Carnegie Hill',      '10013': 'Tribeca / SoHo',
  // Bronx
  '10473': 'Soundview',          '10470': 'Wakefield',
  '10465': 'Throgs Neck',        '10461': 'Morris Park',
  '10462': 'Parkchester',        '10472': 'Soundview / Bronx River',
  '10469': 'Pelham Gardens',     '10471': 'Riverdale',
  '10463': 'Kingsbridge',        '10455': 'Mott Haven',
  // Brooklyn
  '11231': 'Red Hook / Carroll Gardens', '11201': 'Brooklyn Heights / DUMBO',
  '11222': 'Greenpoint',         '11217': 'Park Slope / Boerum Hill',
  '11249': 'Williamsburg North', '11215': 'Park Slope',
  '11220': 'Sunset Park',        '11236': 'Canarsie',
  '11232': 'Sunset Park',        '11224': 'Coney Island',
  // Queens
  '11109': 'Long Island City',   '11364': 'Oakland Gardens',
  '11370': 'East Elmhurst',      '11105': 'Astoria',
  '11357': 'Whitestone',         '11103': 'Astoria North',
  '11379': 'Middle Village',     '11694': 'Rockaway Park',
  '11361': 'Bayside',            '11106': 'Astoria / Long Island City',
  // Staten Island
  '10307': 'Tottenville',        '10312': 'Eltingville',
  '10308': 'Great Kills',        '10314': 'Mid-Island',
  '10310': 'West Brighton',      '10306': 'New Dorp',
  '10305': 'Rosebank / Stapleton','10302': 'Port Richmond',
  '10301': 'St. George',         '10304': 'Stapleton',
};

const ZIP_DATA: Record<string, { zip: string; avg: number; cnt: number }[]> = {
  manhattan: [
    { zip: '10280', avg: 87.2, cnt: 10  }, { zip: '10075', avg: 81.9, cnt: 53  },
    { zip: '10028', avg: 81.7, cnt: 62  }, { zip: '10004', avg: 80.5, cnt: 11  },
    { zip: '10014', avg: 80.1, cnt: 713 }, { zip: '10022', avg: 79.5, cnt: 84  },
    { zip: '10011', avg: 79.2, cnt: 825 }, { zip: '10021', avg: 78.5, cnt: 90  },
    { zip: '10128', avg: 78.3, cnt: 69  }, { zip: '10013', avg: 78.3, cnt: 635 },
  ],
  bronx: [
    { zip: '10473', avg: 79.2, cnt: 244 }, { zip: '10470', avg: 75.8, cnt: 112 },
    { zip: '10465', avg: 73.8, cnt: 10  }, { zip: '10461', avg: 73.4, cnt: 251 },
    { zip: '10462', avg: 70.1, cnt: 338 }, { zip: '10472', avg: 68.3, cnt: 933 },
    { zip: '10469', avg: 67.5, cnt: 34  }, { zip: '10471', avg: 64.4, cnt: 19  },
    { zip: '10463', avg: 60.5, cnt: 161 }, { zip: '10455', avg: 55.4, cnt: 428 },
  ],
  brooklyn: [
    { zip: '11231', avg: 82.2, cnt: 1456 }, { zip: '11201', avg: 80.5, cnt: 1152 },
    { zip: '11222', avg: 79.1, cnt: 83   }, { zip: '11217', avg: 78.9, cnt: 639  },
    { zip: '11249', avg: 77.3, cnt: 56   }, { zip: '11215', avg: 74.2, cnt: 450  },
    { zip: '11220', avg: 74.1, cnt: 1103 }, { zip: '11236', avg: 74.1, cnt: 69   },
    { zip: '11232', avg: 73.1, cnt: 551  }, { zip: '11224', avg: 72.8, cnt: 12   },
  ],
  queens: [
    { zip: '11109', avg: 95.5, cnt: 11  }, { zip: '11364', avg: 90.6, cnt: 38  },
    { zip: '11370', avg: 89.1, cnt: 277 }, { zip: '11105', avg: 85.0, cnt: 899 },
    { zip: '11357', avg: 85.0, cnt: 63  }, { zip: '11103', avg: 84.9, cnt: 1319},
    { zip: '11379', avg: 84.8, cnt: 170 }, { zip: '11694', avg: 83.8, cnt: 52  },
    { zip: '11361', avg: 83.7, cnt: 61  }, { zip: '11106', avg: 83.2, cnt: 837 },
  ],
  'staten-island': [
    { zip: '10307', avg: 93.2, cnt: 13  }, { zip: '10312', avg: 91.6, cnt: 30  },
    { zip: '10308', avg: 89.9, cnt: 37  }, { zip: '10314', avg: 88.6, cnt: 188 },
    { zip: '10310', avg: 86.8, cnt: 103 }, { zip: '10306', avg: 84.4, cnt: 83  },
    { zip: '10305', avg: 81.7, cnt: 201 }, { zip: '10302', avg: 80.0, cnt: 81  },
    { zip: '10301', avg: 78.2, cnt: 408 }, { zip: '10304', avg: 74.8, cnt: 244 },
  ],
}

const BOROUGH_META: Record<string, { name: string; color: string; avg: number; total: number }> = {
  manhattan:     { name: 'Manhattan',     color: '#111e30', avg: 74.5, total: 8021  },
  bronx:         { name: 'Bronx',         color: '#c4533a', avg: 56.8, total: 8477  },
  brooklyn:      { name: 'Brooklyn',      color: '#4a7fb5', avg: 69.5, total: 10037 },
  queens:        { name: 'Queens',        color: '#c9a227', avg: 79.1, total: 10130 },
  'staten-island': { name: 'Staten Island', color: '#7a8fa6', avg: 81.2, total: 1439 },
}

const ALL_BOROUGHS = Object.keys(BOROUGH_META)

interface Props {
  borough: string   // e.g. 'queens'
  onBack: () => void
}

export default function ZipRankingsPage({ borough, onBack }: Props) {
  const meta   = BOROUGH_META[borough]
  const zips   = ZIP_DATA[borough] ?? []

  const [topBuildings, setTopBuildings] = useState<Record<string, {address: string; slug: string; score: number}[]>>({})

  // Fetch top 3 buildings per ZIP
  useEffect(() => {
    if (!zips.length) return
    const fetchBuildings = async () => {
      const zipCodes = zips.map(z => z.zip)
      const { data } = await sb
        .schema('analytics')
        .from('buildings')
        .select('address, slug, zipcode, building_risk_scores!inner(health_score)')
        .in('zipcode', zipCodes)
        .not('slug', 'is', null)
        .order('building_risk_scores(health_score)', { ascending: false })
        .limit(100)
      if (!data) return
      const grouped: Record<string, {address: string; slug: string; score: number}[]> = {}
      for (const row of data as any[]) {
        const zip = row.zipcode
        if (!grouped[zip]) grouped[zip] = []
        if (grouped[zip].length < 3) {
          grouped[zip].push({ address: row.address, slug: row.slug, score: row.building_risk_scores?.[0]?.health_score ?? 0 })
        }
      }
      setTopBuildings(grouped)
    }
    fetchBuildings()
  }, [borough])

  useEffect(() => {
    if (!meta) return
    document.title = `Top Neighborhoods in ${meta.name} by Building Health Score | Half Ave`
    const desc = `Which ZIP codes in ${meta.name} have the best-managed rental buildings? See health scores, violation rates, and compliance rankings for every ${meta.name} ZIP code.`
    let el = document.querySelector('meta[name="description"]')
    if (!el) { el = document.createElement('meta'); el.setAttribute('name', 'description'); document.head.appendChild(el) }
    el.setAttribute('content', desc)
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!link) { link = document.createElement('link'); link.setAttribute('rel', 'canonical'); document.head.appendChild(link) }
    link.href = `https://halfave.co/zip-rankings/${borough}`
  }, [borough, meta])

  if (!meta) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <button onClick={onBack}>← Back</button>
    </div>
  )

  const scoreColor = (s: number) => s >= 75 ? '#3a7d5e' : s >= 60 ? '#c9a227' : '#c4533a'
  const scoreBg    = (s: number) => s >= 75 ? '#edf5f0' : s >= 60 ? '#fdf8ec' : '#fdf0ed'

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&family=Inter:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f7f4ef; color: #111e30; font-family: 'Inter', sans-serif; }
        .zr-root { min-height: 100vh; background: #f7f4ef; }
        .zr-hero { background: #111e30; padding: 48px 24px 40px; }
        .zr-hero-inner { max-width: 720px; margin: 0 auto; }
        .zr-back { background: none; border: none; cursor: pointer; color: rgba(247,244,239,0.5); font-size: 12px; font-family: 'DM Mono', monospace; margin-bottom: 20px; display: flex; align-items: center; gap: 6px; padding: 0; }
        .zr-eyebrow { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(247,244,239,0.4); margin-bottom: 12px; }
        .zr-h1 { font-family: 'Lora', serif; font-size: clamp(22px, 3vw, 34px); font-weight: 600; color: #f7f4ef; line-height: 1.2; margin-bottom: 12px; }
        .zr-sub { font-size: 14px; color: rgba(247,244,239,0.6); line-height: 1.65; max-width: 540px; }
        .zr-body { max-width: 720px; margin: 0 auto; padding: 40px 24px 80px; }
        .zr-section-title { font-family: 'Lora', serif; font-size: 18px; font-weight: 600; color: #111e30; margin-bottom: 16px; }
        .zr-table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 12px; overflow: hidden; border: 1px solid rgba(17,30,48,0.08); margin-bottom: 40px; }
        .zr-table th { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: #9ca3af; padding: 12px 16px; text-align: left; border-bottom: 1px solid rgba(17,30,48,0.06); background: #fafafa; }
        .zr-table td { padding: 14px 16px; font-size: 13px; border-bottom: 1px solid rgba(17,30,48,0.05); }
        .zr-table tr:last-child td { border-bottom: none; }
        .zr-rank { font-family: 'DM Mono', monospace; font-size: 11px; color: #9ca3af; width: 32px; }
        .zr-zip { font-weight: 700; color: #111e30; font-family: 'DM Mono', monospace; font-size: 14px; }
        .zr-score-badge { display: inline-block; padding: 3px 10px; border-radius: 6px; font-family: 'DM Mono', monospace; font-size: 13px; font-weight: 700; }
        .zr-bar-wrap { flex: 1; height: 5px; background: rgba(17,30,48,0.06); border-radius: 3px; overflow: hidden; min-width: 60px; }
        .zr-bar { height: 100%; border-radius: 3px; }
        .zr-cta-block { background: #111e30; border-radius: 14px; padding: 28px 32px; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; margin-bottom: 40px; }
        .zr-cta-title { font-family: 'Lora', serif; font-size: 16px; font-weight: 600; color: #f7f4ef; margin-bottom: 6px; }
        .zr-cta-desc { font-size: 13px; color: rgba(247,244,239,0.6); }
        .zr-cta-btn { background: #f7f4ef; color: #111e30; font-size: 13px; font-weight: 700; padding: 10px 22px; border-radius: 8px; text-decoration: none; white-space: nowrap; font-family: 'Inter', sans-serif; }
        .zr-other-boroughs { margin-top: 8px; }
        .zr-other-title { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #9ca3af; margin-bottom: 12px; }
        .zr-borough-links { display: flex; flex-wrap: wrap; gap: 8px; }
        .zr-borough-link { padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; text-decoration: none; border: 1.5px solid; }
        .zr-footer { padding-top: 24px; border-top: 1px solid rgba(17,30,48,0.08); font-size: 11px; color: #9ca3af; line-height: 1.7; }
        .zr-footer a { color: #111e30; text-decoration: underline; }
      `}</style>

      <div className="zr-root">
        <div className="zr-hero">
          <div className="zr-hero-inner">
            <button className="zr-back" onClick={onBack}>← Back to Half Ave</button>
            <div className="zr-eyebrow">Half Ave · NYC Building Health Score · {meta.name}</div>
            <h1 className="zr-h1">
              Top Neighborhoods in {meta.name} by Building Health Score
            </h1>
            <p className="zr-sub">
              Ranked by average building health score across {meta.total.toLocaleString()} rental properties in {meta.name}.
              Scores reflect HPD violations, DOB compliance, inspection history, and operational data — updated March 2026.
            </p>
          </div>
        </div>

        <div className="zr-body">

          {/* Top 10 table */}
          <h2 className="zr-section-title">Top 10 Best-Performing Neighborhoods in {meta.name}</h2>
          <table className="zr-table">
            <thead>
              <tr>
                <th style={{ width: 40 }}>#</th>
                <th>Neighborhood / ZIP</th>
                <th>Avg Health Score</th>
                <th style={{ minWidth: 100 }}>Distribution</th>
                <th style={{ textAlign: 'right' }}>Buildings</th>
              </tr>
            </thead>
            <tbody>
              {zips.map((row, i) => (
                <tr key={row.zip}>
                  <td className="zr-rank">{i + 1}</td>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: 13, color: '#111e30' }}>
                      {NEIGHBORHOOD[row.zip] ?? row.zip}
                    </div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#9ca3af', marginTop: 2 }}>
                      {row.zip}
                    </div>
                  </td>
                  <td>
                    <span
                      className="zr-score-badge"
                      style={{ color: scoreColor(row.avg), background: scoreBg(row.avg) }}
                    >
                      {row.avg}
                    </span>
                  </td>
                  <td>
                    <div className="zr-bar-wrap">
                      <div className="zr-bar" style={{ width: `${row.avg}%`, background: meta.color }} />
                    </div>
                  </td>
                  <td style={{ textAlign: 'right', color: '#9ca3af', fontFamily: "'DM Mono', monospace", fontSize: 12 }}>
                    {row.cnt.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Top buildings per neighborhood */}
          <h2 className="zr-section-title" style={{ marginTop: 48 }}>Top-Rated Buildings by Neighborhood</h2>
          <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 20, lineHeight: 1.6 }}>
            Highest health-scoring buildings in each {meta.name} ZIP code — click any address to see the full compliance report.
          </p>
          {zips.map(row => {
            const bldgs = topBuildings[row.zip] ?? []
            if (!bldgs.length) return null
            return (
              <div key={row.zip} style={{ marginBottom: 16, background: '#fff', border: '1px solid rgba(17,30,48,0.08)', borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(17,30,48,0.06)', display: 'flex', alignItems: 'center', gap: 10, background: '#fafafa' }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: '#111e30' }}>{NEIGHBORHOOD[row.zip] ?? row.zip}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#9ca3af' }}>{row.zip}</span>
                  <span style={{ marginLeft: 'auto', fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 700, color: scoreColor(row.avg), background: scoreBg(row.avg), padding: '2px 8px', borderRadius: 4 }}>{row.avg}</span>
                </div>
                {bldgs.map(b => (
                  <div key={b.slug} style={{ display: 'flex', alignItems: 'center', padding: '11px 16px', borderBottom: '1px solid rgba(17,30,48,0.04)', gap: 12 }}>
                    <div style={{ flex: 1, fontSize: 13, color: '#111e30', fontWeight: 500 }}>{b.address}</div>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: scoreColor(b.score), background: scoreBg(b.score), padding: '1px 7px', borderRadius: 4, fontWeight: 700, flexShrink: 0, visibility: (b.score ? 'visible' : 'hidden') as 'visible' | 'hidden' }}>{b.score || ''}</span>
                    <a
                      href={`/buildings/${b.slug}`}
                      style={{ fontSize: 11, color: meta.color, textDecoration: 'none', fontWeight: 600, flexShrink: 0, borderBottom: `1px solid ${meta.color}40` }}
                      onClick={e => { e.preventDefault(); window.history.pushState({}, '', `/buildings/${b.slug}`); window.dispatchEvent(new PopStateEvent('popstate')) }}
                    >
                      View report →
                    </a>
                  </div>
                ))}
              </div>
            )
          })}

          <div style={{ height: 16 }} />
          <div style={{ background: '#fff', border: '1px solid rgba(17,30,48,0.08)', borderRadius: 12, padding: '20px 24px', marginBottom: 32, fontSize: 14, color: '#6b7280', lineHeight: 1.7 }}>
            <strong style={{ color: '#111e30' }}>{meta.name} borough average: {meta.avg}</strong>
            {' '}— compared to a citywide average of 68.4. Buildings are scored on a 0–100 scale based on open violations,
            inspection compliance, violation severity, and resolution time. A score above 75 indicates
            strong compliance performance relative to NYC peers.
          </div>

          {/* CTA */}
          <div className="zr-cta-block">
            <div>
              <div className="zr-cta-title">How does your building rank in {meta.name}?</div>
              <div className="zr-cta-desc">Look up any building's health score instantly — free, no account required.</div>
            </div>
            <a href="https://halfave.co" className="zr-cta-btn">Check your building →</a>
          </div>

          {/* Other borough links */}
          <div className="zr-other-boroughs">
            <div className="zr-other-title">Rankings by Borough</div>
            <div className="zr-borough-links">
              {ALL_BOROUGHS.filter(b => b !== borough).map(b => {
                const bm = BOROUGH_META[b]
                return (
                  <a
                    key={b}
                    href={`/zip-rankings/${b}`}
                    className="zr-borough-link"
                    style={{ color: bm.color, borderColor: bm.color + '40' }}
                    onClick={e => { e.preventDefault(); window.history.pushState({}, '', `/zip-rankings/${b}`); window.dispatchEvent(new PopStateEvent('popstate')) }}
                  >
                    {bm.name}
                  </a>
                )
              })}
            </div>
          </div>

          <div style={{ height: 40 }} />

          <div className="zr-footer">
            Data sourced from NYC HPD, DOB, and ECB open datasets. Analysis covers {meta.total.toLocaleString()} rental buildings in {meta.name}.
            Scores reflect a snapshot as of March 2026 and may not reflect real-time conditions.{' '}
            <a href="https://halfave.co">Half Ave</a> · <a href="https://halfave.co/health">NYC Building Health Report</a>
          </div>
        </div>
      </div>
    </>
  )
}