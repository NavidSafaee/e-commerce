import { useEffect, useState } from "react"
import ProductPageComponent from "../components/ProductPageComponent/ProductPageComponent"
import Footer from "../components/Footer/Footer"
import Navbar from "../components/Navbar/Navbar"
import TopBar from "../components/TopBar/TopBar"
import TopStrip from "../components/TopStrip/TopStrip"
import PreLoader from "../components/PreLoader/PreLoader"

function ProductPage() {
    
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true)
        }, 1000)
    }, [])

    return (
        <>
            {!isLoaded && <PreLoader />}

            {isLoaded && <TopStrip />}
            {isLoaded && <TopBar />}
            {isLoaded && <Navbar />}
            {isLoaded && <ProductPageComponent />}
            {isLoaded && <Footer />}
        </>
    )
}

export default ProductPage