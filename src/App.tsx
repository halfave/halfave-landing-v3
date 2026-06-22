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
import MayaPage from './pages/MayaPage'
import BlogPage from './pages/BlogPage'

type Step = 'maya' | 'main' | 'email' | 'report' | 'risk' | 'health' | 'building' | 'zip-rankings' | 'sms-consent' | 'privacy' | 'terms' | 'blog'

// Extract blog post slug from /blog/:slug (null on the /blog index)
function getBlogSlug(): string | null {
  const m = window.location.pathname.match(/^\/blog\/(.+)/)
  return m ? m[1] : null
}

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
  if (path === '/blog' || path.startsWith('/blog/')) return 'blog'
  if (path === '/risk' || window.location.hash === '#risk') return 'risk'
  if (path === '/health')                return 'health'
  if (path === '/sms-consent')           return 'sms-consent'
  if (path === '/privacy')               return 'privacy'
  if (path === '/terms')                 return 'terms'
  if (path === '/building-health-score') return 'main'   // old homepage, preserved
  const params = new URLSearchParams(window.location.search)
  if ((path === '/report' || params.has('bin')) && params.get('bin')) return 'report'
  return 'maya'                                           // new homepage
}

export default function App() {
  const [step, setStep]             = useState<Step>(getInitialStep)
  const [slug, setSlug]             = useState<string | null>(getBuildingSlug)
  const [blogSlug, setBlogSlug]     = useState<string | null>(getBlogSlug)
  const [zipBorough, setZipBorough] = useState<string>(getInitialZipBorough)
  const [building, setBuilding]     = useState<Building | null>(null)
  const [email, setEmail]           = useState('')

  useEffect(() => {
    if (step === 'maya')              window.history.pushState({}, '', '/')
    else if (step === 'risk')         window.history.pushState({}, '', '/risk')
    else if (step === 'health')       window.history.pushState({}, '', '/health')
    else if (step === 'sms-consent')  window.history.pushState({}, '', '/sms-consent')
    else if (step === 'privacy')      window.history.pushState({}, '', '/privacy')
    else if (step === 'terms')        window.history.pushState({}, '', '/terms')
    else if (step === 'main')         window.history.pushState({}, '', '/building-health-score')
    else if (step === 'blog' && !blogSlug) window.history.pushState({}, '', '/blog')
    // building, report, and blog-post URLs are pushed by their own handlers / came from URL
  }, [step, blogSlug])

  useEffect(() => {
    const onPop = () => {
      const path = window.location.pathname
      const s = getBuildingSlug()
      const zm = window.location.pathname.match(/^\/zip-rankings\/(.+)/)
      if (zm)                                    { setZipBorough(zm[1]); setStep('zip-rankings') }
      else if (s)                                { setSlug(s); setStep('building') }
      else if (path === '/blog' || path.startsWith('/blog/')) { setBlogSlug(getBlogSlug()); setStep('blog') }
      else if (path === '/risk')                   setStep('risk')
      else if (path === '/health')                 setStep('health')
      else if (path === '/sms-consent')            setStep('sms-consent')
      else if (path === '/privacy')                setStep('privacy')
      else if (path === '/terms')                  setStep('terms')
      else if (path === '/building-health-score')  setStep('main')
      else                                         setStep('maya')
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  function handleGetReport(b: Building) { setBuilding(b); setStep('email') }
  function handleEmailSubmit(e: string) { setEmail(e); setStep('report') }
  function handleReset()    { setBuilding(null); setEmail(''); setStep('maya') }
  function handleGoRisk()   { setStep('risk') }
  function handleGoHealth() { setStep('health') }
  function handleGoTool()   { setStep('main') }
  function handleGoBlog()   { setBlogSlug(null); window.history.pushState({}, '', '/blog'); setStep('blog') }
  function handleGoPost(s: string) { setBlogSlug(s); window.history.pushState({}, '', `/blog/${s}`); setStep('blog') }
  function handleGoHome()   { setStep('maya') }

  switch (step) {
    case 'maya':
      return <MayaPage onGoTool={handleGoTool} onGoBlog={handleGoBlog} onGoPost={handleGoPost} />
    case 'blog':
      return <BlogPage slug={blogSlug} onHome={handleGoHome} onGoBlog={handleGoBlog} onGoPost={handleGoPost} />
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