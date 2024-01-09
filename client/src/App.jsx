/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useRoutes } from "react-router-dom"
import mainRoutes from "./assets/Routes"
import AuthContext from "./assets/components/Context/AuthContext";
import './App.css';
import { useEffect, useState } from "react";
import baseURL from "./assets/baseURL";
import { isTokenExpired, refreshTokenHandler } from "./assets/functions";
import ScrollToTop from "./assets/components/ScrollToTop";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [productsCountInCart, setProductsCountInCart] = useState(0)
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)
  const [userInfo, setUserInfo] = useState({})

  const router = useRoutes(mainRoutes)

  const navigate = useNavigate()

  const writeTokenInStorage = (token) => {
    setAccessToken(token.accessToken)
    setRefreshToken(token.refreshToken)
    localStorage.setItem("userToken", JSON.stringify({ accessToken: token.accessToken, refreshToken: token.refreshToken }))
  }

  const productsCountCalculator = inp => {  // inp can be a bipolar_number or an array
    if (typeof inp == "number") {
      setProductsCountInCart(sum => sum + inp)
    } else {
      let sum = 0
      inp.map(item => {
        sum += item.quantity
      })
      setProductsCountInCart(sum)
    }
  }

  const login = (userInfo, accessToken, refreshToken) => {
    setIsLoggedIn(true)
    writeTokenInStorage({ accessToken, refreshToken })
    setUserInfo(userInfo)
  }

  const getMe = (userToken) => {
    fetch(`${baseURL}/users/me`, {
      headers: {
        Authorization: `Bearer ${userToken.accessToken}`
      }
    }).then(res => {
      return res.json()
    }).then(userData => {
      writeTokenInStorage(userToken)
      setIsLoggedIn(true)
      setUserInfo(userData)
    })
  }

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("userToken"))

    if (userToken) {
      if (isTokenExpired(userToken.accessToken)) {
        refreshTokenHandler()
          .then(userToken => {
            getMe(userToken);
          })
      } else {
        getMe(userToken)
      }
    }
  }, [])


  const logout = async () => {
    const userToken = JSON.parse(localStorage.getItem("userToken"))
    if (isTokenExpired(userToken.accessToken)) {
      refreshTokenHandler()
        .then(userData => {
          writeTokenInStorage(userData)
          setIsLoggedIn(true)
          setUserInfo(userData)
          setAccessToken(userToken.accessToken)
          setRefreshToken(userToken.refreshToken)
          logout()
        })
    } else {
      await fetch(`${baseURL}/auth/logout`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${userToken.accessToken}` }
        }
      ).then(res => {
        if (res.ok) {
          setAccessToken("")
          setIsLoggedIn(false)
          setRefreshToken("")
          setUserInfo(null)
          localStorage.removeItem("userToken")
          navigate("/")
        }
      })
    }
  }

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      productsCountInCart,
      accessToken,
      refreshToken,
      userInfo,
      login,
      logout,
      writeTokenInStorage,
      productsCountCalculator
    }}>
      <ScrollToTop />
      {router}
    </AuthContext.Provider>
  )
}

export default App
