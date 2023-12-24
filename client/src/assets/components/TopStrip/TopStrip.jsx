import { Link } from "react-router-dom"
import "./TopStrip.scss"
import { useContext } from "react"
import AuthContext from "../Context/AuthContext"
import { FaPowerOff } from "react-icons/fa"
import { showMessage } from "../../functions"

function TopStrip() {

  const authContext = useContext(AuthContext)

  const logout = () => {
    showMessage({
      title: "Logout",
      text: "Are you Sure?",
      icon: "warning",
      buttons: ["No", "Yes"]
    }).then(select => {
      if (select) {
        authContext.logout({ accessToken: authContext.accessToken, refreshToken: authContext.refreshToken })
      }
    })
  }

  return (
    <>
      <div className="top-strip">
        <div className="left-text">Welcome to our online shop!</div>
        <div className="brand-box">
          <img src="../../../../public/general_images/logo.png" alt="logo" />
          <strong className='brand-name'>Soft Land</strong>
        </div>
        <div className="account-box">
          {authContext.isLoggedIn ?
            <span className="username-container">{authContext.userInfo?.username}</span> :
            (<span><Link className="login-btn" to={"/login"}>Login</Link> | <Link to={"/sign-up"} className="sign-up">sign up</Link></span>)
          }
        </div>
        {authContext.isLoggedIn && <div className="logout-btn" onClick={logout}>
          <FaPowerOff />
        </div>}
      </div>
    </>
  )
}

export default TopStrip