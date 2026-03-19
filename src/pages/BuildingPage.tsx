import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import ReportPage from './ReportPage'

const sb = createClient(
  'https://mjkkzniagexfooclqsjr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qa2t6bmlhZ2V4Zm9vY2xxc2pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3NDc4OTUsImV4cCI6MjA4NjMyMzg5NX0.RuaeazBn_IFWfXOlQ0ZDDTPsnTApNGmE_WpPi0o52gQ'
)

const BORO_NAME: Record<number, string> = {
  1: 'Manhattan', 2: 'Bronx', 3: 'Brooklyn', 4: 'Queens', 5: 'Staten Island'
}

interface Props {
  slug: string
  onBack: () => void
}

export default function BuildingPage({ slug, onBack }: Props) {
  const [bldgData, setBldgData] = useState<any>(null)
  const [error, setError]       = useState<string | null>(null)
  const [loading, setLoading]   = useState(true)

  // Set page meta dynamically
  useEffect(() => {
    if (bldgData) {
      const addr  = bldgData.building?.address ?? ''
      const boro  = BORO_NAME[bldgData.building?.borough] ?? bldgData.building?.boroName ?? ''
      document.title = `${addr} — NYC Building Health Score | Half Ave`
      const desc  = `Health score, HPD violations, DOB violations, and compliance data for ${addr}, ${boro}. Updated March 2026.`
      let el = document.querySelector('meta[name="description"]')
      if (!el) { el = document.createElement('meta'); el.setAttribute('name', 'description'); document.head.appendChild(el) }
      el.setAttribute('content', desc)
      // canonical
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
      if (!link) { link = document.createElement('link'); link.setAttribute('rel', 'canonical'); document.head.appendChild(link) }
      link.href = `https://halfave.co/buildings/${slug}`
    }
  }, [bldgData, slug])

  useEffect(() => {
    if (!slug) return
    const run = async () => {
      setLoading(true)
      setError(null)

      // Look up BIN from slug
      const { data: row } = await sb
        .schema('analytics')
        .from('buildings')
        .select('bin, address, borough')
        .eq('slug', slug)
        .maybeSingle()

      if (!row) {
        setError('Building not found.')
        setLoading(false)
        return
      }

      // Fetch full report
      try {
        const res = await fetch(
          `https://mjkkzniagexfooclqsjr.supabase.co/functions/v1/bin-lookup?bin=${row.bin}`
        )
        if (!res.ok) throw new Error('Lookup failed')
        const data = await res.json()

        // Set global so ReportPage works
        ;(window as any).__halfaveBldg = {
          bin:        data.building.bin,
          address:    data.building.address,
          borough:    data.building.boroName || data.building.borough,
          riskScore:  data.score.healthScore,
          percentile: data.score.percentile,
          riskBucket: data.score.riskBucket,
          building:   data.building,
          score:      data.score,
          features:   data.features,
          violations: data.violations,
          devices:    data.devices,
          co:         data.co,
        }

        setBldgData(data)
      } catch {
        setError('Could not load building data.')
      }
      setLoading(false)
    }
    run()
  }, [slug])

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', color: '#7a8fa6', fontSize: 14 }}>
      Loading building report…
    </div>
  )

  if (error) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', gap: 16 }}>
      <div style={{ fontSize: 14, color: '#c4533a' }}>{error}</div>
      <button onClick={onBack} style={{ fontSize: 13, color: '#111e30', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>← Search all buildings</button>
    </div>
  )

  if (!bldgData) return null

  // ReportPage reads from window.__halfaveBldg which we set above
  return (
    <ReportPage
      email="direct"
      onReset={onBack}
      onGoRisk={() => {}}
    />
  )
}