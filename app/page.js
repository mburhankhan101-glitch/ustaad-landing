import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Problem from '../components/Problem'
import Features from '../components/Features'
import ExamCoverage from '../components/ExamCoverage'
import SocialProof from '../components/SocialProof'
import Download from '../components/Download'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Problem />
      <Features />
      <ExamCoverage />
      <SocialProof />
      <Download />
      <Footer />
    </main>
  )
}