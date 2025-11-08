import { StrictMode, useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'

const themes = {
  dark: {
    pageBackground: 'radial-gradient(circle at top, #1e1b4b, #050505 45%)',
    pageBase: '#050505',
    cardBg: 'rgba(2, 6, 23, 0.7)',
    border: 'rgba(148, 163, 184, 0.2)',
    textPrimary: '#f8fafc',
    textMuted: '#cbd5f5',
    badgeBg: 'rgba(99, 102, 241, 0.15)',
    badgeText: '#c7d2fe',
    highlightBg: 'rgba(15, 23, 42, 0.75)',
    highlightLabel: '#94a3b8',
    tagBg: 'rgba(99, 102, 241, 0.1)',
    tagBorder: 'rgba(99, 102, 241, 0.3)',
    accentLink: '#c084fc',
    gradient: 'linear-gradient(120deg, #a855f7, #6366f1)',
    secondaryButtonBg: 'rgba(15, 23, 42, 0.6)',
    secondaryButtonText: '#e2e8f0',
    primaryButtonText: '#050505',
    shadow: '0 30px 120px rgba(15, 23, 42, 0.55)',
  },
  light: {
    pageBackground: 'radial-gradient(circle at top, #f1f5f9, #e2e8f0 55%)',
    pageBase: '#e2e8f0',
    cardBg: 'rgba(255, 255, 255, 0.9)',
    border: 'rgba(148, 163, 184, 0.35)',
    textPrimary: '#0f172a',
    textMuted: '#475569',
    badgeBg: 'rgba(14, 116, 144, 0.12)',
    badgeText: '#0f172a',
    highlightBg: 'rgba(226, 232, 240, 0.9)',
    highlightLabel: '#475569',
    tagBg: 'rgba(14, 165, 233, 0.12)',
    tagBorder: 'rgba(14, 165, 233, 0.4)',
    accentLink: '#7c3aed',
    gradient: 'linear-gradient(120deg, #818cf8, #c084fc)',
    secondaryButtonBg: 'rgba(226, 232, 240, 0.85)',
    secondaryButtonText: '#0f172a',
    primaryButtonText: '#f8fafc',
    shadow: '0 20px 80px rgba(15, 23, 42, 0.2)',
  },
}

const createStyles = (palette) => ({
  page: {
    minHeight: '100vh',
    margin: 0,
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
    background: palette.pageBackground,
    color: palette.textPrimary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    overflowX: 'hidden',
  },
  card: {
    width: '100%',
    maxWidth: 960,
    boxSizing: 'border-box',
    background: palette.cardBg,
    color: palette.textPrimary,
    borderRadius: 28,
    padding: 36,
    border: `1px solid ${palette.border}`,
    boxShadow: palette.shadow,
    backdropFilter: 'blur(16px)',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    padding: '6px 16px',
    borderRadius: 999,
    background: palette.badgeBg,
    color: palette.badgeText,
    fontSize: 14,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  hero: {
    display: 'grid',
    gap: 18,
    marginBottom: 36,
  },
  title: {
    fontSize: 48,
    fontWeight: 700,
    lineHeight: 1.1,
    margin: 0,
  },
  subtitle: {
    fontSize: 20,
    color: palette.textMuted,
    margin: 0,
    maxWidth: 640,
  },
  highlightRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 6,
  },
  highlight: {
    flex: '1 1 160px',
    minWidth: 160,
    borderRadius: 18,
    padding: '14px 18px',
    background: palette.highlightBg,
    border: `1px solid ${palette.border}`,
  },
  highlightLabel: {
    fontSize: 12,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: palette.highlightLabel,
    marginBottom: 4,
  },
  highlightValue: {
    fontSize: 18,
    fontWeight: 600,
  },
  section: {
    marginTop: 24,
    display: 'grid',
    gap: 18,
  },
  sectionTitle: {
    fontSize: 18,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
    color: palette.highlightLabel,
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    padding: '8px 14px',
    borderRadius: 999,
    background: palette.tagBg,
    border: `1px solid ${palette.tagBorder}`,
    fontSize: 14,
    color: palette.textPrimary,
  },
  projects: {
    display: 'grid',
    gap: 16,
  },
  projectCard: {
    borderRadius: 24,
    padding: 20,
    background: palette.cardBg,
    border: `1px solid ${palette.border}`,
    display: 'grid',
    gap: 8,
  },
  projectTitle: {
    margin: 0,
    fontSize: 22,
    fontWeight: 600,
  },
  projectDescription: {
    margin: 0,
    color: palette.textMuted,
  },
  ctaRow: {
    marginTop: 32,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 14,
  },
  primaryButton: {
    padding: '14px 24px',
    borderRadius: 999,
    border: 'none',
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    color: palette.primaryButtonText,
    background: palette.gradient,
  },
  secondaryButton: {
    padding: '14px 24px',
    borderRadius: 999,
    border: `1px solid ${palette.border}`,
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    color: palette.secondaryButtonText,
    background: palette.secondaryButtonBg,
  },
})

const FALLBACK_SCHEME = 'dark'

const HIGHLIGHTS = [
  { label: 'Rol', value: 'Backend Developer' },
  { label: 'Deneyim', value: '5+ Yıl' },
  { label: 'Fokus', value: 'Ölçeklenebilir API & Platformlar' },
]

const STRENGTHS = ['Mikroservis Mimari', 'API Tasarımı', 'Veri Modellemesi', 'Observability', 'CI/CD Automation', 'Bulut Yerelleştirme']

const PROJECTS = [
  {
    title: 'Leptos Commerce Core',
    description: 'Rust ve Leptos ile yazılmış, gerçek zamanlı stok ve akış tabanlı ödeme akışlarına sahip headless e-ticaret vitrini.',
    tech: ['Rust', 'Leptos', 'Actix Web', 'MongoDB'],
  },
]

const getPreferredScheme = () => {
  if (typeof window === 'undefined' || !window.matchMedia) return FALLBACK_SCHEME
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

const usePreferredScheme = () => {
  const [scheme, setScheme] = useState(getPreferredScheme)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined
    const media = window.matchMedia('(prefers-color-scheme: light)')
    const handleChange = (event) => setScheme(event.matches ? 'light' : 'dark')
    setScheme(media.matches ? 'light' : 'dark')

    if (media.addEventListener) {
      media.addEventListener('change', handleChange)
      return () => media.removeEventListener('change', handleChange)
    }

    media.addListener(handleChange)
    return () => media.removeListener(handleChange)
  }, [])

  return scheme
}

const App = () => {
  const scheme = usePreferredScheme()
  const palette = themes[scheme] ?? themes[FALLBACK_SCHEME]
  const styles = useMemo(() => createStyles(palette), [palette])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = 'slore1337 - Backend Developer'
    }
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') return undefined
    const { body, documentElement } = document
    const previous = {
      bodyBackground: body.style.background,
      bodyMargin: body.style.margin,
      bodyOverflowX: body.style.overflowX,
      htmlBackground: documentElement.style.backgroundColor,
    }

    body.style.margin = '0'
    body.style.background = palette.pageBackground
    body.style.overflowX = 'hidden'
    documentElement.style.backgroundColor = palette.pageBase

    return () => {
      body.style.background = previous.bodyBackground
      body.style.margin = previous.bodyMargin
      body.style.overflowX = previous.bodyOverflowX
      documentElement.style.backgroundColor = previous.htmlBackground
    }
  }, [palette.pageBackground, palette.pageBase])

  return (
    <div style={styles.page}>
      <main style={styles.card}>
        <section style={styles.hero}>
          <span style={styles.badge}>slore1337 · Backend Engineered</span>
          <h1 style={styles.title}>Modern ürünlere güç veren ölçeklenebilir servisler tasarlıyorum.</h1>
          <p style={styles.subtitle}>
            5+ yıllık deneyimim boyunca ödeme sistemleri, developer platformları ve veri yoğun SaaS ürünlerinin
            altyapı tarafını tasarladım. Performans, güvenlik ve bakım kolaylığını aynı denklemde tutmayı seviyorum.
          </p>
          <div style={styles.highlightRow}>
            {HIGHLIGHTS.map((item) => (
              <div key={item.label} style={styles.highlight}>
                <div style={styles.highlightLabel}>{item.label}</div>
                <div style={styles.highlightValue}>{item.value}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.sectionTitle}>Teknik rahatlık alanım</div>
          <div style={styles.tags}>
            {STRENGTHS.map((skill) => (
              <span key={skill} style={styles.tag}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.sectionTitle}>Öne çıkan projeler</div>
          <div style={styles.projects}>
            {PROJECTS.map((project) => (
              <article key={project.title} style={styles.projectCard}>
                <h3 style={styles.projectTitle}>{project.title}</h3>
                <p style={styles.projectDescription}>{project.description}</p>
                <div style={styles.tags}>
                  {project.tech.map((tech) => (
                    <span key={tech} style={{ ...styles.tag, fontSize: 12 }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <div style={styles.ctaRow}>
          <a href="https://github.com/slore1337" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
            <button style={styles.primaryButton}>GitHub Profilim</button>
          </a>
          <a href="mailto:slore1337@slore1337.com" style={{ textDecoration: 'none' }}>
            <button style={styles.secondaryButton}>Yeni projeni konuşalım</button>
          </a>
        </div>
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
