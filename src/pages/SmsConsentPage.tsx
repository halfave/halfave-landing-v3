import { useEffect } from 'react'

interface Props {
  onBack?: () => void
}

export default function SmsConsentPage({ onBack }: Props) {
  useEffect(() => {
    document.title = 'SMS Communication Consent — Half/Ave'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      background: '#f5f5f5',
      color: '#1e2e45',
      lineHeight: 1.65,
      minHeight: '100vh',
    }}>
      {/* Top bar */}
      <header style={{
        background: '#111e30',
        padding: '1.1rem 5%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <a
          href="/"
          onClick={(e) => { if (onBack) { e.preventDefault(); onBack() } }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', color: '#fff' }}
        >
          <span style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: '1.35rem',
            fontWeight: 600,
            letterSpacing: '-0.02em',
          }}>
            Half/Ave
          </span>
        </a>
        <a
          href="/"
          onClick={(e) => { if (onBack) { e.preventDefault(); onBack() } }}
          style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}
        >
          ← Back to home
        </a>
      </header>

      {/* Main content */}
      <main style={{
        maxWidth: '760px',
        margin: '0 auto',
        padding: '4rem 1.5rem 6rem',
      }}>
        <div style={{
          background: '#ffffff',
          borderRadius: '14px',
          padding: 'clamp(2rem, 5vw, 3.5rem)',
          boxShadow: '0 1px 3px rgba(17,30,48,0.06), 0 1px 2px rgba(17,30,48,0.04)',
        }}>
          <div style={{ marginBottom: '2.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
            <p style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#6b7280',
              margin: '0 0 0.75rem',
            }}>
              Legal
            </p>
            <h1 style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: 'clamp(1.9rem, 4.5vw, 2.5rem)',
              fontWeight: 600,
              color: '#111e30',
              margin: '0 0 0.5rem',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}>
              SMS Communication Consent
            </h1>
            <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>
              Half/Ave AI Property Assistant · Last updated April 2026
            </p>
          </div>

          <Section>
            <p>
              By providing your mobile phone number to your property manager or leasing office,
              you consent to receive SMS text messages from Half/Ave on behalf of your property
              management company regarding your tenancy.
            </p>
          </Section>

          <H2>What messages you'll receive</H2>
          <Section>
            <ul style={listStyle}>
              <li>Answers to questions you text about your lease, rent, and building policies</li>
              <li>Building announcements and service updates</li>
              <li>Maintenance request confirmations and status updates</li>
              <li>Rent and account-related reminders</li>
            </ul>
            <p style={{ marginTop: '1rem' }}>
              All messages are strictly transactional and service-related. We do not send marketing
              or promotional content through this number.
            </p>
          </Section>

          <H2>Message frequency</H2>
          <Section>
            <p>
              Message frequency varies based on your inquiries and your property manager's
              communications. You should expect to receive responses whenever you text questions
              to the assistant.
            </p>
          </Section>

          <H2>How you opt in</H2>
          <Section>
            <p>
              You opt in by providing your mobile number to your property manager during lease
              signing, on a tenant intake form, or by texting our assistant directly. Consent to
              receive SMS messages is <strong>not a condition</strong> of your lease or tenancy.
            </p>
          </Section>

          <H2>How to opt out</H2>
          <Callout>
            Reply <strong>STOP</strong> to any message at any time to unsubscribe. You will
            receive a single confirmation and no further messages will be sent. Reply{' '}
            <strong>HELP</strong> at any time for support information.
          </Callout>

          <H2>Costs</H2>
          <Section>
            <p>
              Message and data rates may apply depending on your mobile carrier plan. Half/Ave
              does not charge you directly to use the SMS assistant.
            </p>
          </Section>

          <H2>Privacy</H2>
          <Section>
            <p>
              Your phone number and message contents are used solely to provide the SMS assistant
              service. We do not sell or share your mobile information with third parties for
              marketing purposes. For full details, see our{' '}
              <a href="/privacy" style={linkStyle}>Privacy Policy</a>.
            </p>
          </Section>

          <H2>Sample message</H2>
          <Section>
            <div style={sampleStyle}>
              Hi Alex, this is the Half/Ave assistant for Maple Court. Rent is $2,400/month,
              due the 1st with a 5-day grace period. Late fee is $75 after the 5th. Reply STOP
              to unsubscribe.
            </div>
          </Section>

          <H2>Questions</H2>
          <Section>
            <p>
              Contact us at <a href="mailto:hello@halfave.co" style={linkStyle}>hello@halfave.co</a>.
            </p>
          </Section>

          <div style={{
            marginTop: '3rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid #e5e7eb',
            fontSize: '0.85rem',
            color: '#6b7280',
            display: 'flex',
            gap: '1.25rem',
            flexWrap: 'wrap',
          }}>
            <a href="/privacy" style={linkStyle}>Privacy Policy</a>
            <a href="/" onClick={(e) => { if (onBack) { e.preventDefault(); onBack() } }} style={linkStyle}>
              Half/Ave
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

// ── Small building blocks ─────────────────────────────

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: "'Lora', Georgia, serif",
      fontSize: '1.15rem',
      fontWeight: 600,
      color: '#111e30',
      margin: '2.25rem 0 0.75rem',
      letterSpacing: '-0.01em',
    }}>
      {children}
    </h2>
  )
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: '0.95rem', color: '#374151' }}>
      {children}
    </div>
  )
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: '#f0fdf4',
      borderLeft: '3px solid #15803d',
      padding: '1rem 1.25rem',
      borderRadius: '6px',
      margin: '0.75rem 0',
      fontSize: '0.95rem',
      color: '#111e30',
    }}>
      {children}
    </div>
  )
}

const linkStyle: React.CSSProperties = {
  color: '#111e30',
  textDecoration: 'underline',
  textUnderlineOffset: '2px',
}

const listStyle: React.CSSProperties = {
  paddingLeft: '1.5rem',
  margin: '0.5rem 0',
}

const sampleStyle: React.CSSProperties = {
  fontFamily: "ui-monospace, 'SF Mono', Consolas, monospace",
  fontSize: '0.85rem',
  background: '#f9fafb',
  padding: '1rem 1.25rem',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
  color: '#374151',
  lineHeight: 1.55,
}
