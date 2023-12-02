import AdvantagesSection from "../components/Advantages/AdvantagesSection"
import Footer from "../components/Footer/Footer"
import HeroSlider from "../components/HeroSlider/HeroSlider"
import Navbar from "../components/Navbar/Navbar"
import ProductsSection from "../components/ProductsSection/ProductsSection"
import SpecialOfferSection from "../components/SpecialOfferSection/SpecialOfferSection"
import TopBar from "../components/TopBar/TopBar"
import TopStrip from "../components/TopStrip/TopStrip"

function MainPage() {
  return (
    <>
      <TopStrip />
      <TopBar />
      <Navbar />
      <HeroSlider />
      <AdvantagesSection />
      <SpecialOfferSection />
      <ProductsSection />
      <Footer />
    </>
  )
}

export default MainPage