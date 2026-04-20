import { useState, useEffect } from 'react'
import type { Building } from './types'
import MainSitePage from './pages/MainSitePage'
import EmailGatePage from './pages/EmailGatePage'
import ReportPage from './pages/ReportPage'
import RiskIndexPage from './pages/RiskIndexPage'
import HealthPage from './pages/HealthPage'
import BuildingPage from './pages/BuildingPage'
import ZipRankingsPage from './pages/ZipRankingsPage'
import SmsConsentPage from './pages/SmsConsentPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'

type Step = 'main' | 'email' | 'report' | 'risk' | 'health' | 'building' | 'zip-rankings' | 'sms-consent' | 'privacy' | 'terms'

// Extract building slug from /buildings/:slug
function getBuildingSlug(): string | null {
  const match = window.location.pathname.match(/^\/buildings\/(.+)/)
  return match ? match[1] : null
}

function getInitialZipBorough(): string {
  const m = window.location.pathname.match(/^\/zip-rankings\/(.+)/)
  return m ? m[1] : ''
}

function getInitialStep(): Step {
  const path = window.location.pathname
  const slug = getBuildingSlug()
  const zipMatch = path.match(/^\/zip-rankings\/(.+)/)
  if (zipMatch)                          return 'zip-rankings'
  if (slug)                              return 'building'
  if (path === '/risk' || window.location.hash === '#risk') return 'risk'
  if (path === '/health')                return 'health'
  if (path === '/sms-consent')           return 'sms-consent'
  if (path === '/privacy')               return 'privacy'
  if (path === '/terms')                 return 'terms'
  const params = new URLSearchParams(window.location.search)
  if ((path === '/report' || params.has('bin')) && params.get('bin')) return 'report'
  return 'main'
}

export default function App() {
  const [step, setStep]             = useState<Step>(getInitialStep)
  const [slug, setSlug]             = useState<string | null>(getBuildingSlug)
  const [zipBorough, setZipBorough] = useState<string>(getInitialZipBorough)
  const [building, setBuilding]     = useState<Building | null>(null)
  const [email, setEmail]           = useState('')

  useEffect(() => {
    if (step === 'risk')              window.history.pushState({}, '', '/risk')
    else if (step === 'health')       window.history.pushState({}, '', '/health')
    else if (step === 'sms-consent')  window.history.pushState({}, '', '/sms-consent')
    else if (step === 'privacy')      window.history.pushState({}, '', '/privacy')
    else if (step === 'terms')        window.history.pushState({}, '', '/terms')
    else if (step === 'main')         window.history.pushState({}, '', '/')
    // building and report don't push — they either came from URL or flow
  }, [step])

  useEffect(() => {
    const onPop = () => {
      const path = window.location.pathname
      const s = getBuildingSlug()
      const zm = window.location.pathname.match(/^\/zip-rankings\/(.+)/)
      if (zm)                           { setZipBorough(zm[1]); setStep('zip-rankings') }
      else if (s)                       { setSlug(s); setStep('building') }
      else if (path === '/risk')          setStep('risk')
      else if (path === '/health')        setStep('health')
      else if (path === '/sms-consent')   setStep('sms-consent')
      else if (path === '/privacy')       setStep('privacy')
      else if (path === '/terms')         setStep('terms')
      else                                setStep('main')
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  function handleGetReport(b: Building) { setBuilding(b); setStep('email') }
  function handleEmailSubmit(e: string) { setEmail(e); setStep('report') }
  function handleReset()    { setBuilding(null); setEmail(''); setStep('main') }
  function handleGoRisk()   { setStep('risk') }
  function handleGoHealth() { setStep('health') }

  switch (step) {
    case 'zip-rankings':
      return <ZipRankingsPage borough={zipBorough} onBack={handleReset} />
    case 'building':
      return <BuildingPage slug={slug!} onBack={handleReset} />
    case 'risk':
      return <RiskIndexPage onBack={handleReset} />
    case 'health':
      return <HealthPage />
    case 'sms-consent':
      return <SmsConsentPage onBack={handleReset} />
    case 'privacy':
      return <PrivacyPage onBack={handleReset} />
    case 'terms':
      return <TermsPage onBack={handleReset} />
    case 'main':
      return <MainSitePage onGetReport={handleGetReport} onGoRisk={handleGoRisk} onGoHealth={handleGoHealth} />
    case 'email':
      return building
        ? <EmailGatePage building={building} onUnlock={handleEmailSubmit} onBack={handleReset} />
        : <MainSitePage onGetReport={handleGetReport} onGoRisk={handleGoRisk} onGoHealth={handleGoHealth} />
    case 'report':
      return building && email
        ? <ReportPage building={building} email={email} onReset={handleReset} onGoRisk={handleGoRisk} />
        : <MainSitePage onGetReport={handleGetReport} onGoRisk={handleGoRisk} onGoHealth={handleGoHealth} />
  }
}
