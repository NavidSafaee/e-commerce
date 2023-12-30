/* eslint-disable react/prop-types */
import { useState } from "react"
import baseURL from "../../baseURL"
import styles from "./ShoppingCart.module.scss"
import { FaPlus } from "react-icons/fa"
import { FaMinus } from "react-icons/fa"
import { LuStar } from "react-icons/lu"
import { MdStar } from "react-icons/md"
import { Multiplier } from "../../functions"

function Shopping_Cart_Item({ img, title, rate, price }) {

  let coloredStars = Array.from(Array(rate).keys())
  let greyStars = Array.from(Array(5 - rate).keys())

  const [count, setCount] = useState(1)

  const changeCount = (op) => {
    if (op == 1) {
      setCount(pre => pre + 1)
    } else {
      setCount(pre => pre - 1)
    }
  }

  return (
    <div className={styles.shopping_cart_item}>
      <img src={`${baseURL}/public/${img}`} alt={title} crossOrigin='false' className={styles.image} />
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
        <div className={styles.price_box}>$ {Multiplier(price, count)}</div>
        <div className={styles.countBox}>
          <button
            className={`${styles.count_btn} ${count == 1 && styles.disabled}`}
            disabled={count == 1}
            onClick={() => changeCount(-1)}
          >
            <FaMinus />
          </button>
          <input className={styles.count_show} disabled value={count} />
          <button
            className={`${styles.count_btn} ${count == 5 && styles.disabled}`}
            disabled={count == 5}
            onClick={() => changeCount(1)}
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Shopping_Cart_Item