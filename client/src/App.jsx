/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useRoutes } from "react-router-dom"
import routes from "./assets/Routes"
import AuthContext from "./assets/components/Context/AuthContext";
import './App.css';
import { useCallback, useEffect, useState } from "react";
import baseURL from "./assets/baseURL";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)
  const [userInfo, setUserInfo] = useState({})

  const router = useRoutes(routes)

  const navigate = useNavigate()

  const login = (userInfo, accessToken, refreshToken) => {
    setIsLoggedIn(true)
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)
    setUserInfo(userInfo)
    localStorage.setItem("userToken", JSON.stringify({ accessToken, refreshToken }))
  }

  const getMe = (userToken) => {
    fetch(`${baseURL}/users/me`, {
      headers: {
        Authorization: `Bearer ${userToken.accessToken}`
      }
    })
      .then(res => {
        return res.json()
      })
      .then(userData => {
        if (userData.message == "jwt expired") {
          refreshTokenHandler()
        } else {
          setIsLoggedIn(true)
          setUserInfo(userData)
          setAccessToken(userToken.accessToken)
          setRefreshToken(userToken.refreshToken)
        }
      })
  }

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("userToken"))

    if (userToken) {
      getMe(userToken)
    }
  }, [])

  const refreshTokenHandler = useCallback(() => {
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
          console.log("ref => ", res)
          return res.json()
        })
        .then(userData => {
          setAccessToken(userData.accessToken)
          setRefreshToken(userData.refreshToken)
          localStorage.setItem("userToken", JSON.stringify({ accessToken: userData.accessToken, refreshToken: userData.refreshToken }))
          getMe(userData)
        })
    }
  }, [])

  const logout = () => {
    // codes
    fetch(`${baseURL}/auth/logout`,
      {
        method: "POST",
        headers: {Authorization: `Bearer ${accessToken}`}
      }
    ).then(res => {
      console.log(res)
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

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      accessToken,
      refreshToken,
      userInfo,
      login,
      logout
    }}>
      {router}
    </AuthContext.Provider>
  )
}

export default App
