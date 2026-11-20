const BASE = 'https://www.ustaadapp.online'

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /get exists only to bounce a tap into the Play Store. Indexing it
      // would put a redirect in the results where a real page should be.
      disallow: ['/get'],
    },
    sitemap: `${BASE}/sitemap.xml`,
  }
}
