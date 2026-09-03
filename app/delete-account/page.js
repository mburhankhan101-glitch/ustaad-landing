'use client'
import { useState } from 'react'
import Link from 'next/link'
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { initializeApp, getApps } from 'firebase/app'
import styles from './DeleteAccount.module.css'

// Google Play requires apps that offer account creation to provide a web page
// where deletion can be requested without installing the app. This is that
// page; the URL goes in the Data safety form.
const FIREBASE_CONFIG = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = getApps().length ? getApps()[0] : initializeApp(FIREBASE_CONFIG)
const db = getFirestore(app)

const DELETED = [
  'Your account and login details',
  'Your name and email address',
  'Your streak, daily goals and subject wise accuracy',
  'Your quiz and paper history, including which questions you have already seen',
  'Any feedback you sent us from inside the app',
]

export default function DeleteAccountPage() {
  const [email, setEmail] = useState('')
  const [reason, setReason] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    setStatus('sending')

    try {
      await addDoc(collection(db, 'deletionRequests'), {
        email: email.trim(),
        reason: reason.trim(),
        createdAt: serverTimestamp(),
        status: 'pending',
        source: 'web',
      })
      setStatus('success')
      setEmail('')
      setReason('')
    } catch (err) {
      console.error('[Ustaad] Deletion request failed:', err)
      setStatus('error')
    }
  }

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>

        <Link href="/" className={styles.back}>← Ustaad</Link>

        <h1 className={styles.title}>Delete your Ustaad account</h1>
        <p className={styles.lede}>
          You can delete your account and everything stored against it. This
          page is for <strong>Ustaad</strong> (com.ustaad.app), published by
          Ustaad Labs.
        </p>

        {/* The in-app route is instant, so it goes first. The form below is
            the fallback for people who cannot get into the app. */}
        <section className={styles.block}>
          <p className={styles.blockLabel}>Fastest way</p>
          <h2 className={styles.blockTitle}>Delete it from the app</h2>
          <ol className={styles.steps}>
            <li>Open Ustaad and go to the <strong>Profile</strong> tab</li>
            <li>Scroll to <strong>Danger Zone</strong></li>
            <li>Tap <strong>Delete My Account</strong></li>
            <li>Confirm, then enter your password or sign in with Google again</li>
          </ol>
          <p className={styles.note}>
            This happens immediately. Nothing is kept.
          </p>
        </section>

        <section className={styles.block}>
          <p className={styles.blockLabel}>If you cannot open the app</p>
          <h2 className={styles.blockTitle}>Request it here</h2>
          <p className={styles.blockBody}>
            Enter the email address you signed up with. We delete the account
            within <strong>30 days</strong> and email you when it is done. We
            may reply once to confirm the request came from you.
          </p>

          {status === 'success' ? (
            <div className={styles.success}>
              <p className={styles.successTitle}>Request received</p>
              <p className={styles.successBody}>
                We will delete the account within 30 days and email you to
                confirm. If you can still open the app, deleting from Profile
                is instant.
              </p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label htmlFor="email">Email address on the account</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="reason">Anything you want to tell us (optional)</label>
                <textarea
                  id="reason"
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  placeholder="Optional"
                  rows={4}
                />
              </div>

              <button
                type="submit"
                className={styles.button}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : 'Request account deletion'}
              </button>

              {status === 'error' && (
                <p className={styles.error}>
                  Could not send that. Email us at{' '}
                  <a href="mailto:theustaadapp@gmail.com">theustaadapp@gmail.com</a>{' '}
                  instead.
                </p>
              )}
            </form>
          )}
        </section>

        <section className={styles.block}>
          <p className={styles.blockLabel}>What gets deleted</p>
          <ul className={styles.list}>
            {DELETED.map(item => <li key={item}>{item}</li>)}
          </ul>
          <p className={styles.blockBody}>
            Nothing is kept afterwards. Deleted data cannot be restored, so if
            you come back later you will start from zero. Copies inside routine
            encrypted backups are overwritten on their normal cycle, within 90
            days, and are never used to rebuild a deleted account.
          </p>
        </section>

        <p className={styles.footer}>
          Questions? <Link href="/contact">Contact us</Link> or read the{' '}
          <a
            href="https://ustaad-privacy.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            privacy policy
          </a>.
        </p>

      </div>
    </main>
  )
}
