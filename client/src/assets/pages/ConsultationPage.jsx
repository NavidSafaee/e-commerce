import { useEffect, useState } from "react"
import ConsultationPageComponent from "../components/ConsultationPageComponent/ConsultationPageComponent"
import Footer from "../components/Footer/Footer"
import Navbar from "../components/Navbar/Navbar"
import TopBar from "../components/TopBar/TopBar"
import TopStrip from "../components/TopStrip/TopStrip"
import PreLoader from "../components/PreLoader/PreLoader"

function ConsultationPage() {

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 3000)
  }, [])

  return (
    <>
      {!isLoaded && <PreLoader type={"RotatingSquare"} />}
      {isLoaded && <TopStrip />}
      {isLoaded && <TopBar />}
      {isLoaded && <Navbar />}
      {isLoaded && <ConsultationPageComponent />}
      {isLoaded && <Footer />}
    </>
  )
}

export default ConsultationPage