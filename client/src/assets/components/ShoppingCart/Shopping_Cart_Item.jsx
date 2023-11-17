/* eslint-disable react/prop-types */
import baseURL from "../../baseURL"
import styles from "./ShoppingCart.module.scss"

function Shopping_Cart_Item({img, title}) {
  return (
    <div className={styles.shopping_cart_item}>
      <img src={`${baseURL}/public/${img}`} alt={title} crossOrigin='false' className={styles.image}/>
      <div className={styles.product_detail}>
        <h4 className={styles.title}>
          {title}
        </h4>
      </div>
    </div>
  )
}

export default Shopping_Cart_Item