/* eslint-disable react-hooks/exhaustive-deps */
import { useRoutes } from "react-router-dom"
import routes from "./assets/Routes"
import AuthContext from "./assets/components/Context/AuthContext";
import './App.css';
import { useEffect, useState } from "react";
import baseURL from "./assets/baseURL";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setrefreshToken] = useState(null)
  const [userInfo, setUserInfo] = useState({})

  const router = useRoutes(routes)

  const login = (userInfo, accessToken, refreshToken) => {
    setIsLoggedIn(true)
    setAccessToken(accessToken)
    setrefreshToken(refreshToken)
    setUserInfo(userInfo)
    localStorage.setItem("userToken", JSON.stringify({ accessToken, refreshToken }))
  }

  const getMe = () => {
    const userToken = JSON.parse(localStorage.getItem("userToken"))
    fetch(`${baseURL}/users/me`, {
      headers: {
        Authorization: `Bearer ${userToken.accessToken}`
      }
    })
      .then(res => {
        return res.json()
      })
      .then(userData => {
        if (userData.message === "jwt expired") {
          refreshTokenHandler()
        } else {
          setIsLoggedIn(true)
          setUserInfo(userData)
          setAccessToken(accessToken)
          setrefreshToken(refreshToken)
        }
      })
  }

  useEffect(() => {
    console.log(isLoggedIn);
    const userToken = JSON.parse(localStorage.getItem("userToken"))
    if (userToken) {
      getMe()
    }
  }, [])

  const refreshTokenHandler = () => {
    const userToken = JSON.parse(localStorage.getItem("userToken"))
    if (userToken) {
      fetch(`${baseURL}/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ token: userToken.refreshToken })
      })
        .then(res => {
          return res.json()
        })
        .then(userData => {
          console.log(userData)
          setIsLoggedIn(true)
          setUserInfo(userData)
          setAccessToken(accessToken)
          setrefreshToken(refreshToken)
          localStorage.setItem("userToken", JSON.stringify({ accessToken, refreshToken }))
        })
    }
  }

  const logout = () => {
    setAccessToken(null)
    setUserInfo({})
    setIsLoggedIn(false)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      accessToken,
      userInfo,
      login,
      logout,
      refreshToken
    }}>
      {router}
    </AuthContext.Provider>
  )
}

export default App
