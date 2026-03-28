import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ServicesSection from './components/ServicesSection'
import ProcessSection from './components/ProcessSection'
import ShowcaseSection from './components/ShowcaseSection'
import BookingSection from './components/BookingSection'
import ReviewsSection from './components/ReviewsSection'
import FAQSection from './components/FAQSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import FloatingContact from './components/FloatingContact'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServicesSection />
        <ProcessSection />
        <ShowcaseSection />
        <BookingSection />
        <ReviewsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}
