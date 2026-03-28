import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import ServicesSection from './components/ServicesSection'
import LocalAreasSection from './components/LocalAreasSection'
import ToolsSection from './components/ToolsSection'
import ExperienceSection from './components/ExperienceSection'
import ProcessSection from './components/ProcessSection'
import BookingSection from './components/BookingSection'
import ReviewsSection from './components/ReviewsSection'
import FAQSection from './components/FAQSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import MobileQuickActions from './components/MobileQuickActions'
import SeoSchema from './components/SeoSchema'
import IntegrationScripts from './components/IntegrationScripts'

export default function App() {
  return (
    <>
      <SeoSchema />
      <IntegrationScripts />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <ServicesSection />
        <LocalAreasSection />
        <ToolsSection />
        <ExperienceSection />
        <ProcessSection />
        <BookingSection />
        <ReviewsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <MobileQuickActions />
    </>
  )
}
