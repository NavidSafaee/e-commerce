import { useParams } from "react-router-dom"
import './ResetPassword.scss'
import { useEffect, useState } from "react"
import PreLoader from "../PreLoader/PreLoader"

function ResetPassword() {

  const [isLoaded, setIsLoaded] = useState(false)

  const param = useParams()
  console.log(param.userId)

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 3000)
  }, [])

  return (
    <>
      {!isLoaded && <PreLoader />}
      {isLoaded &&
        <section className="resetPass-section">
          <strong className="reset-pass-page-title">Password Reset</strong>
          <p className="user-message">The new password must be different from the old password</p>
          <img src="./../../../../public/general_images/reset-password.png" alt="resetPass" />
          <div className="new-pass-form">
            <input type="password" className="input-item" placeholder="new password" />
            <input type="password" className="input-item" placeholder="confirm new password" />
            <button className="newPass-set-btn">Reset Password</button>
          </div>
        </section>
      }
    </>
  )
}

export default ResetPassword