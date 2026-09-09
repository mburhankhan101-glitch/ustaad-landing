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

/**
 * The address students are told to write to.
 *
 * A personal Gmail is the loudest signal that one person is behind a product,
 * and this address appears on the deletion page and in the privacy policy —
 * the two places someone looks when they are already unsure about trusting it.
 *
 * Switch to support@ustaadapp.online once mail is set up on the domain. It is
 * a constant so that swap is one edit rather than a search: the same address
 * was previously hardcoded in two repos, and one of those copies pointed at a
 * mailbox that did not exist.
 */
export const SUPPORT_EMAIL = 'm.burhan.khan101@gmail.com'
