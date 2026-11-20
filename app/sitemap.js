import { MERIT } from '../lib/merit'
import { UNIVERSITIES } from '../lib/universities'

const BASE = 'https://www.ustaadapp.online'

/**
 * Every page worth indexing, generated from the same data the pages are.
 *
 * Built rather than hand-listed: a calculator added to lib/merit.js appears
 * here without anyone remembering, which is the failure mode a hand-written
 * sitemap always eventually has.
 */
export default function sitemap() {
  const now = new Date()

  const core = [
    { url: BASE, changeFrequency: 'weekly', priority: 1 },
    // The calculators are the pages built to be found, so they rank above
    // the rest of the site in our own ordering too.
    { url: `${BASE}/merit-calculator`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/contact`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/delete-account`, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const calculators = MERIT.map((u) => ({
    url: `${BASE}/merit-calculator/${u.slug}`,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const exams = UNIVERSITIES.map((u) => ({
    url: `${BASE}/exams/${u.slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...core, ...calculators, ...exams].map((e) => ({ lastModified: now, ...e }))
}
