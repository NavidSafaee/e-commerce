import { Link } from "react-router-dom"
import "./TopStrip.scss"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../Context/AuthContext"
import { FaShoppingCart } from "react-icons/fa";
import baseURL from "../../baseURL";
import { isTokenExpired, refreshTokenHandler } from "../../functions";

function TopStrip() {

  const authContext = useContext(AuthContext)
  const [isCartChanged, setIsCartChanged] = useState(false)

  const getCartProducts = () => {
    const userToken = JSON.parse(localStorage.getItem("userToken"))
    if (userToken && isTokenExpired(userToken?.accessToken)) {
      refreshTokenHandler()
        .then(token => {
          authContext.writeTokenInStorage(token)
          getCartProducts()
        })
    } else {
      fetch(`${baseURL}/carts/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken?.accessToken}`
        }
      })
        .then(res => {
          if (res.status !== 404) {
            return res.json()
          }
        })
        .then(data => { authContext?.productsCountCalculator(data) })
    }
  }

  useEffect(() => {
    if (authContext?.isLoggedIn) {
      getCartProducts()
    }
  }, [])

  useEffect(() => {
    setIsCartChanged(true)
  }, [authContext?.productsCountInCart])

  useEffect(() => {
    if (isCartChanged) {
      setTimeout(() => {
        setIsCartChanged(false)
      }, 2000)
    }
  }, [isCartChanged])

  return (
    <>
      <div className="top-strip">
        <div className="left-text">Welcome to our online shop!</div>
        <div className="account-box">
          {authContext?.isLoggedIn ?
            <span className="username-container"><Link to={"/user/profile"} style={{ color: "#009", fontSize: 24 }}>{authContext.userInfo?.username}</Link></span> :
            (<span><Link className="login-btn" to={"/login"}>Login</Link> | <Link to={"/sign-up"} className="sign-up">sign up</Link></span>)
          }
        </div>
        {authContext?.isLoggedIn && <Link to={"/checkout/cart/"} className={`cart_btn ${isCartChanged ? "shake" : null}`}>
          <FaShoppingCart />
          {authContext?.productsCountInCart ? <div className="cart_badge">{authContext?.productsCountInCart}</div> : null}
        </Link>}
      </div>
    </>
  )
}

export default TopStrip