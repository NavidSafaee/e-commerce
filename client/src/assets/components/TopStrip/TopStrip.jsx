import { Link } from "react-router-dom"
import "./TopStrip.scss"
import { useContext } from "react"
import AuthContext from "../Context/AuthContext"
import { FaShoppingCart } from "react-icons/fa";

function TopStrip() {

  const authContext = useContext(AuthContext)

  return (
    <>
      <div className="top-strip">
        <div className="left-text">Welcome to our online shop!</div>
        <div className="account-box">
          {authContext.isLoggedIn ?
            <span className="username-container"><Link to={"/user/profile"} style={{textDecoration: "none", color: "#fff"}}>{authContext.userInfo?.username}</Link></span> :
            (<span><Link className="login-btn" to={"/login"}>Login</Link> | <Link to={"/sign-up"} className="sign-up">sign up</Link></span>)
          }
        </div>
        {authContext.isLoggedIn && <div className="cart_btn">
          <FaShoppingCart />
        </div>}
      </div>
    </>
  )
}

export default TopStrip