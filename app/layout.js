import './globals.css'

export const metadata = {
  metadataBase: new URL('https://www.ustaadapp.online'),
  title: 'Ustaad | FAST NU, NUST NET & NTS Prep. Free on Android',
  description: 'Free entry test preparation app for Pakistani students. 3,900+ real past paper MCQs for FAST-NU, NUST-NET and NTS, with AI explanations in Urdu and English. Download free on Google Play.',
  keywords: 'FAST-NU preparation, NUST-NET preparation, NTS preparation, NAT test preparation, entry test Pakistan, past papers, AI explanation, Urdu, entry test app',
  openGraph: {
    title: 'Ustaad. Apna Ustaad',
    description: 'Free AI-powered entry test prep for FAST-NU, NUST-NET and NTS. Now on Google Play.',
    url: 'https://www.ustaadapp.online',
    siteName: 'Ustaad',
    locale: 'en_PK',
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


