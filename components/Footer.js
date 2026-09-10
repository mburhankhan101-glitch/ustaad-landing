import Link from 'next/link'
import Logo from './Logo'
import { playStoreUrl, PRIVACY_URL, INSTAGRAM_URL, SUPPORT_EMAIL } from '../lib/links'
import styles from './Footer.module.css'

/**
 * The footer now renders on every route, from the root layout, and carries
 * enough of the site to work as one.
 *
 * The single row of inline links it replaced said nothing about what Ustaad is
 * to somebody who landed on /contact or /delete-account, which were until now
 * the two pages with no header and no footer at all — the pages where a
 * student is already deciding whether to trust the product.
 *
 * On-page anchors only resolve on the home page, so they are written as
 * "/#exams" rather than "#exams": from /contact a bare hash would scroll the
 * contact page to nowhere instead of navigating home.
 */
const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Try a question', href: '/#try' },
      { label: 'Features', href: '/#features' },
      { label: 'Exams covered', href: '/#exams' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'FAQ', href: '/#faq' },
      { label: 'Download', href: playStoreUrl('footer-links'), external: true },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact us', href: '/contact' },
      { label: 'Email us', href: `mailto:${SUPPORT_EMAIL}` },
      { label: 'Delete my account', href: '/delete-account' },
    ],
  },
  {
    title: 'Legal',
    links: [{ label: 'Privacy policy', href: PRIVACY_URL, external: true }],
  },
]

function FooterLink({ link }) {
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer">
        {link.label}
      </a>
    )
  }
  if (link.href.startsWith('mailto:')) {
    return <a href={link.href}>{link.label}</a>
  }
  return <Link href={link.href}>{link.label}</Link>
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <Logo size="lg" />

          <p className={styles.blurb}>
            Ustaad Pakistani students ke liye entry test preparation app hai. Real past
            paper MCQs, har sawal ki Urdu aur English mein explanation, aur poora
            progress tracking. Android par bilkul free.
          </p>

          <p className={styles.followLabel}>Follow us</p>
          <div className={styles.social}>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ustaad on Instagram"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href={playStoreUrl('footer')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ustaad on Google Play"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 2.5v19a1 1 0 0 0 1.53.85l14.5-9.5a1 1 0 0 0 0-1.7L4.53 1.65A1 1 0 0 0 3 2.5z" />
                <line x1="13.5" y1="7.5" x2="4" y2="21.5" />
              </svg>
            </a>
            <a href={`mailto:${SUPPORT_EMAIL}`} aria-label="Email Ustaad">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
                <path d="M3 6.5l9 6.5 9-6.5" />
              </svg>
            </a>
          </div>
        </div>

        <nav className={styles.cols} aria-label="Footer">
          {COLUMNS.map((col) => (
            <div key={col.title} className={styles.col}>
              <p className={styles.colTitle}>{col.title}</p>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <p>© {new Date().getFullYear()} Ustaad. Pakistani students ke liye banaya gaya.</p>
          <p className={styles.tagline}>Apna Ustaad</p>
        </div>
      </div>
    </footer>
  )
}
