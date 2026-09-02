'use client'
import { useState, useEffect, useCallback } from 'react'
import PlayButton from './PlayButton'
import styles from './Hero.module.css'

// ─── Configuration ─────────────────────────────────────────────────────────────
const APP_URL = (process.env.NEXT_PUBLIC_APP_URL ?? '').replace(/\/$/, '')

const FIREBASE_CONFIG = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const CYCLE_WORDS = ['FAST-NU', 'NUST-NET', 'NTS']

// ─── Custom Hooks ──────────────────────────────────────────────────────────────

function useCycleWords(words, intervalMs = 2600) {
  const [currentIndex, setCurrentIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % words.length)
    }, intervalMs)
    return () => clearInterval(id)
  }, [words, intervalMs])
  return words.map((word, idx) => ({ word, isActive: idx === currentIndex }))
}

function useFirebaseAuth() {
  const [status, setStatus] = useState('idle')
  const [firstName, setFirstName] = useState(null)

  useEffect(() => {
    let isMounted = true

    const init = async () => {
      try {
        const isConfigValid = Object.values(FIREBASE_CONFIG).every(v => v && v.length > 0)
        if (!isConfigValid) {
          if (isMounted) setStatus('out')
          return
        }

        const [{ initializeApp, getApps }, { getAuth, onAuthStateChanged }] =
          await Promise.all([import('firebase/app'), import('firebase/auth')])

        const app = getApps().length ? getApps()[0] : initializeApp(FIREBASE_CONFIG)
        const auth = getAuth(app)

        const unsubscribe = onAuthStateChanged(auth, user => {
          if (!isMounted) return
          if (user) {
            setStatus('in')
            const name = user.displayName?.trim().split(/\s+/)[0] ?? null
            setFirstName(name)
          } else {
            setStatus('out')
            setFirstName(null)
          }
        })

        return () => {
          unsubscribe()
        }
      } catch (err) {
        console.warn('[Ustaad] Firebase auth init failed:', err.message)
        if (isMounted) setStatus('out')
      }
    }

    let cleanup
    init().then(unsub => { cleanup = unsub })

    return () => {
      isMounted = false
      cleanup?.()
    }
  }, [])

  return { status, firstName }
}

function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const els = document.querySelectorAll('[data-reveal]')
    if (!els.length) return

    els.forEach((el, i) => {
      el.classList.add(styles.revealUp)
      el.style.transitionDelay = `${i * 0.08}s`
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('ustaad-revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )

    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ─── Owl Loading Overlay ───────────────────────────────────────────────────────
function OwlLoader({ message }) {
  return (
    <div
      role="status"
      aria-label="Loading Ustaad"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10,14,46,0.93)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        gap: '20px',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <div style={{
        fontSize: '64px',
        lineHeight: 1,
        animation: 'ustaadOwlBounce 0.75s ease-in-out infinite alternate',
      }}>
        🦉
      </div>

      <div style={{
        fontSize: '22px',
        fontWeight: 700,
        color: '#fff',
        letterSpacing: '0.5px',
      }}>
        Ustaad
      </div>

      <div style={{
        fontSize: '14px',
        fontWeight: 400,
        color: 'rgba(255,255,255,0.65)',
        maxWidth: '220px',
        textAlign: 'center',
        lineHeight: 1.5,
      }}>
        {message}
      </div>

      <div style={{
        width: '140px',
        height: '3px',
        background: 'rgba(255,255,255,0.12)',
        borderRadius: '99px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          borderRadius: '99px',
          background: 'linear-gradient(90deg, #6C63FF, #9C89FF, #6C63FF)',
          backgroundSize: '200% 100%',
          animation: 'ustaadBarSweep 1.4s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes ustaadOwlBounce {
          from { transform: translateY(0px) rotate(-6deg) scale(1); }
          to   { transform: translateY(-18px) rotate(6deg) scale(1.05); }
        }
        @keyframes ustaadBarSweep {
          0%   { background-position: 200% 0; width: 30%; margin-left: 0%;   }
          50%  { background-position: 0%   0; width: 60%; margin-left: 20%;  }
          100% { background-position: 200% 0; width: 30%; margin-left: 70%;  }
        }
      `}</style>
    </div>
  )
}

// ─── StatsStrip (only sub-component left) ─────────────────────────────────────
// Every figure here has to be one we can defend if a student asks. The MCQ
// count is the number actually uploaded to Firestore — update it when the
// extractor ships a new batch, don't round it up.
function StatsStrip() {
  return (
    <div className={styles.strip}>
      <div className={styles.stripItem}>
        <span className={styles.stripNum}>3,900+</span>
        <span className={styles.stripLbl}>MCQs</span>
      </div>
      <div className={styles.stripSep} />
      <div className={styles.stripItem}>
        <span className={styles.stripNum}>3</span>
        <span className={styles.stripLbl}>Exams covered</span>
      </div>
      <div className={styles.stripSep} />
      <div className={styles.stripItem}>
        <span className={styles.stripNum}>Free</span>
        <span className={styles.stripLbl}>to start</span>
      </div>
    </div>
  )
}

function PhoneMockup() {
  return (
    <div className={styles.heroRight}>
      <div className={styles.phoneShadow} />
      <div className={styles.fbStreak}>
        <span className={styles.fbStreakIcon}>🔥</span>
        <div className={styles.fbStreakInfo}>
          <span className={styles.fbStreakNum}>7 day streak</span>
          <span className={styles.fbStreakLbl}>Keep it going!</span>
        </div>
      </div>
      <div className={styles.phoneWrap}>
        <div className={styles.phoneBody}>
          <div className={styles.island} />
          <div className={styles.screen}>
            <div className={styles.appBar}>
              <div className={styles.back}>‹</div>
              <div className={styles.appTitle}>Advanced Maths</div>
              <div className={styles.streakChip}>🔥 7</div>
            </div>
            <div className={styles.progWrap}>
              <div className={styles.progMeta}>
                <span>Progress</span>
                <span>Q 3 of 10</span>
              </div>
              <div className={styles.progTrack}>
                <div className={styles.progBar} />
              </div>
            </div>
            <div className={styles.topicChip}>
              <div className={styles.chipDot} />
              <span className={styles.chipLbl}>Advanced Maths · FAST-NU</span>
            </div>
            <div className={styles.qcard}>
              <div className={styles.qnum}>Question 03</div>
              <div className={styles.qtext}>
                The point where the axis of a parabola meets the parabola is called
              </div>
            </div>
            <div className={styles.opts}>
              <div className={`${styles.opt} ${styles.optCorrect}`}>
                <div className={styles.optL}>A</div>
                <span className={styles.optT}>Vertex</span>
                <span className={styles.optI}>✓</span>
              </div>
              <div className={styles.opt}>
                <div className={styles.optL}>B</div>
                <span className={styles.optT}>Focus</span>
              </div>
              <div className={`${styles.opt} ${styles.optWrong}`}>
                <div className={styles.optL}>C</div>
                <span className={styles.optT}>Directrix</span>
                <span className={styles.optI}>✗</span>
              </div>
              <div className={styles.opt}>
                <div className={styles.optL}>D</div>
                <span className={styles.optT}>Latus rectum</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.fbAi}>
        <span className={styles.fbAiIcon}>✨</span>
        <div className={styles.fbAiInfo}>
          <span className={styles.fbAiMain}>AI Explanation</span>
          <span className={styles.fbAiSub}>Urdu &amp; English</span>
        </div>
      </div>
    </div>
  )
}

// ─── CTA Buttons ──────────────────────────────────────────────────────────────
function CTAButtons({ authStatus, firstName, onNavigate }) {
  if (authStatus === 'idle') {
    return (
      <div className={styles.ctaColumn} style={{ opacity: 0.5, pointerEvents: 'none' }}>
        <div className={styles.btnSkeleton} />
      </div>
    )
  }

  // Signed in on the web: let them straight back into their session, but still
  // offer the install — streaks and drill reminders only work in the app.
  if (authStatus === 'in') {
    return (
      <div className={styles.ctaColumn}>
        <button
          type="button"
          className={styles.btnContinue}
          onClick={() => onNavigate('home', 'Welcome back!')}
        >
          <span>🦉</span>
          {firstName ? `Continue as ${firstName}` : 'Continue to Dashboard'}
        </button>
        <PlayButton placement="hero-signed-in" />
        <button
          type="button"
          className={styles.btnSwitch}
          onClick={() => onNavigate('login', 'Switching account…')}
        >
          Use a different account
        </button>
      </div>
    )
  }

  // Signed out: the install is the goal. Browser practice stays as the escape
  // hatch for desktop visitors and anyone out of storage.
  return (
    <div className={styles.ctaColumn}>
      <PlayButton placement="hero" />
      <button
        type="button"
        className={styles.btnSecondary}
        onClick={() => onNavigate('home', 'Starting your practice session…')}
      >
        Ya browser mein practice karo →
      </button>
    </div>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function Hero() {
  const cycleWords = useCycleWords(CYCLE_WORDS)
  const { status: authStatus, firstName } = useFirebaseAuth()
  useScrollReveal()

  const [loaderMessage, setLoaderMessage] = useState(null)

  const handleNavigate = (destination, message) => {
    if (loaderMessage) return

    setLoaderMessage(message)

    const timer = setTimeout(() => {
      const targets = {
        home:   `${APP_URL}/`,
        login:  `${APP_URL}/`,
        signup: `${APP_URL}/?signup=true`,
      }
      const url = targets[destination] ?? `${APP_URL}/`

      try {
        const parsed = new URL(url, window.location.origin)
        const allowed = process.env.NEXT_PUBLIC_APP_URL
        if (allowed && !parsed.href.startsWith(allowed)) {
          console.error('[Ustaad] Navigation blocked: unexpected target URL')
          setLoaderMessage(null)
          return
        }
        window.location.href = parsed.href
      } catch {
        console.error('[Ustaad] Invalid navigation URL')
        setLoaderMessage(null)
      }
    }, 200)

    window.addEventListener('pagehide', () => clearTimeout(timer), { once: true })
  }

  return (
    <>
      {loaderMessage && <OwlLoader message={loaderMessage} />}

      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroLeft}>
            {/* Removed SocialBadge and ExamTags */}
            <h1 className={styles.h1}>
              <span className={styles.h1Line}>Crack your</span>
              <span className={styles.h1Cycle}>
                {cycleWords.map(({ word, isActive }) => (
                  <span
                    key={word}
                    className={`${styles.cw} ${isActive ? styles.on : ''}`}
                  >
                    {word}
                  </span>
                ))}
              </span>
              <span className={styles.h1Line}>the smart way.</span>
            </h1>
            <p className={styles.sub}>
              Solve real past papers. Get instant{' '}
              <strong>AI explanations in Urdu&nbsp;&amp;&nbsp;English</strong>.
              Track every weak topic until you&apos;re exam‑ready.
            </p>

            <div className={styles.ctas}>
              <CTAButtons
                authStatus={authStatus}
                firstName={firstName}
                onNavigate={handleNavigate}
              />
            </div>

            <StatsStrip />
          </div>
          <PhoneMockup />
        </div>

        <div className={styles.glowLine} />
      </section>
    </>
  )
}