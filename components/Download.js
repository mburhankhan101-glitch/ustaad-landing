'use client'
import { useState } from 'react'
import PlayButton from './PlayButton'
import styles from './Download.module.css'

// This section used to be a launch waitlist. The app has been live on Play
// since June 2026, so the primary action is the install. The email field
// stays, but only for the exams we do NOT cover yet — that is a promise we
// can actually keep, unlike "notify me at launch" for something already out.
export default function Download() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')

    try {
      const res = await fetch('https://formspree.io/f/mkoajpnq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // `interest` separates these from the old launch-waitlist entries
        // sitting in the same Formspree inbox.
        body: JSON.stringify({ email, interest: 'mdcat-nums' }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className={styles.section} id="download">
      <div className={styles.inner}>
        <div className={styles.owl}>🦉</div>
        <div className={styles.label}>Now on Google Play</div>
        <h2 className={styles.heading}>
          Ustaad live hai.<br />
          <span className={styles.highlight}>Abhi download karo.</span>
        </h2>
        <p className={styles.sub}>
          FAST NU, NUST NET aur NTS ki poori tayari: 3,900+ MCQs, real past papers,
          aur har galat jawab par AI explanation.<br />
          <strong>Free to start.</strong>
        </p>

        <div className={styles.installRow}>
          <PlayButton placement="download-section" />
        </div>

        <div className={styles.divider}>
          <span>MDCAT &amp; NUMS ka intezaar?</span>
        </div>

        <p className={styles.notifySub}>
          Yeh dono abhi app mein nahi hain, content tayar ho raha hai. Email
          chhod do, live hote hi sabse pehle aapko batayenge.
        </p>

        {status === 'success' ? (
          <div className={styles.successBox}>
            <span>🎉</span>
            <div>
              <p className={styles.successTitle}>Ho gaya!</p>
              <p className={styles.successSub}>
                MDCAT aur NUMS live hote hi aapko email karenge.
              </p>
            </div>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.srOnly} htmlFor="notify-email">
              Email address for MDCAT and NUMS updates
            </label>
            <input
              id="notify-email"
              type="email"
              className={styles.input}
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className={styles.btn}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Ruko…' : 'Notify me →'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className={styles.errorText}>Kuch gadbad ho gayi. Dobara try karo.</p>
        )}

        <p className={styles.note}>No spam. Unsubscribe anytime. We hate spam too.</p>
      </div>
    </section>
  )
}
