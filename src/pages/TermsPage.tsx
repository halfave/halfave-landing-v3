import { useEffect } from 'react'

interface Props {
  onBack?: () => void
}

export default function TermsPage({ onBack }: Props) {
  useEffect(() => {
    document.title = 'Terms of Service — Half/Ave'
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
              Terms of Service
            </h1>
            <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>
              Half Ave Company LLC · Effective April 2026
            </p>
          </div>

          <Section>
            <p>
              Welcome to Half/Ave. These Terms of Service ("Terms") govern your access to and
              use of the Half/Ave website (halfave.co), the Half/Ave application (app.halfave.co),
              our AI SMS assistant, our building intelligence platform, and any other services
              we provide (collectively, the "Services"). By accessing or using the Services, you
              agree to be bound by these Terms. If you do not agree, you may not access or use
              the Services.
            </p>
          </Section>

          <H2>1. Who may use the Services</H2>
          <Section>
            <p>
              You must be at least 18 years old and capable of forming a binding contract to
              use the Services. If you are using the Services on behalf of a business or other
              legal entity, you represent that you have the authority to bind that entity to
              these Terms.
            </p>
          </Section>

          <H2>2. Description of Services</H2>
          <Section>
            <p>Half/Ave provides:</p>
            <ul style={listStyle}>
              <li>
                <strong>Building intelligence platform:</strong> Aggregated analysis of
                publicly-available records about NYC residential buildings (HPD, DOB, DSNY,
                DOHMH, NYPD, OATH, and related agencies).
              </li>
              <li>
                <strong>Property management application:</strong> A platform for property
                managers, staff, and authorized users to manage building operations, tenants,
                and maintenance.
              </li>
              <li>
                <strong>AI SMS assistant:</strong> An AI-powered service that answers tenant
                questions about their lease and building via text message.
              </li>
            </ul>
          </Section>

          <H2>3. Account responsibility</H2>
          <Section>
            <p>
              If you create an account, you are responsible for maintaining the confidentiality
              of your credentials and for all activity that occurs under your account. Notify
              us or your administrator immediately if you suspect unauthorized access. You may
              not share credentials, create accounts by automated means, or use the Services in
              a way that attempts to access systems or data you are not authorized to access.
            </p>
          </Section>

          <H2>4. Tenant and building data</H2>
          <Section>
            <p>
              All tenant, financial, and property data accessed through the Services is
              confidential. You may not export, share, or use this data outside of authorized
              business purposes. Property managers and their authorized users are responsible
              for ensuring their use of tenant data complies with applicable laws, including
              the NYC Housing Maintenance Code and applicable state and federal privacy
              regulations.
            </p>
          </Section>

          <H2>5. Public data accuracy</H2>
          <Section>
            <p>
              Our building intelligence platform operates on publicly-available records from
              NYC agencies. While we work to keep this data accurate and current, we cannot
              guarantee completeness or freshness. Building Health Scores, risk assessments,
              and compliance flags are informational only and should not be the sole basis for
              financial, legal, or operational decisions. Always verify critical information
              directly with the relevant agency.
            </p>
          </Section>

          <H2>6. AI SMS assistant</H2>
          <Section>
            <p>
              The AI SMS assistant provides answers based on the lease and building information
              provided to it. Answers are generated by an AI model and may occasionally be
              incomplete or incorrect. Tenants should confirm any material information (lease
              terms, payment obligations, deadlines, policy exceptions) directly with their
              property manager. The assistant is not a substitute for legal, financial, or
              professional advice.
            </p>
            <p style={{ marginTop: '1rem' }}>
              In emergencies, tenants should call 911 or the building's 24/7 maintenance line
              directly — not rely on the SMS assistant.
            </p>
            <p style={{ marginTop: '1rem' }}>
              SMS communications are also governed by our{' '}
              <a href="/sms-consent" style={linkStyle}>SMS Consent</a> terms.
            </p>
          </Section>

          <H2>7. Acceptable use</H2>
          <Section>
            <p>You agree not to:</p>
            <ul style={listStyle}>
              <li>Use the Services for any unlawful purpose or in violation of these Terms</li>
              <li>Attempt to access systems, data, or accounts you are not authorized to access</li>
              <li>Reverse engineer, decompile, or attempt to extract source code from the Services</li>
              <li>Scrape, harvest, or bulk-extract data from the Services</li>
              <li>Submit false, misleading, or fraudulent information</li>
              <li>Interfere with, disrupt, or overload the Services or related infrastructure</li>
              <li>Use the Services to harass, abuse, or harm another person</li>
              <li>Circumvent any rate limits, usage restrictions, or access controls</li>
            </ul>
          </Section>

          <H2>8. Intellectual property</H2>
          <Section>
            <p>
              All content, features, functionality, and software of Half/Ave, including but not
              limited to text, graphics, logos, designs, algorithms, scoring methodologies, and
              software code, are owned by Half Ave Company LLC or its licensors and are
              protected by applicable intellectual property laws. You are granted a limited,
              non-exclusive, non-transferable license to use the Services solely as permitted
              by these Terms.
            </p>
          </Section>

          <H2>9. User content</H2>
          <Section>
            <p>
              You retain ownership of any content you submit to the Services (for example,
              messages to the AI assistant, data you upload through the platform). By submitting
              content, you grant Half/Ave a worldwide, non-exclusive, royalty-free license to
              use, store, process, and display that content solely to operate and improve the
              Services.
            </p>
          </Section>

          <H2>10. Third-party services</H2>
          <Section>
            <p>
              The Services rely on third-party providers including Twilio (SMS delivery),
              Anthropic (AI processing), and Supabase on AWS infrastructure (data storage).
              Your use of the Services is also subject to the terms of these providers where
              applicable. Half/Ave is not responsible for the acts or omissions of third-party
              providers beyond our reasonable control.
            </p>
          </Section>

          <H2>11. Disclaimers</H2>
          <Section>
            <p>
              THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY
              KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR ACCURACY.
              HALF/AVE DOES NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE,
              OR FREE OF HARMFUL COMPONENTS.
            </p>
          </Section>

          <H2>12. Limitation of liability</H2>
          <Section>
            <p>
              TO THE FULLEST EXTENT PERMITTED BY LAW, HALF/AVE, ITS AFFILIATES, OFFICERS,
              EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
              CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL,
              ARISING OUT OF OR RELATING TO YOUR USE OF THE SERVICES, WHETHER BASED ON CONTRACT,
              TORT, OR ANY OTHER LEGAL THEORY, EVEN IF HALF/AVE HAS BEEN ADVISED OF THE
              POSSIBILITY OF SUCH DAMAGES.
            </p>
          </Section>

          <H2>13. Indemnification</H2>
          <Section>
            <p>
              You agree to indemnify and hold harmless Half/Ave and its affiliates from any
              claims, damages, losses, or expenses (including reasonable attorneys' fees)
              arising from your use of the Services, your violation of these Terms, or your
              violation of any rights of a third party.
            </p>
          </Section>

          <H2>14. Termination</H2>
          <Section>
            <p>
              We may suspend or terminate your access to the Services at any time, with or
              without notice, for conduct that we believe violates these Terms or is harmful
              to Half/Ave, other users, or third parties. Upon termination, you must cease all
              use of the Services and any confidential data. Provisions that by their nature
              should survive termination will do so, including intellectual property,
              disclaimers, limitation of liability, and governing law.
            </p>
          </Section>

          <H2>15. Changes to these Terms</H2>
          <Section>
            <p>
              We may update these Terms from time to time. Material changes will be communicated
              through the Services or via email. Continued use of the Services after changes
              take effect constitutes acceptance of the revised Terms.
            </p>
          </Section>

          <H2>16. Governing law</H2>
          <Section>
            <p>
              These Terms are governed by the laws of the State of New York, without regard to
              conflict of law principles. Any dispute arising out of or relating to these Terms
              or the Services shall be resolved in the state or federal courts located in
              New York County, New York, and you consent to the personal jurisdiction of those
              courts.
            </p>
          </Section>

          <H2>17. Contact</H2>
          <Section>
            <p>
              Questions about these Terms? Reach us at{' '}
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
            <a href="/privacy" style={linkStyle}>Privacy Policy</a>
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

function Section({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: '0.95rem', color: '#374151' }}>
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
