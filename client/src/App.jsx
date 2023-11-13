/* eslint-disable react-hooks/exhaustive-deps */
import { useRoutes } from "react-router-dom"
import routes from "./assets/Routes"
import AuthContext from "./assets/components/Context/AuthContext";
import './App.css';
import { useEffect, useState } from "react";
import baseURL from "./assets/baseURL";

function App() {

  const router = useRoutes(routes)

  const login = (userInfo, accessToken, refreshToken) => {
    setIsLoggedIn(true)
    setAccessToken(accessToken)
    setrefreshToken(refreshToken)
    setUserInfo(userInfo)
    localStorage.setItem("userToken", JSON.stringify({ accessToken, refreshToken }))
  }

  useEffect(() => {
    const localstorageData = JSON.parse(localStorage.getItem("userToken"))
    if (localstorageData?.accessToken) {
      fetch(`${baseURL}/users/me`, {
        headers: {
          Authorization: `Bearer ${localstorageData.accessToken}`
        }
      })
        .then(res => res.json())
        .then(userData => {
          setIsLoggedIn(true)
          setUserInfo(userData)
          setAccessToken(accessToken)
          setrefreshToken(refreshToken)
        })
    }
  }, [login])

  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setrefreshToken] = useState(null)
  const [userInfo, setUserInfo] = useState({})

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
