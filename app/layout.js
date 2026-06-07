import './globals.css'

export const metadata = {
  title: 'Ustaad | FAST-NU, NUST-NET & NTS Prep',
  description: 'Pakistan ka sabse smart entry test preparation app. Solve real past papers for FAST-NU, NUST-NET and NTS with AI explanations in Urdu and English.',
  keywords: 'FAST-NU preparation, NUST-NET preparation, NTS preparation, entry test Pakistan, past papers, AI explanation, Urdu',
  openGraph: {
    title: 'Ustaad — Apna Ustaad',
    description: 'AI-powered entry test preparation for Pakistani students.',
    type: 'website',
  },
  icons: {
    icon: '/app_icon.png', 
      // 👈 uses the PNG you already have
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}


