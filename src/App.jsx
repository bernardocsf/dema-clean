import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ServicesSection from './components/ServicesSection'
import BookingSection from './components/BookingSection'
import ReviewsSection from './components/ReviewsSection'
import AdvantagesSection from './components/AdvantagesSection'
import FAQSection from './components/FAQSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import FloatingContact from './components/FloatingContact'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServicesSection />
        <AdvantagesSection />
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

export default App
