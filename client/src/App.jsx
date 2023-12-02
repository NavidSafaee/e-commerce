/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useRoutes } from "react-router-dom"
import routes from "./assets/Routes"
import AuthContext from "./assets/components/Context/AuthContext";
import './App.css';
import { useCallback, useEffect, useState } from "react";
import baseURL from "./assets/baseURL";
import { isTokenExpired } from "./assets/functions";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)
  const [userInfo, setUserInfo] = useState({})

  const router = useRoutes(routes)

  const navigate = useNavigate()

  const writeTokenInStorage = (token) => {
    console.log("writeTokenInStorage => ", "binamoose dalghak!", token);
    setAccessToken(token.accessToken)
    setRefreshToken(token.refreshToken)
    localStorage.setItem("userToken", JSON.stringify({ accessToken: token.accessToken, refreshToken: token.refreshToken }))
  }

  const login = (userInfo, accessToken, refreshToken) => {
    setIsLoggedIn(true)
    writeTokenInStorage({ accessToken, refreshToken })
    setUserInfo(userInfo)
  }

  const getMe = (userToken) => {
    console.log('getme bus');
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
            console.log("when expired! ", userToken)
            getMe(userToken);
          })
        } else {
        console.log("normal", userToken)
        getMe(userToken)
      }
    }
  }, [])

  const refreshTokenHandler = useCallback(() => {
    const userToken = JSON.parse(localStorage.getItem("userToken"))
    if (userToken.refreshToken) {
      return fetch(`${baseURL}/auth/refresh-token`, {
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
