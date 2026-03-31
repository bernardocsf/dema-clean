import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ServicesSection from './components/ServicesSection'
import GallerySection from './components/GallerySection'
import AboutSection from './components/AboutSection'
import BookingSection from './components/BookingSection'
import ReviewsSection from './components/ReviewsSection'
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
        <ServicesSection />
        <BookingSection />
        <ReviewsSection />
        <GallerySection />
        <AboutSection />
      </main>
      <Footer />
      <MobileQuickActions />
    </>
  )
}
