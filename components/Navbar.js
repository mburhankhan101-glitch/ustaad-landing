'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import PlayButton from './PlayButton'
import styles from './Navbar.module.css'

// Same APP_URL logic as Hero
const APP_URL = (process.env.NEXT_PUBLIC_APP_URL ?? '').replace(/\/$/, '')

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [navigatingTo, setNavigatingTo] = useState(null) // 'login' | 'register' | null

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on link click
  const handleNavClick = () => setMenuOpen(false)

  // Prevent body scroll when menu open
  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Navigate to Flutter app (like Hero's handleNavigate). Only "login" is left
  // here — new users go to Play, not the browser build.
  const handleAuthNavigate = (destination) => {
    if (navigatingTo) return // prevent double‑click
    setNavigatingTo(destination)

    setTimeout(() => {
      window.location.href = `${APP_URL}/`
    }, 200)
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        {/* Logo */}
        <div className={styles.logo}>
          <img src="/app_icon.png" alt="Ustaad" className={styles.logoImg} />
          <span className={styles.brand}>Ustaad</span>
        </div>

        {/* Desktop nav links */}
        <div className={styles.desktopLinks}>
          <a href="#try" className={styles.navLink} onClick={handleNavClick}>Try a question</a>
          <a href="#features" className={styles.navLink} onClick={handleNavClick}>Features</a>
          <a href="#exams" className={styles.navLink} onClick={handleNavClick}>Exams</a>
          <a href="#faq" className={styles.navLink} onClick={handleNavClick}>FAQ</a>

          {/* Login – ghost button */}
          <button
            className={styles.login}
            onClick={() => handleAuthNavigate('login')}
            disabled={!!navigatingTo}
          >
            {navigatingTo === 'login' ? 'Loading…' : 'Login'}
          </button>

          {/* Install – the sticky CTA. Replaces the old web "Register",
              which sent new users into the browser build instead of the app. */}
          <PlayButton placement="navbar" variant="compact" />
        </div>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileMenuInner}>
          <a href="#try" className={styles.mobileLink} onClick={handleNavClick}>Try a question</a>
          <a href="#features" className={styles.mobileLink} onClick={handleNavClick}>Features</a>
          <a href="#exams" className={styles.mobileLink} onClick={handleNavClick}>Exams</a>
          <a href="#faq" className={styles.mobileLink} onClick={handleNavClick}>FAQ</a>
          <Link href="/contact" className={styles.mobileLink} onClick={handleNavClick}>Contact Us</Link>

          <button
            className={`${styles.mobileLink} ${styles.loginMobile}`}
            onClick={() => {
              handleNavClick()
              handleAuthNavigate('login')
            }}
            disabled={!!navigatingTo}
          >
            {navigatingTo === 'login' ? 'Loading…' : 'Login'}
          </button>

          <div className={styles.mobileCta} onClick={handleNavClick}>
            <PlayButton placement="navbar-mobile" />
          </div>
        </div>
      </div>
    </nav>
  )
}