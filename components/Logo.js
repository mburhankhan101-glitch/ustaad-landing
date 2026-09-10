import Link from 'next/link'
import styles from './Logo.module.css'

/**
 * The brand lockup, in one place so the header and the footer cannot drift.
 *
 * Two deliberate changes from the old inline markup. The wordmark now carries
 * the purple full stop the rest of the page already uses on the line it wants
 * you to remember ("Hum tayar hain."), which ties the mark to the type system
 * instead of leaving it as an app icon with a name beside it. And the mark and
 * wordmark are sized off one scale, so the header can grow without the two
 * drifting out of proportion.
 *
 * The owl artwork itself is still the Play Store icon. A mark drawn for a
 * wordmark rather than for a launcher tile is real design work, and no amount
 * of CSS here substitutes for it.
 */
export default function Logo({ size = 'md', href = '/', className = '' }) {
  const inner = (
    <>
      <img src="/app_icon.png" alt="" className={styles.mark} />
      <span className={styles.word}>
        Ustaad<span className={styles.dot}>.</span>
      </span>
    </>
  )

  const cls = `${styles.logo} ${styles[size]} ${className}`

  if (!href) return <span className={cls}>{inner}</span>

  return (
    <Link href={href} className={cls} aria-label="Ustaad, home">
      {inner}
    </Link>
  )
}
