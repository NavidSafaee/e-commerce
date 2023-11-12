import { useRoutes } from "react-router-dom"
import routes from "./assets/Routes"
import AuthContext from "./assets/components/Context/AuthContext";
import './App.css';
import { useState } from "react";

function App() {

  const router = useRoutes(routes)

  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [token, setToken] = useState(null)
  const [refreshToken, setrefreshToken] = useState(null)
  const [userInfo, setUserInfo] = useState({})

  const login = (userInfo, token, refreshToken) => {
    setToken(token)
    setUserInfo(userInfo)
    setIsLoggedIn(true)
    setrefreshToken(refreshToken)
    localStorage.setItem("user", JSON.stringify({ token }))
  }

  const logout = () => {
    setToken(null)
    setUserInfo({})
    setIsLoggedIn(false)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      token,
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
