import Hero from '../components/Hero'
import QuestionDemo from '../components/QuestionDemo'
import Problem from '../components/Problem'
import Features from '../components/Features'
import ExamCoverage from '../components/ExamCoverage'
import PriceAnchor from '../components/PriceAnchor'
import SocialProof from '../components/SocialProof'
import Faq from '../components/Faq'
import Download from '../components/Download'

// Order is the argument, in the order a student actually asks it:
// what is this → let me try it → why is my current setup failing → what
// exactly do I get → is my exam here → what does it cost → does it work for
// anyone → my remaining objections → install.
// A self-referencing canonical on every indexable page. Without one, a link
// shared from Instagram or Facebook arrives as ?fbclid=... and Google is free
// to treat that as a separate URL competing with the clean one. Relative paths
// resolve against metadataBase in the root layout.
export const metadata = {
  alternates: { canonical: '/' },
}

export default function Home() {
  return (
    <main>
      <Hero />
      <QuestionDemo />
      <Problem />
      <Features />
      <ExamCoverage />
      <PriceAnchor />
      <SocialProof />
      <Faq />
      <Download />
    </main>
  )
}
