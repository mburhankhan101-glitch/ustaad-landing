import Link from 'next/link'
import { playStoreUrl, PRIVACY_URL, INSTAGRAM_URL } from '../lib/links'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <img
            src="/app_icon.png"
            alt="Ustaad"
            className={styles.logoImg}
          />
          <div>
            <p className={styles.name}>Ustaad</p>
            <p className={styles.tagline}>Apna Ustaad</p>
          </div>
        </div>

        <div className={styles.links}>
          <a href="#features">Features</a>
          <a href="#exams">Exams</a>
          <a href={playStoreUrl('footer')} target="_blank" rel="noopener noreferrer">
            Download
          </a>
          <Link href="/contact">Contact Us</Link>      {/* changed from mailto to /contact */}
          <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        </div>

        <div className={styles.social}>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>Made with ❤️ for Pakistani students · © 2026 Ustaad</p>
      </div>
    </footer>
  )
}