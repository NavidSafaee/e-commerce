import Footer from "../components/Footer/Footer"
import Navbar from "../components/Navbar/Navbar"
import TopBar from "../components/TopBar/TopBar"
import TopStrip from "../components/TopStrip/TopStrip"
import PreLoader from "../components/PreLoader/PreLoader"

// const [isLoaded, setIsLoaded] = useState(true)
const isLoaded=true
// useEffect(() => {
//     setTimeout(() => {
//         setIsLoaded(true)
//     }, 2000)
// }, [])


export default function About(props) {


    return (
        <>
            {!isLoaded && <PreLoader type={"RotatingSquare"} />}
            {isLoaded && <TopStrip />}
            {isLoaded && <TopBar />}
            {isLoaded && <Navbar />}
            
            {isLoaded && <Footer />}

        </>
    )
}


