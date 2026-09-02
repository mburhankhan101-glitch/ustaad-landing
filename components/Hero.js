'use client'
import { useState, useEffect } from 'react'
import PlayButton from './PlayButton'
import { APP_URL } from '../lib/links'
import styles from './Hero.module.css'

// ─── Configuration ─────────────────────────────────────────────────────────────
const FIREBASE_CONFIG = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const CYCLE_WORDS = ['FAST-NU', 'NUST-NET', 'NTS', 'MDCAT', 'NUMS']

// ─── Custom Hooks ──────────────────────────────────────────────────────────────

// Returns one word at a time rather than stacking all five and cross-fading
// them. Two 70px words dissolving through each other read as a rendering bug
// at this size; remounting on key change gives a clean in-animation instead.
function useCycleWord(words, intervalMs = 2400) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setIndex(prev => (prev + 1) % words.length)
    }, intervalMs)
    return () => clearInterval(id)
  }, [words, intervalMs])
  return words[index]
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
            setFirstName(user.displayName?.trim().split(/\s+/)[0] ?? null)
          } else {
            setStatus('out')
            setFirstName(null)
          }
        })

        return () => { unsubscribe() }
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

// ─── Owl Loading Overlay ───────────────────────────────────────────────────────
function OwlLoader({ message }) {
  return (
    <div role="status" aria-label="Loading Ustaad" className={styles.loader}>
      <div className={styles.loaderOwl}>🦉</div>
      <div className={styles.loaderBrand}>Ustaad</div>
      <div className={styles.loaderMsg}>{message}</div>
      <div className={styles.loaderTrack}><div className={styles.loaderBar} /></div>
    </div>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function Hero() {
  const activeWord = useCycleWord(CYCLE_WORDS)
  const { status: authStatus, firstName } = useFirebaseAuth()
  const [loaderMessage, setLoaderMessage] = useState(null)

  const handleNavigate = (message) => {
    if (loaderMessage) return
    setLoaderMessage(message)

    const timer = setTimeout(() => {
      try {
        const parsed = new URL(`${APP_URL}/`, window.location.origin)
        if (APP_URL && !parsed.href.startsWith(APP_URL)) {
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
        <div className={styles.grid}>

          <div className={styles.copy}>
            <p className={styles.eyebrow}>Pakistan · University entry tests</p>

            <h1 className={styles.h1}>
              <span className={styles.line}>Crack your</span>
              <span className={styles.cycle} aria-label="FAST-NU, NUST-NET, NTS, MDCAT and NUMS">
                <span key={activeWord} className={styles.word}>{activeWord}</span>
              </span>
              <span className={styles.line}>the smart way.</span>
            </h1>

            <p className={styles.sub}>
              Real past papers, exact marking schemes, and an AI that explains every
              wrong answer in <strong>Urdu and English</strong> — not just the answer key.
            </p>

            <div className={styles.ctas}>
              {/* The install link depends on nothing, so it renders immediately
                  and ships in the server HTML rather than waiting on Firebase. */}
              <PlayButton placement="hero" />

              {authStatus === 'in' && (
                <button
                  type="button"
                  className={styles.ghost}
                  onClick={() => handleNavigate('Welcome back!')}
                >
                  {firstName ? `Continue as ${firstName}` : 'Continue to dashboard'} →
                </button>
              )}

              {authStatus === 'out' && (
                <button
                  type="button"
                  className={styles.ghost}
                  onClick={() => handleNavigate('Starting your practice session…')}
                >
                  Ya browser mein practice karo →
                </button>
              )}

              {authStatus === 'idle' && <div className={styles.ghostSkeleton} aria-hidden="true" />}
            </div>

            {/* Nothing here that the app does not actually do. It has no
                offline mode — connectivity_plus only surfaces a snackbar — so
                that is not claimed. */}
            <p className={styles.trust}>
              Free to start · No card needed · Urdu aur English, dono
            </p>

            <dl className={styles.stats}>
              <div className={styles.stat}>
                <dt className={styles.statNum}>3,900+</dt>
                <dd className={styles.statLbl}>Real past-paper MCQs</dd>
              </div>
              <div className={styles.stat}>
                <dt className={styles.statNum}>5</dt>
                <dd className={styles.statLbl}>Exams</dd>
              </div>
              <div className={styles.stat}>
                <dt className={styles.statNum}>2</dt>
                <dd className={styles.statLbl}>Languages, every answer</dd>
              </div>
            </dl>
          </div>

          {/* The real app, not a CSS drawing of it. */}
          <div className={styles.shot}>
            <div className={styles.phone}>
              <img
                src="/app/quiz.jpeg"
                alt="A timed NTS analytical question in the Ustaad app, showing four options and the progress bar."
                width="790"
                height="1624"
              />
            </div>
            <figcaption className={styles.shotCaption}>
              Actual screen · NTS Analytical, question 3 of 10
            </figcaption>
          </div>

        </div>
      </section>
    </>
  )
}
