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
import { useContext } from "react"

function Shopping_Cart_Item({ id, img, title, rate, price, quantity }) {

  let coloredStars = Array.from(Array(rate).keys())
  let greyStars = Array.from(Array(5 - rate).keys())
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
      fetch(`${baseURL}/carts/me/items/${id}/quantity?action=${type}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken.accessToken}`
        }
      }).then(res => {
        console.log(res)
      })
    }
  }

  return (
    <div className={styles.shopping_cart_item}>
      {/* <img src={`${baseURL}/public/${img}`} alt={title} crossOrigin='false' className={styles.image} /> */}
      <Link to={`/products/${id}`}><img className={styles.image} src="https://www.housingunits.co.uk/media/catalog/product/cache/60968cec045f20fb06ab5f7720001507/b/3/b3b902eece620811430206db7d3ac32c.jpg" alt="" /></Link>
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
        <div className={styles.countBox}>
          <button
            className={styles.count_btn}
            onClick={() => {quantity === 1 ? productRemoveHandler() : changeQuantity("decrease")}}
          >
            {quantity === 1 ? <FaTrashCan /> : <FaMinus />}
          </button>
          <input className={styles.count_show} disabled value={quantity} />
          <button
            className={`${styles.count_btn} ${quantity == 5 && styles.disabled}`}
            disabled={quantity == 5}
            onClick={() => changeQuantity("increase")}
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Shopping_Cart_Item