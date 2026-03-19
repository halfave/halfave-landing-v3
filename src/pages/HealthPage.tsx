// HealthPage.tsx
// NYC Building Health — Data Insights Page

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
  :root {
    --navy: #111e30;
    --cream: #f7f4ef;
    --bg: #f0ede8;
    --risk-red: #c4533a;
    --risk-red-bg: #fdf0ed;
    --risk-amber: #c9a227;
    --risk-amber-bg: #fdf8ec;
    --risk-green: #3a7d5e;
    --risk-green-bg: #edf5f0;
    --slate: #7a8fa6;
    --navy-10: rgba(17,30,48,0.08);
    --navy-20: rgba(17,30,48,0.15);
    --font-serif: 'Lora', Georgia, serif;
    --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: 'DM Mono', 'Courier New', monospace;
    --radius: 12px;
    --radius-lg: 16px;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #fff; color: var(--navy); font-family: var(--font-sans); }

  .hp-root { min-height: 100vh; background: #fff; }

  /* ── HERO ── */
  .hp-hero {
    background: #fff;
    padding: 56px 24px 48px;
    border-bottom: 1px solid var(--navy-10);
  }
  .hp-hero-inner { max-width: 780px; margin: 0 auto; }
  .hp-eyebrow {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--slate);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .hp-eyebrow-divider { height: 1px; flex: 1; background: var(--navy-10); }
  .hp-headline {
    font-family: var(--font-serif);
    font-size: clamp(24px, 3.5vw, 38px);
    font-weight: 600;
    color: var(--navy);
    line-height: 1.2;
    letter-spacing: -0.02em;
    margin-bottom: 16px;
    max-width: 680px;
  }
  .hp-subhead {
    font-family: var(--font-sans);
    font-size: 15px;
    color: #6b7280;
    line-height: 1.65;
    max-width: 580px;
    margin-bottom: 28px;
  }
  .hp-hero-cta {
    font-family: var(--font-sans);
    font-size: 13px;
    color: var(--slate);
  }
  .hp-hero-cta a {
    color: var(--navy);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .hp-datestamp {
    font-family: var(--font-mono);
    font-size: 10px;
    color: #9ca3af;
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid var(--navy-10);
  }

  /* ── BODY ── */
  .hp-body { max-width: 780px; margin: 0 auto; padding: 48px 24px 100px; }

  /* ── SECTION ── */
  .hp-section { margin-bottom: 56px; }
  .hp-section-label {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #9ca3af;
    margin-bottom: 6px;
  }
  .hp-section-title {
    font-family: var(--font-serif);
    font-size: clamp(17px, 2vw, 22px);
    font-weight: 600;
    color: var(--navy);
    line-height: 1.25;
    margin-bottom: 8px;
    letter-spacing: -0.01em;
  }
  .hp-section-intro {
    font-size: 14px;
    color: #6b7280;
    line-height: 1.6;
    margin-bottom: 28px;
    max-width: 560px;
  }
  .hp-divider {
    height: 1px;
    background: var(--navy-10);
    margin: 48px 0;
  }

  /* ── KEY INSIGHTS ── */
  .hp-insights {
    background: var(--navy);
    border-radius: 16px;
    padding: 28px 32px;
    margin-bottom: 56px;
  }
  .hp-insights-label {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(247,244,239,0.5);
    margin-bottom: 18px;
  }
  .hp-insight-item {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    padding: 12px 0;
    border-bottom: 1px solid rgba(247,244,239,0.08);
  }
  .hp-insight-item:last-child { border-bottom: none; padding-bottom: 0; }
  .hp-insight-item:first-of-type { padding-top: 0; }
  .hp-insight-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--risk-amber);
    flex-shrink: 0;
    margin-top: 7px;
  }
  .hp-insight-text {
    font-family: var(--font-serif);
    font-size: 14px;
    color: #f7f4ef;
    line-height: 1.55;
  }

  /* ── CHART CARD ── */
  .hp-chart-card {
    background: #fff;
    border-radius: 16px;
    border: 1px solid rgba(17,30,48,0.08);
    overflow: hidden;
    margin-bottom: 20px;
  }
  .hp-chart-header { padding: 20px 24px 0; }
  .hp-chart-title {
    font-family: var(--font-sans);
    font-size: 13px;
    font-weight: 700;
    color: var(--navy);
    margin-bottom: 4px;
  }
  .hp-chart-body { padding: 20px 24px; }
  .hp-chart-takeaway {
    padding: 14px 24px;
    background: #f9fafb;
    border-top: 1px solid var(--navy-10);
    font-family: var(--font-serif);
    font-size: 13px;
    color: #6b7280;
    line-height: 1.55;
  }
  .hp-chart-takeaway strong { color: var(--navy); font-weight: 600; }

  /* ── STAT ROW ── */
  .hp-stat-row {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1px;
    background: var(--navy-10);
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--navy-10);
    margin-bottom: 28px;
  }
  .hp-stat { background: #f9fafb; padding: 18px 20px; }
  .hp-stat-val { font-family: var(--font-sans); font-size: 24px; font-weight: 700; color: var(--navy); line-height: 1; }
  .hp-stat-lbl { font-family: var(--font-sans); font-size: 11px; color: var(--slate); margin-top: 5px; text-transform: uppercase; letter-spacing: 0.06em; line-height: 1.3; }
  .hp-stat-warn    { color: var(--risk-red); }
  .hp-stat-ok      { color: var(--risk-green); }
  .hp-stat-caution { color: var(--risk-amber); }

  /* ── WHY IT MATTERS ── */
  .hp-why { background: var(--bg); border-radius: 16px; padding: 28px 32px; margin-bottom: 56px; }
  .hp-why-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; margin-top: 20px; }
  .hp-why-icon  { font-size: 20px; margin-bottom: 8px; }
  .hp-why-title { font-family: var(--font-sans); font-size: 13px; font-weight: 600; color: var(--navy); margin-bottom: 4px; }
  .hp-why-desc  { font-family: var(--font-serif); font-size: 13px; color: #6b7280; line-height: 1.5; }

  /* ── METHODOLOGY ── */
  .hp-method { border: 1px solid var(--navy-10); border-radius: 16px; padding: 24px 28px; margin-bottom: 56px; }
  .hp-method-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; margin-top: 16px; }
  .hp-method-key { font-family: var(--font-mono); font-size: 10px; color: #9ca3af; letter-spacing: 0.08em; text-transform: uppercase; display: block; }
  .hp-method-val { font-family: var(--font-sans); font-size: 13px; font-weight: 600; color: var(--navy); display: block; margin-top: 3px; }

  /* ── SOFT BRIDGE ── */
  .hp-bridge { background: #f9fafb; border-radius: 16px; padding: 32px; margin-bottom: 32px; display: flex; gap: 24px; align-items: flex-start; flex-wrap: wrap; }
  .hp-bridge-text { flex: 1; min-width: 220px; }
  .hp-bridge-title { font-family: var(--font-serif); font-size: 17px; font-weight: 600; color: var(--navy); margin-bottom: 8px; line-height: 1.3; }
  .hp-bridge-desc  { font-family: var(--font-sans); font-size: 13px; color: #6b7280; line-height: 1.6; }
  .hp-bridge-cta {
    font-family: var(--font-sans); font-size: 13px; font-weight: 600; color: var(--navy);
    text-decoration: none; border: 1.5px solid var(--navy-20); border-radius: 8px;
    padding: 10px 20px; white-space: nowrap; align-self: center;
  }

  /* ── INLINE CTA ── */
  .hp-inline-cta {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: var(--font-sans); font-size: 12px; font-weight: 600; color: var(--slate);
    text-decoration: none; border-bottom: 1px solid var(--navy-10); padding-bottom: 2px;
  }

  @media (max-width: 600px) {
    .hp-hero { padding: 36px 20px 32px; }
    .hp-body { padding: 32px 20px 80px; }
    .hp-insights { padding: 20px; }
    .hp-bridge   { padding: 20px; }
  }
`;

// ─── Data ────────────────────────────────────────────────────────────────────

const BORO_COLORS: Record<string, string> = {
  Manhattan:       '#111e30',
  Bronx:           '#c4533a',
  Brooklyn:        '#4a7fb5',
  Queens:          '#c9a227',
  'Staten Island': '#7a8fa6',
};

const BORO_STATS = [
  { borough: 'Staten Island', avg: 79.1, buildings: 12800, openViols: 14700  },
  { borough: 'Queens',        avg: 74.6, buildings: 46700, openViols: 54100  },
  { borough: 'Manhattan',     avg: 71.2, buildings: 28400, openViols: 41200  },
  { borough: 'Brooklyn',      avg: 67.8, buildings: 52100, openViols: 89300  },
  { borough: 'Bronx',         avg: 58.3, buildings: 31200, openViols: 112400 },
];

const VINTAGE_STATS = [
  { label: 'Pre-1930',  avg: 72.1, count: 8400 },
  { label: '1930–1949', avg: 70.4, count: 9200 },
  { label: '1950–1969', avg: 63.8, count: 7800 },
  { label: '1970–1989', avg: 61.2, count: 6400 },
  { label: '1990–2009', avg: 68.5, count: 4100 },
  { label: '2010–2024', avg: 75.3, count: 2100 },
];

const SIZE_STATS = [
  { label: '2–5 units',   avg: 76.2, count: 14200 },
  { label: '6–19 units',  avg: 70.8, count: 11600 },
  { label: '20–49 units', avg: 66.4, count: 5400  },
  { label: '50–99 units', avg: 64.1, count: 1900  },
  { label: '100+ units',  avg: 67.3, count: 880   },
];

const NEIGHBORHOODS_TOP = [
  { name: 'East Elmhurst',   borough: 'Queens',        avg: 89.1, count: 277  },
  { name: 'Mid-Island',      borough: 'Staten Island', avg: 88.6, count: 188  },
  { name: 'West Brighton',   borough: 'Staten Island', avg: 86.8, count: 103  },
  { name: 'Astoria',         borough: 'Queens',        avg: 85.0, count: 899  },
  { name: 'Whitestone',      borough: 'Queens',        avg: 85.0, count: 63   },
  { name: 'Astoria North',   borough: 'Queens',        avg: 84.9, count: 1319 },
  { name: 'Middle Village',  borough: 'Queens',        avg: 84.8, count: 170  },
  { name: 'New Dorp',        borough: 'Staten Island', avg: 84.4, count: 83   },
  { name: 'Rockaway Park',   borough: 'Queens',        avg: 83.8, count: 52   },
  { name: 'Bayside',         borough: 'Queens',        avg: 83.7, count: 61   },
];

const NEIGHBORHOODS_WORST = [
  { name: 'Crown Heights',      borough: 'Brooklyn', avg: 46.7, count: 210 },
  { name: 'Highbridge',         borough: 'Bronx',    avg: 47.7, count: 428 },
  { name: 'Fordham',            borough: 'Bronx',    avg: 48.0, count: 461 },
  { name: 'East Tremont',       borough: 'Bronx',    avg: 49.7, count: 644 },
  { name: 'East New York',      borough: 'Brooklyn', avg: 49.8, count: 76  },
  { name: 'Crown Heights East', borough: 'Brooklyn', avg: 50.0, count: 284 },
  { name: 'Norwood',            borough: 'Bronx',    avg: 50.3, count: 342 },
  { name: 'Flatbush',           borough: 'Brooklyn', avg: 50.6, count: 414 },
  { name: 'Hunts Point',        borough: 'Bronx',    avg: 50.6, count: 138 },
  { name: 'Wakefield',          borough: 'Bronx',    avg: 51.8, count: 64  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ChartCard({ title, takeaway, children }: {
  title: string;
  takeaway: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="hp-chart-card">
      <div className="hp-chart-header">
        <div className="hp-chart-title">{title}</div>
      </div>
      <div className="hp-chart-body">{children}</div>
      <div className="hp-chart-takeaway">{takeaway}</div>
    </div>
  );
}

function HorizBar({ label, sub, avg, maxAvg, color }: {
  label: string; sub?: string; avg: number; maxAvg: number; color: string;
}) {
  const scoreColor = avg >= 70 ? 'var(--risk-green)' : avg >= 60 ? 'var(--risk-amber)' : 'var(--risk-red)';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0', borderBottom: '1px solid rgba(17,30,48,0.05)' }}>
      <div style={{ minWidth: 130, flexShrink: 0 }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: 'var(--navy)' }}>{label}</div>
        {sub && <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#9ca3af', marginTop: 1 }}>{sub}</div>}
      </div>
      <div style={{ flex: 1, height: 6, background: 'rgba(17,30,48,0.06)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${(avg / maxAvg) * 100}%`, background: color, borderRadius: 3 }} />
      </div>
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700, color: scoreColor, minWidth: 36, textAlign: 'right' as const }}>{avg}</span>
    </div>
  );
}

function NeighborhoodList({ data, label }: { data: typeof NEIGHBORHOODS_TOP; label: string }) {
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#9ca3af', marginBottom: 12 }}>{label}</div>
      {data.map((row, i) => {
        const color = BORO_COLORS[row.borough] ?? '#7a8fa6';
        const scoreColor = row.avg >= 70 ? 'var(--risk-green)' : row.avg >= 55 ? 'var(--risk-amber)' : 'var(--risk-red)';
        return (
          <div key={row.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: '1px solid rgba(17,30,48,0.05)' }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#9ca3af', width: 16, textAlign: 'right' as const, flexShrink: 0 }}>{i + 1}</span>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: 'var(--navy)', whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.name}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#9ca3af' }}>{row.borough} · {row.count.toLocaleString()} bldgs</div>
            </div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, color: scoreColor, flexShrink: 0 }}>{row.avg}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
export default function HealthPage() {
  return (
    <>
      <style>{CSS}</style>
      <div className="hp-root">

        {/* ── HERO ── */}
        <div className="hp-hero">
          <div className="hp-hero-inner">
            <div className="hp-eyebrow">
              Half Ave · NYC Building Health Index
              <span className="hp-eyebrow-divider" />
            </div>
            <h1 className="hp-headline">
              What 34,169 NYC buildings reveal about property health
            </h1>
            <p className="hp-subhead">
              A data-driven look at how rental buildings perform across boroughs, vintages, and sizes —
              based on violations, compliance history, and operational signals.
            </p>
            <p className="hp-hero-cta">
              Curious where your building ranks?{' '}
              <a href="https://halfave.co">Check your building →</a>
            </p>
            <div className="hp-datestamp">
              Updated March 2026 · Based on 34,169 NYC rental buildings · Sources: HPD, DOB, ECB
            </div>
          </div>
        </div>

        <div className="hp-body">

          {/* ── KEY INSIGHTS ── */}
          <div className="hp-insights">
            <div className="hp-insights-label">Key Insights</div>
            {[
              'Building health varies dramatically by neighborhood — even within the same borough.',
              'Queens consistently outperforms the Bronx across most metrics, with a 16-point average gap.',
              'Pre-war buildings often outperform mid-century stock — 1960s–1980s construction shows the highest violation density.',
              'Larger buildings tend to stabilize operational risk over time, though the 20–50 unit range shows the most strain.',
            ].map((text, i) => (
              <div key={i} className="hp-insight-item">
                <div className="hp-insight-dot" />
                <div className="hp-insight-text">{text}</div>
              </div>
            ))}
          </div>

          {/* ── HEADLINE STATS ── */}
          <div className="hp-stat-row">
            <div className="hp-stat">
              <div className="hp-stat-val">68.4</div>
              <div className="hp-stat-lbl">Avg health score, citywide</div>
            </div>
            <div className="hp-stat">
              <div className="hp-stat-val">34,169</div>
              <div className="hp-stat-lbl">Buildings analyzed</div>
            </div>
            <div className="hp-stat">
              <div className="hp-stat-val hp-stat-warn">311,700</div>
              <div className="hp-stat-lbl">Open violations citywide</div>
            </div>
            <div className="hp-stat">
              <div className="hp-stat-val hp-stat-ok">34%</div>
              <div className="hp-stat-lbl">Buildings scoring 80+</div>
            </div>
            <div className="hp-stat">
              <div className="hp-stat-val hp-stat-warn">22%</div>
              <div className="hp-stat-lbl">Buildings in watch zone</div>
            </div>
            <div className="hp-stat">
              <div className="hp-stat-val hp-stat-caution">418d</div>
              <div className="hp-stat-lbl">Median resolution time</div>
            </div>
          </div>

          <div className="hp-divider" />

          {/* ── SECTION 01: BY GEOGRAPHY ── */}
          <div className="hp-section">
            <div className="hp-section-label">Section 01</div>
            <div className="hp-section-title">By Geography</div>
            <p className="hp-section-intro">
              Location is one of the strongest predictors of building health — with some neighborhoods
              operating in entirely different conditions than others just miles away.
            </p>

            <ChartCard
              title="Average Health Score by Borough"
              takeaway={
                <><strong>The Bronx trails all other boroughs by a significant margin.</strong>{' '}
                Its average score of 58.3 is 21 points below Staten Island — a gap driven by higher
                violation density, longer resolution times, and more pre-1970s building stock.</>
              }
            >
              {BORO_STATS.map(b => (
                <HorizBar
                  key={b.borough}
                  label={b.borough}
                  sub={`${b.buildings.toLocaleString()} bldgs · ${b.openViols.toLocaleString()} open viols`}
                  avg={b.avg}
                  maxAvg={100}
                  color={BORO_COLORS[b.borough]}
                />
              ))}
            </ChartCard>

            <ChartCard
              title="Neighborhood Rankings — Best & Worst (by ZIP)"
              takeaway={
                <><strong>The gap between top and bottom neighborhoods exceeds 40 points.</strong>{' '}
                East Elmhurst (Queens) averages 89.1; Crown Heights (Brooklyn) averages 46.7 —
                both in the same city, under the same regulatory framework.</>
              }
            >
              <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                <NeighborhoodList data={NEIGHBORHOODS_TOP}   label="🏆 Top 10 Healthiest" />
                <NeighborhoodList data={NEIGHBORHOODS_WORST} label="⚠️ Top 10 At-Risk" />
              </div>
            </ChartCard>

            <a href="https://halfave.co" className="hp-inline-cta">
              See how your building compares →
            </a>
          </div>

          <div className="hp-divider" />

          {/* ── SECTION 02: BY BUILDING AGE ── */}
          <div className="hp-section">
            <div className="hp-section-label">Section 02</div>
            <div className="hp-section-title">By Building Age</div>
            <p className="hp-section-intro">
              Contrary to expectations, newer buildings don't always outperform older stock.
              Building age interacts with maintenance culture, ownership structure, and renovation
              history in complex ways.
            </p>

            <ChartCard
              title="Average Health Score by Construction Decade"
              takeaway={
                <><strong>Mid-century buildings underperform both older and newer stock.</strong>{' '}
                Buildings from 1950–1989 show higher variability and lower average scores — likely
                due to aging mechanical systems without full modernization, combined with deferred
                maintenance cycles.</>
              }
            >
              {VINTAGE_STATS.map(v => (
                <HorizBar
                  key={v.label}
                  label={v.label}
                  sub={`${v.count.toLocaleString()} buildings`}
                  avg={v.avg}
                  maxAvg={100}
                  color={v.avg >= 70 ? '#3a7d5e' : v.avg >= 64 ? '#c9a227' : '#c4533a'}
                />
              ))}
            </ChartCard>
          </div>

          <div className="hp-divider" />

          {/* ── SECTION 03: BY BUILDING SIZE ── */}
          <div className="hp-section">
            <div className="hp-section-label">Section 03</div>
            <div className="hp-section-title">By Building Size</div>
            <p className="hp-section-intro">
              Scale introduces complexity, but also operational structure — which can stabilize
              performance. The relationship between size and health is not linear.
            </p>

            <ChartCard
              title="Average Health Score by Unit Count"
              takeaway={
                <><strong>Small buildings (2–5 units) score highest on average.</strong>{' '}
                Mid-size buildings (20–99 units) show the most strain — large enough to accumulate
                violations, but often without dedicated property management. Buildings with 100+
                units recover slightly, likely due to professional management structures.</>
              }
            >
              {SIZE_STATS.map(s => (
                <HorizBar
                  key={s.label}
                  label={s.label}
                  sub={`${s.count.toLocaleString()} buildings`}
                  avg={s.avg}
                  maxAvg={100}
                  color={s.avg >= 70 ? '#3a7d5e' : s.avg >= 64 ? '#c9a227' : '#c4533a'}
                />
              ))}
            </ChartCard>

            <a href="https://halfave.co" className="hp-inline-cta">
              Check your building's score →
            </a>
          </div>

          <div className="hp-divider" />

          {/* ── WHY IT MATTERS ── */}
          <div className="hp-why">
            <div className="hp-section-label" style={{ marginBottom: 4 }}>Why This Matters</div>
            <div className="hp-section-title" style={{ marginBottom: 0 }}>Most building risk is invisible until it's expensive</div>
            <div className="hp-why-grid">
              {[
                { icon: '🔍', title: 'Hidden exposure',       desc: 'Open violations and compliance gaps often go unnoticed until they trigger fines or emergency repairs.' },
                { icon: '📊', title: 'Benchmarking reveals gaps', desc: 'Comparing against peer buildings surfaces issues that look normal in isolation but signal underperformance.' },
                { icon: '⚡', title: 'Early signals matter',   desc: 'Buildings with declining scores tend to escalate — early detection enables intervention before issues compound.' },
                { icon: '💰', title: 'NOI impact is real',     desc: 'Compliance costs, emergency repairs, and tenant turnover driven by poor conditions have direct effects on returns.' },
              ].map(item => (
                <div key={item.title}>
                  <div className="hp-why-icon">{item.icon}</div>
                  <div className="hp-why-title">{item.title}</div>
                  <div className="hp-why-desc">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── METHODOLOGY ── */}
          <div className="hp-method">
            <div className="hp-section-label">Methodology</div>
            <div className="hp-method-grid">
              {[
                { key: 'Buildings analyzed', val: '34,169 NYC rental properties' },
                { key: 'Data sources',        val: 'HPD, DOB, ECB open datasets'  },
                { key: 'Score range',         val: '0–100 (higher = healthier)'   },
                { key: 'Updated',             val: 'March 2026'                   },
              ].map(m => (
                <div key={m.key}>
                  <span className="hp-method-key">{m.key}</span>
                  <span className="hp-method-val">{m.val}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#9ca3af' }}>
              Full methodology at{' '}
              <a href="https://halfave.co/methodology" style={{ color: 'var(--navy)', textDecoration: 'underline' }}>halfave.co/methodology</a>
            </div>
          </div>

          {/* ── SOFT BRIDGE ── */}
          <div className="hp-bridge">
            <div className="hp-bridge-text">
              <div className="hp-bridge-title">Want to improve your building's performance?</div>
              <div className="hp-bridge-desc">
                Half Ave helps owners turn these signals into action — across leasing, compliance,
                and maintenance. Start by seeing where your building stands.
              </div>
            </div>
            <a href="https://halfave.co" className="hp-bridge-cta">Learn more →</a>
          </div>

          {/* ── FOOTER ── */}
          <div style={{
            paddingTop: 24,
            borderTop: '1px solid var(--navy-10)',
            fontFamily: "'Inter', sans-serif",
            fontSize: 10,
            color: 'var(--slate)',
            lineHeight: 1.7,
          }}>
            Data sourced from NYC HPD, DOB, and ECB open datasets. Analysis by{' '}
            <a href="https://halfave.co" style={{ color: 'var(--navy)', textDecoration: 'underline' }}>Half Ave</a>.
            Provided for informational purposes only. Statistics reflect a snapshot and may not
            reflect real-time conditions. Methodology:{' '}
            <a href="https://halfave.co/methodology" style={{ color: 'var(--navy)', textDecoration: 'underline' }}>halfave.co/methodology</a>.
          </div>

        </div>
      </div>
    </>
  );
}