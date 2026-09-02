import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import QuestionDemo from '../components/QuestionDemo'
import Problem from '../components/Problem'
import Features from '../components/Features'
import ExamCoverage from '../components/ExamCoverage'
import PriceAnchor from '../components/PriceAnchor'
import SocialProof from '../components/SocialProof'
import Faq from '../components/Faq'
import Download from '../components/Download'
import Footer from '../components/Footer'

// Order is the argument, in the order a student actually asks it:
// what is this → let me try it → why is my current setup failing → what
// exactly do I get → is my exam here → what does it cost → does it work for
// anyone → my remaining objections → install.
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <QuestionDemo />
      <Problem />
      <Features />
      <ExamCoverage />
      <PriceAnchor />
      <SocialProof />
      <Faq />
      <Download />
      <Footer />
    </main>
  )
}
