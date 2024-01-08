import { useEffect, useState } from "react"
import { useLocation, useNavigate } from 'react-router-dom'
import Footer from "../components/Footer/Footer"
import ShoppingCart from "../components/ShoppingCart/ShoppingCart"
import TopBar from "../components/TopBar/TopBar"
import TopStrip from "../components/TopStrip/TopStrip"
import baseURL from "../baseURL"
import PreLoader from "../components/PreLoader/PreLoader"

function ShoppingCartPage() {

  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("userToken"))

    if (userToken) {
      fetch(`${baseURL}/users/me`, {
        headers: {
          Authorization: `Bearer ${userToken.accessToken}`
        }
      }).then(res => {
        return res.json()
      }).then(userData => {
        if (userData.role === "CUSTOMER") {
          setIsLoaded(true)
        } else {
          navigate("/access-denied")
        }
      })
    } else {
      navigate("/access-denied")
    }
  }, [pathname])

  return (
    <>
      {
        isLoaded ?
          <>
            <TopStrip />
            <TopBar />
            <ShoppingCart />
            <Footer />
          </>
          :
          <PreLoader />
      }
    </>
  )
}

export default ShoppingCartPage