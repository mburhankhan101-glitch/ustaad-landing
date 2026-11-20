// A self-referencing canonical on every indexable page. Without one, a link
// shared from Instagram or Facebook arrives as ?fbclid=... and Google is free
// to treat that as a separate URL competing with the clean one. Relative paths
// resolve against metadataBase in the root layout.
//
// This file exists only because page.js is a Client Component, and a Client
// Component cannot export metadata. A layout can, and it renders nothing of
// its own.
export const metadata = {
  alternates: { canonical: '/contact' },
  title: 'Contact Ustaad',
  description:
    'Questions, bug reports or feedback about the Ustaad entry test app. ' +
    'Send us a message and we will get back to you.',
}

export default function ContactLayout({ children }) {
  return children
}
