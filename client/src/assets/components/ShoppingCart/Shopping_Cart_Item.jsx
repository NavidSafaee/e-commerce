/* eslint-disable react/prop-types */
import baseURL from "../../baseURL"
import styles from "./ShoppingCart.module.scss"
import { FaPlus } from "react-icons/fa"
import { FaMinus } from "react-icons/fa"
import { LuStar } from "react-icons/lu"
import { MdStar } from "react-icons/md"
import { Multiplier, isTokenExpired, refreshTokenHandler } from "../../functions"
import { Link } from "react-router-dom"
import { FaTrashCan } from "react-icons/fa6";
import AuthContext from "../Context/AuthContext"
import { useContext, useState } from "react"
import { Spinner } from "react-bootstrap"

function Shopping_Cart_Item({ id, img, title, rate, price, quantity, onChange }) {

  const [buttonPending, setButtonPending] = useState(false)

  let coloredStars = Array.from(Array(4).keys())
  let greyStars = Array.from(Array(5 - 4).keys())
  const authContext = useContext(AuthContext)

  const changeQuantity = (type) => {
    const userToken = JSON.parse(localStorage.getItem("userToken"))
    if (isTokenExpired(userToken.accessToken)) {
      refreshTokenHandler()
        .then(token => {
          authContext.writeTokenInStorage(token)
          changeQuantity(type)
        })
    } else {
      if (type === "increase") {
        setButtonPending(1)
      } else {
        setButtonPending(-1)
      }
      fetch(`${baseURL}/carts/me/items/${id}/quantity?action=${type}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${userToken.accessToken}`
        }
      }).then(res => {
        if (res.ok) {
          if (type === "increase") {
            authContext.productsCountCalculator(1)
          } else {
            authContext.productsCountCalculator(-1)
          }
          setButtonPending(0)
          onChange()
        }
      })
    }
  }

  const productRemoveHandler = (id) => {
    const userToken = JSON.parse(localStorage.getItem("userToken"))
    if (isTokenExpired(userToken.accessToken)) {
      refreshTokenHandler()
        .then(token => {
          authContext.writeTokenInStorage(token)
          productRemoveHandler(id)
        })
    } else {
      fetch(`${baseURL}/carts/me/items/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userToken.accessToken}`
        }
      }).then(res => {
        if (res.ok) {
          onChange()
          authContext.productsCountCalculator(-quantity)
        }
      })
    }
  }

  return (
    <div className={styles.shopping_cart_item}>
      <FaTrashCan className={styles.removeBtn} onClick={() => productRemoveHandler(id)}/>
      {/* <img src={`${baseURL}/public/${img}`} alt={title} crossOrigin='false' className={styles.image} /> */}
      <Link to={`/products/${id}`}><img className={styles.image} src={`${baseURL}/${img.slice(0, 22)}/${img.slice(22)}`} crossOrigin="false" alt="" /></Link>
      <div className={styles.product_detail}>
        <h4 className={styles.title}>
          {title}
        </h4>
        {rate !== null && <div className={styles.rate_box}>
          {
            coloredStars.map((star, i) => (
              <MdStar key={i} className={styles.colored_star} />
            ))
          }
          {
            greyStars.map((star, i) => (
              <LuStar key={i} className={styles.grey_star} />
            ))
          }
        </div>}
        <div className={styles.price_box}>$ {Multiplier(price, quantity)}</div>
        <div className={styles.btnBox}>
          {quantity ?
            <div className={styles.countBox}>
              <button
                className={styles.count_btn}
                onClick={() => { quantity === 1 ? productRemoveHandler(id) : changeQuantity("decrease") }}
              >
                {
                  (buttonPending === -1) ? <Spinner animation="grow" variant="light" /> :
                    (quantity === 1 && buttonPending !== -1) ? <FaTrashCan />
                      :
                      ((quantity > 1) && (buttonPending !== -1)) ? <FaMinus /> : null
                }
              </button>
              <input className={styles.count_show} disabled value={quantity} />
              <button
                className={`${styles.count_btn} ${quantity == 5 && styles.disabled}`}
                disabled={quantity == 5}
                onClick={() => changeQuantity("increase")}
              >
                {(buttonPending === 1) && <Spinner animation="grow" variant="light" />}
                {(buttonPending !== 1) && <FaPlus />}
              </button>
            </div>
            :
            null
          }
        </div>
      </div>
    </div>
  )
}

export default Shopping_Cart_Item