import { useEffect, useState } from "react"
import LoginPageComponent from "../components/LoginPageComponent/LoginFormComponent"
import PreLoader from "../components/PreLoader/PreLoader"


function LoginPage() {

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 3000)
  }, [])

  return (
    <>
      {!isLoaded && <PreLoader />}

      {isLoaded && <LoginPageComponent />}
    </>
  )
}

export default LoginPage