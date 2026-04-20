import { useEffect } from 'react'

interface Props {
  onBack?: () => void
}

export default function PrivacyPage({ onBack }: Props) {
  useEffect(() => {
    document.title = 'Privacy Policy — Half/Ave'
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
              Privacy Policy
            </h1>
            <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>
              Half Ave Company LLC · Effective April 2026
            </p>
          </div>

          <Section>
            <p>
              This Privacy Policy describes how Half/Ave ("we," "us," "our") collects, uses, and
              protects information when you interact with our products, including our building
              intelligence platform and our AI property management assistant.
            </p>
          </Section>

          <H2>1. Information we collect</H2>
          <H3>Information you provide</H3>
          <Section>
            <ul style={listStyle}>
              <li><strong>Contact information:</strong> name, email address, mobile phone number</li>
              <li><strong>Tenancy information:</strong> unit number, building, lease details provided by your property manager</li>
              <li><strong>Message content:</strong> the text of SMS messages you send to our assistant</li>
              <li><strong>Account information:</strong> credentials and role for platform users (property managers, staff)</li>
            </ul>
          </Section>

          <H3>Information collected automatically</H3>
          <Section>
            <ul style={listStyle}>
              <li>Timestamps of messages sent and received</li>
              <li>Message delivery status</li>
              <li>Login times and actions taken within the platform</li>
              <li>Carrier and device information provided by our telecom partner</li>
            </ul>
          </Section>

          <H2>2. How we use your information</H2>
          <Section>
            <p>We use the information we collect to:</p>
            <ul style={listStyle}>
              <li>Respond to your questions about your lease, building, and tenancy</li>
              <li>Route emergency and urgent requests to your property manager</li>
              <li>Maintain conversation history so the assistant can provide relevant answers</li>
              <li>Send building announcements and service updates from your property manager</li>
              <li>Operate and improve our building intelligence platform</li>
              <li>Maintain security and authenticate platform users</li>
              <li>Comply with legal obligations</li>
            </ul>
          </Section>

          <H2>3. SMS and mobile information</H2>
          <Callout>
            <strong>No mobile information will be shared with third parties or affiliates for
            marketing or promotional purposes.</strong> Information sharing with subcontractors
            who support our services (such as our SMS delivery provider and our AI provider)
            is permitted solely to provide the service. All other categories exclude text
            messaging originator opt-in data and consent; this information will not be shared
            with any third parties.
          </Callout>
          <Section>
            <p>
              See our <a href="/sms-consent" style={linkStyle}>SMS Consent page</a> for full
              details on SMS communications, opt-in, and opt-out.
            </p>
          </Section>

          <H2>4. How we share your information</H2>
          <Section>
            <p>We share information only as described below:</p>
            <ul style={listStyle}>
              <li>
                <strong>Your property manager:</strong> we share your messages and conversation
                history with the property management company you are a tenant of, since they
                are the party you are communicating with through our service.
              </li>
              <li>
                <strong>Service providers:</strong> we use Twilio for SMS delivery, Anthropic
                for AI processing, and Supabase (on AWS infrastructure) for data storage.
                These providers receive only the data necessary to perform their services and
                are bound by confidentiality obligations.
              </li>
              <li>
                <strong>Public building data:</strong> our building intelligence platform
                operates on publicly-available records from NYC agencies (HPD, DOB, DSNY,
                DOHMH, NYPD, OATH). This data is aggregated by BIN and is not linked to
                individual tenants.
              </li>
              <li>
                <strong>Legal requirements:</strong> we may disclose information if required
                by law, subpoena, or other legal process, or to protect the safety of any
                person.
              </li>
            </ul>
            <p style={{ marginTop: '1rem' }}>
              We do <strong>not</strong> sell your personal information, and we do{' '}
              <strong>not</strong> share your phone number or message content with third
              parties for marketing purposes.
            </p>
          </Section>

          <H2>5. Data storage and security</H2>
          <Section>
            <p>
              Data is stored securely via Supabase on AWS infrastructure. All data is encrypted
              in transit (TLS) and at rest using industry-standard encryption protocols. We
              implement reasonable technical and organizational measures including access
              controls and secure infrastructure to protect your information. No system is
              perfectly secure, but we work to continuously improve our safeguards.
            </p>
          </Section>

          <H2>6. Data retention</H2>
          <Section>
            <p>
              We retain message history and associated tenant data for as long as you are a
              tenant of a building served by Half/Ave, plus a reasonable period afterward for
              legal and operational purposes (typically up to 2 years). Upon request or when
              your tenancy ends, we will delete your data in accordance with applicable law.
            </p>
          </Section>

          <H2>7. Tenant data</H2>
          <Section>
            <p>
              Tenant personal information is handled in accordance with applicable laws
              including the NYC Housing Maintenance Code and applicable state and federal
              privacy regulations.
            </p>
          </Section>

          <H2>8. Your rights and choices</H2>
          <Section>
            <ul style={listStyle}>
              <li><strong>Opt out of SMS:</strong> Reply STOP to any message at any time.</li>
              <li>
                <strong>Access, correction, deletion:</strong> Contact us at{' '}
                <a href="mailto:hello@halfave.co" style={linkStyle}>hello@halfave.co</a> to
                request a copy of your data, corrections, or deletion.
              </li>
              <li>
                <strong>California residents:</strong> Under the CCPA, you have the right to
                know what personal information is collected about you, to request deletion,
                and to opt out of any "sale" of your data (we do not sell personal information).
              </li>
            </ul>
          </Section>

          <H2>9. Cookies</H2>
          <Section>
            <p>
              We use session cookies solely for authentication purposes on our platform. We do
              not use tracking cookies or third-party advertising cookies.
            </p>
          </Section>

          <H2>10. Children's privacy</H2>
          <Section>
            <p>
              Our service is not directed to children under 13, and we do not knowingly collect
              personal information from children under 13.
            </p>
          </Section>

          <H2>11. Changes to this policy</H2>
          <Section>
            <p>
              We may update this Privacy Policy from time to time. Material changes will be
              communicated through our website or via SMS. The "Effective" date at the top
              indicates the most recent update.
            </p>
          </Section>

          <H2>12. Contact us</H2>
          <Section>
            <p>
              Questions about this Privacy Policy or our data practices? Reach us at{' '}
              <a href="mailto:hello@halfave.co" style={linkStyle}>hello@halfave.co</a>.
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
            <a href="/sms-consent" style={linkStyle}>SMS Consent</a>
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

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{
      fontSize: '0.95rem',
      fontWeight: 600,
      color: '#1e2e45',
      margin: '1.25rem 0 0.5rem',
    }}>
      {children}
    </h3>
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
      lineHeight: 1.55,
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
