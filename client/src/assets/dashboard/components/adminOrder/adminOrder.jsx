/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import baseURL from "../../../baseURL";
import AuthContext from "../../../components/Context/AuthContext";
import { isTokenExpired, refreshTokenHandler, showMessage } from "../../../functions";
import st from "./../../panelPages/Orders/orders.module.css";
import { useContext, useEffect, useState } from "react";

function AdminOrder({ onClose }) {

  const authContext = useContext(AuthContext)

  const [deliveryDate, setDeliveryDate] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [title, setTitle] = useState("");
  const [formCounter, setFormCounter] = useState(0)
  const [ordersCount, setOrdersCount] = useState(0)
  const [ordersList, setOrdersList] = useState([])
  const [isOrderComplete, setIsOrderComplete] = useState(false)

  const sendOrder = (data) => {
    const userToken = JSON.parse(localStorage.getItem("userToken"))
    if (isTokenExpired(userToken.accessToken)) {
      refreshTokenHandler()
        .then(token => {
          authContext.writeTokenInStorage(token)
          sendOrder(data)
        })
    } else {
      fetch(`${baseURL}/orders`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken.accessToken}`,
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(res => {
        console.log(res)
        return res.json()
      }).then(result => {
        console.log(result)
        showMessage({
          title: "Great!! 😍",
          text: "Your order has been successfully placed",
          icon: "success"
      }).then(v => location.reload())
      })
    }
  }

  useEffect(() => {
    const num = JSON.parse(localStorage.getItem("ordersCount"))
    setOrdersCount(+num.count)
  }, [])

  useEffect(() => {
    if (isOrderComplete) {
      sendOrder({ "orderItems": ordersList, "deliveryDate": deliveryDate })
    }
  }, [isOrderComplete])

  const addProductToList = (inp) => {
    let newProductInfo = {
      "product": {
        "title": inp.title,
        "price": inp.price
      },
      "quantity": inp.quantity
    }
    setOrdersList(pre => [...pre, newProductInfo])
  }

  return (
    // <div>
    //   <div className={st.pageContentWrapper}>
    <>
      <div className={st.modal_bg}>
        <form className={st.OrderForm}>
          <h2 className={st.form_title}>New order info</h2>
          <div className={st.formBody}>
            <div className={st.itemsRow}>
              order form: {formCounter + 1} / {ordersCount}
            </div>
            <div className={st.formInputsRow}>
              <input
                type="text"
                placeholder="Enter products title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input type="text" placeholder="Enter product's price" value={price} onChange={e => setPrice(e.target.value)} />
            </div>
            <div className={st.formInputsRow}>
              <label htmlFor="number-input">quantity:</label>
              <input
                type="number"
                id="number-input"
                placeholder="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            {formCounter + 1 === ordersCount && <div className={st.formInputsRow}>
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
            </div>}
          </div>

          <div className={st.formInputsRow}>
            <div
              className={st.submit_btn}
              onClick={() => {
                addProductToList({ title: title, price: price, quantity: quantity })
                if (formCounter + 1 < ordersCount) {
                  setFormCounter(pre => pre + 1)
                  setTitle("")
                  setPrice("")
                  setQuantity("")
                } else {
                  setIsOrderComplete(true)
                }
              }}
            >
              {formCounter + 1 < ordersCount ? "next" : "done"}
            </div>
            <div
              className={st.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AdminOrder;
