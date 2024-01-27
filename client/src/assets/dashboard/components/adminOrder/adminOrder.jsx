import React from "react";
import baseURL from "../../../baseURL";
import authContext from "../../../components/Context/AuthContext";
import {
  isTokenExpired,
  refreshTokenHandler,
  showMessage,
} from "../../../functions";
import st from "./../../panelPages/Orders/orders.module.css";
import { useContext, useState } from "react";

function AdminOrder() {
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [title, setTitle] = useState("");
  const [orderCount, setorderCount] = useState("1");

  const FormSender = (event) => {
    event.preventDefault();
    const userToken = JSON.parse(localStorage.getItem("userToken"));
    if (isTokenExpired(userToken.accessToken)) {
      refreshTokenHandler().then((token) => {
        authContext.writeTokenInStorage(token);
        FormSender();
      });
    } else {
      let formInfo = {
        orderItems: [
          {
            product: {
              title: title,
              price: +price,
            },
            quantity: +quantity,
          },
        ],
        deliveryDate: date,
      };
      fetch(`${baseURL}/orders`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userToken.accessToken}`,
        },
        body: JSON.stringify(formInfo),
      })
        .then((res) => {
          if (res.status === 204) {
            setShowModal(true);
          } else {
            return res.json();
          }
        })
        .then((data) => {
          if (data) {
            showMessage({
              title: "Oops!",
              text: data.message,
              icon: "warning",
            });
          }
        });
    }
  };

  return (
    // <div>
    //   <div className={st.pageContentWrapper}>
        <>
          <div className={st.modal_bg}>
            <form onSubmit={FormSender} className={st.OrderForm}>
              {/* <h2 className={st.form_title}>New product info</h2>
              <div className={st.formInputsRow}>
                <input
                  type="number"
                  placeholder="Enter number of product"
                  onChange={(e) => {
                    console.log(e.target.value, "valuuuuuuuuuuuuuuuuuuu");
                    setorderCount(e.target.value);
                  }}
                />
              </div> */}
              {Array.from(Array(orderCount).keys())?.map(
                (i) => console.log(i, "mapiiiiiiiii")
                // <AiTwotoneStar key={i} className={ComponentStyle.coloredStar} />
              )}
              <div className={st.formBody}>
                <div className={st.formInputsRow}>
                  <input
                    type="text"
                    placeholder="Enter products title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <input type="text" placeholder="Enter producer name" />
                </div>
                <div className={st.formInputsRow}>
                  <input
                    type="number"
                    placeholder="How many products have arrived?"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="product's price "
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className={st.formInputsRow}>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>

              <div className={st.formInputsRow}>
                <input className={st.submit_btn} value={"Done"} type="submit" />
                <button
                  onClick={() => setShowModal(false)}
                  className={st.cancelBtn}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </>
    //   </div>
    // </div>
  );
}

export default AdminOrder;
