'use client'
import { useEffect, useState } from 'react'
import { PACKAGE_ID, playStoreUrl } from '../../lib/links'
import styles from './Get.module.css'

/**
 * One job: get a phone from an Instagram bio into the Play Store app.
 *
 * A link tapped inside Instagram opens in Instagram's own in-app browser, and
 * that browser does not reliably hand a play.google.com URL to the Play Store
 * app the way Chrome does. The student ends up looking at the Play *web* page
 * inside Instagram, where installing means signing into Google again, or at
 * nothing at all.
 *
 * Android's answer to this is the `intent://` scheme, which names the target
 * app explicitly (`package=com.android.vending`) instead of hoping the URL is
 * recognised. `S.browser_fallback_url` is the important part: if the browser
 * cannot dispatch the intent, it goes there rather than dying silently, which
 * is the failure mode this page exists to kill.
 *
 * It is best-effort, not a guarantee. Some in-app browsers refuse intents
 * outright, which is why the button below is a real link and not decoration:
 * worst case this costs one tap instead of being a dead end.
 */

// Where this page sits in Play Console's acquisition report. `?s=` names
// the surface the tap came from, so an Instagram bio install is not filed
// under "website" next to the hero button.
const PLACEMENT = 'get'
const DEFAULT_SOURCE = 'direct'

function androidIntentUrl(httpsUrl) {
  return (
    `intent://details?id=${PACKAGE_ID}` +
    `#Intent;scheme=market;package=com.android.vending;` +
    `S.browser_fallback_url=${encodeURIComponent(httpsUrl)};end`
  )
}

export default function GetPage() {
  // Rendered immediately rather than after the redirect fails, so there is
  // always something to tap. A spinner that resolves into a dead end is worse
  // than a button that was there all along.
  const [href, setHref] = useState(() =>
    playStoreUrl(PLACEMENT, { source: DEFAULT_SOURCE, medium: 'link-in-bio' }),
  )

  useEffect(() => {
    // Read the placement from the URL here rather than with useSearchParams,
    // which would force this whole page behind a Suspense boundary for one
    // optional string.
    const params = new URLSearchParams(window.location.search)
    const source = params.get('s')?.slice(0, 40) || DEFAULT_SOURCE
    const https = playStoreUrl(PLACEMENT, { source, medium: 'link-in-bio' })
    setHref(https)

    const isAndroid = /android/i.test(navigator.userAgent)
    if (!isAndroid) {
      // iPhone and desktop have no Play Store app to open. They get the web
      // listing, which at least explains what the app is.
      window.location.replace(https)
      return
    }

    window.location.replace(androidIntentUrl(https))
  }, [])

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <p className={styles.kicker}>Ustaad</p>
        <h1 className={styles.title}>Opening Google Play…</h1>
        <p className={styles.sub}>
          If it does not open by itself, tap the button.
        </p>

        <a className={styles.btn} href={href}>
          Open in Google Play
        </a>

        <p className={styles.hint}>
          Still nothing? Tap the <strong>⋯</strong> menu at the top of this
          screen and choose <strong>Open in browser</strong>.
        </p>
      </div>
    </main>
  )
}
