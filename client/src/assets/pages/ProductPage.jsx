import ProductPageComponent from "../components/ProductPageComponent/ProductPageComponent"
import Footer from "../components/Footer/Footer"
import Navbar from "../components/Navbar/Navbar"
import TopBar from "../components/TopBar/TopBar"
import TopStrip from "../components/TopStrip/TopStrip"

function ProductPage() {

    return (
        <>
            <TopStrip />
            <TopBar />
            <Navbar />
            <ProductPageComponent />
            <Footer />
        </>
    )
}

export default ProductPage