import { useEffect, useState } from "react"
import SignupPageComponent from "../components/SignupPageComponent/SignupPageComponent"
import PreLoader from "../components/PreLoader/PreLoader"

function SignupPage() {

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 3000)
  }, [])

  return (
    <>
      {!isLoaded && <PreLoader />}

      {isLoaded && <SignupPageComponent />}
    </>
  )
}

export default SignupPage