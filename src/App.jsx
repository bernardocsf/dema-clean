import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import ServicesSection from './components/ServicesSection'
import ExperienceSection from './components/ExperienceSection'
import ProcessSection from './components/ProcessSection'
import BookingSection from './components/BookingSection'
import ReviewsSection from './components/ReviewsSection'
import FAQSection from './components/FAQSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <ServicesSection />
        <ExperienceSection />
        <ProcessSection />
        <BookingSection />
        <ReviewsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
