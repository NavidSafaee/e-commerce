import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from 'react-router-dom'
import Footer from "../components/Footer/Footer"
import ShoppingCart from "../components/ShoppingCart/ShoppingCart"
import TopBar from "../components/TopBar/TopBar"
import TopStrip from "../components/TopStrip/TopStrip"
import baseURL from "../baseURL"
import PreLoader from "../components/PreLoader/PreLoader"
import { isTokenExpired, refreshTokenHandler } from "../functions"
import AuthContext from "../components/Context/AuthContext"

function ShoppingCartPage() {

  const authContext = useContext(AuthContext)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [isLoaded, setIsLoaded] = useState(false)

  const routeHandler = () => {
    const userToken = JSON.parse(localStorage.getItem("userToken"))
    if (isTokenExpired(userToken?.accessToken)) {
      refreshTokenHandler()
        .then(token => {
          authContext.writeTokenInStorage(token)
          routeHandler()
        })
    } else {
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
    }
  }

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("userToken"))

    if (userToken) {
      routeHandler()
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