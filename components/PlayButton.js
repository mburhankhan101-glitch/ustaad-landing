'use client'
import { playStoreUrl } from '../lib/links'
import styles from './PlayButton.module.css'

/*
 * Deliberately no target="_blank" on anything that leaves this site.
 *
 * Most people arriving here tap a link in an Instagram bio, which opens in
 * Instagram's own in-app webview. That webview frequently refuses to open a
 * new window, so an anchor with target="_blank" is not "opens elsewhere", it
 * is a tap that does nothing at all, with no error and nothing to debug. The
 * install button was silently dead for the single most important audience
 * this site has.
 *
 * Navigating in the same view always works, and on Android the Play Store
 * app still takes over the play.google.com URL from there.
 */

/**
 * The install button. Every placement passes its own `placement` string so
 * Play Console's acquisition report can tell them apart.
 *
 * variant: 'primary' (hero, download section) | 'compact' (navbar)
 */
export default function PlayButton({ placement, variant = 'primary', className = '' }) {
  const isCompact = variant === 'compact'

  return (
    <a
      href={playStoreUrl(placement)}
      className={`${styles.btn} ${isCompact ? styles.compact : styles.primary} ${className}`}
      data-placement={placement}
    >
      <svg
        className={styles.glyph}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M3.6 1.9a1 1 0 0 0-.6.92v18.36a1 1 0 0 0 .6.92l9.9-10.1L3.6 1.9Z" />
        <path d="M15.02 9.62 5.3 1.05l11.1 6.4-1.38 2.17Z" />
        <path d="M15.02 14.38 16.4 16.55l-11.1 6.4 9.72-8.57Z" />
        <path d="M17.9 8.32l3.5 2.02a1.9 1.9 0 0 1 0 3.32l-3.5 2.02-2.02-3.68 2.02-3.68Z" />
      </svg>

      {isCompact ? (
        <span className={styles.compactLabel}>Get the App</span>
      ) : (
        <span className={styles.stack}>
          <span className={styles.small}>Download free on</span>
          <span className={styles.big}>Google Play</span>
        </span>
      )}
    </a>
  )
}
