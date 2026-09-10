import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  metadataBase: new URL('https://www.ustaadapp.online'),
  title: 'Ustaad | FAST NU, NUST NET & NTS Prep. Free on Android',
  description: 'Free entry test preparation app for Pakistani students. 5,200+ real past paper MCQs for FAST NU, NUST NET and NTS, with AI explanations in Urdu and English. Download free on Google Play.',
  keywords: 'FAST NU preparation, NUST NET preparation, NTS preparation, NAT test preparation, entry test Pakistan, past papers, AI explanation, Urdu, entry test app',
  openGraph: {
    title: 'Ustaad. Apna Ustaad',
    description: 'Free AI-powered entry test prep for FAST NU, NUST NET and NTS. Now on Google Play.',
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

// The header and footer live here rather than in each page, so /contact and
// /delete-account stop being the two routes with no navigation and no brand on
// them at all. Those are the pages a student reaches when they are already
// unsure about the product, and they were the ones that looked least like it.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}


