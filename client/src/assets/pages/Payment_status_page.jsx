import Navbar from "../components/Navbar/Navbar"
import TopBar from "../components/TopBar/TopBar"
import TopStrip from "../components/TopStrip/TopStrip"
import Footer from "../components/Footer/Footer"
import PaymentStatus from "../components/PaymentStatus/PaymentStatus"

function Payment_status() {
    return (
        <>
            <TopStrip />
            <TopBar />
            <Navbar />
            <PaymentStatus />
            <Footer />
        </>
    )
}

export default Payment_status