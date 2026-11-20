// A self-referencing canonical on every indexable page. Without one, a link
// shared from Instagram or Facebook arrives as ?fbclid=... and Google is free
// to treat that as a separate URL competing with the clean one. Relative paths
// resolve against metadataBase in the root layout.
//
// This file exists only because page.js is a Client Component, and a Client
// Component cannot export metadata. A layout can, and it renders nothing of
// its own.
export const metadata = {
  alternates: { canonical: '/delete-account' },
  title: 'Delete your Ustaad account',
  description:
    'How to delete your Ustaad account and what gets removed with it, ' +
    'from inside the app or by request if you cannot open it.',
}

export default function DeleteAccountLayout({ children }) {
  return children
}
