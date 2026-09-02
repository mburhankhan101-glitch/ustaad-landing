// ─── Outbound links ───────────────────────────────────────────────────────────
// One place for every destination outside this site, so a change to the store
// listing or the app URL never has to be hunted across components.

export const PACKAGE_ID = 'com.ustaad.app'

const PLAY_BASE = `https://play.google.com/store/apps/details?id=${PACKAGE_ID}`

/**
 * Play Store link tagged with an install referrer.
 *
 * Google Play forwards the `referrer` value into Play Console's acquisition
 * report, so each placement on this site shows up as its own row and we can
 * see which one actually drives installs. Without it every install from the
 * web is attributed to "organic" and the site looks like it did nothing.
 *
 * @param {string} placement e.g. 'hero', 'navbar', 'download-section'
 */
export function playStoreUrl(placement) {
  const referrer = `utm_source=ustaadapp.online&utm_medium=website&utm_content=${placement}`
  return `${PLAY_BASE}&referrer=${encodeURIComponent(referrer)}`
}

/** The Flutter web build — for desktop visitors and anyone who won't install. */
export const APP_URL = (process.env.NEXT_PUBLIC_APP_URL ?? '').replace(/\/$/, '')

export const PRIVACY_URL = 'https://ustaad-privacy.vercel.app/'
export const INSTAGRAM_URL = 'https://instagram.com/theustaadapp'
