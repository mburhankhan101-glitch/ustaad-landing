'use client'
import { useState } from 'react'
import styles from './Waitlist.module.css'

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')

    try {
      // Replace YOUR_FORM_ID with your Formspree form ID
      const res = await fetch('https://formspree.io/f/mkoajpnq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
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
    <section className={styles.section} id="waitlist">
      <div className={styles.glow} />
      <div className={styles.inner}>
        <div className={styles.owl}>🦉</div>
        <div className={styles.label}>Early Access</div>
        <h2 className={styles.heading}>
          App launch hone wali hai.<br />
          <span className={styles.highlight}>Pehle aao, pehle paao.</span>
        </h2>
        <p className={styles.sub}>
          Join the waitlist and get notified the moment Ustaad goes live.<br />
          First 200 users get <strong>3 months free.</strong>
        </p>

        {status === 'success' ? (
          <div className={styles.successBox}>
            <span>🎉</span>
            <div>
              <p className={styles.successTitle}>You&apos;re on the list!</p>
              <p className={styles.successSub}>We&apos;ll email you the moment Ustaad launches.</p>
            </div>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
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
              {status === 'loading' ? 'Joining...' : 'Join Waitlist →'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className={styles.errorText}>Something went wrong. Try again.</p>
        )}

        <p className={styles.note}>No spam. Unsubscribe anytime. We hate spam too.</p>
      </div>
    </section>
  )
}