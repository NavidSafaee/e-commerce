/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom"
import './ResetPassword.scss'
import { useEffect, useState } from "react"
import PreLoader from "../PreLoader/PreLoader"
import baseURL from "../../baseURL"
import { useNavigate } from "react-router-dom"
import { showMessage } from './../../functions'

function ResetPassword() {

  const [isLoaded, setIsLoaded] = useState(false)
  const [userPass, setUserPass] = useState(null)
  const [userConfirmPass, setUserConfirmPass] = useState(null)

  const param = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    let req_body = { token: param.userToken }
    fetch(`${baseURL}/auth/reset-password/token-verification`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(req_body)
    }).then(res => {
      console.log(res)
      if (res.status === 204) {
        setTimeout(() => {
          setIsLoaded(true)
        }, 1000)
      } else {
        navigate("/wrong-url")
      }
    })
  }, [])

  const sendPass = () => {
    let req_body = { password: userPass, confirmPassword: userConfirmPass, token: param.userToken }
    fetch(`${baseURL}/auth/reset-password`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(req_body)
    }).then(res => {
      console.log(res)
      if (!res.ok) {
        return res.json()
      } else {
        showMessage({
          title: "congratulations!",
          text: "Your password has been successfully changed",
          icon: "success",
          timer: 3000
        }).then(val => {
          navigate("/login")
        })
      }
    }).then(data => {
      console.log(data)
      if (data.message) {
        showMessage({
          title: "Sorry",
          text: data.message,
          icon: "error"
        }).then(val => {
          setUserPass("")
          setUserConfirmPass("")
        })
      }
    })
  }

  return (
    <>
      {!isLoaded && <PreLoader />}
      {isLoaded &&
        <section className="resetPass-section">
          <strong className="reset-pass-page-title">Password Reset</strong>
          <p className="user-message">The new password must be different from the old password</p>
          <img src="./../../../../public/general_images/reset-password.png" alt="resetPass" />
          <div className="new-pass-form">
            <input type="password" className="input-item" placeholder="new password" value={userPass} onChange={e => setUserPass(e.target.value)} />
            <input type="password" className="input-item" placeholder="confirm new password" value={userConfirmPass} onChange={e => setUserConfirmPass(e.target.value)} />
            <button className="newPass-set-btn" onClick={sendPass}>Reset Password</button>
          </div>
        </section>
      }
    </>
  )
}

export default ResetPassword