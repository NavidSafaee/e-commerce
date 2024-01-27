import { useContext, useEffect, useState } from "react";
import st from "./Orders.module.css";
import PreLoader from "../../../components/PreLoader/PreLoader";
import { isTokenExpired, refreshTokenHandler } from "../../../functions";
import AuthContext from "../../../components/Context/AuthContext";
import baseURL from "../../../baseURL";
import { showMessage } from "../../../functions";
import OrderReceived from "../../components/orderReceived/OrderReceived";

// import { off } from "../../../../../../server/src/models/cartModel";

export default function Orders() {
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [category, setCategory] = useState("");
  // const [maxQuantityAllowedInCart, setMaxQuantityAllowedInCart] = useState("");
  // const [images, setImages] = useState([]);
  // const [checkBox, setcheckBox] = useState(true);
  const authContext = useContext(AuthContext);
  const [isContentReady, setIsContentReady] = useState(false);
  const [ordersData, setOrdersData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // const [showAddProduct, setshowAddProduct] = useState(false);

  const getAllOrders = () => {
    const userToken = JSON.parse(localStorage.getItem("userToken"));
    if (isTokenExpired(userToken.accessToken)) {
      refreshTokenHandler().then((token) => {
        authContext.writeTokenInStorage(token);
        getAllOrders();
      });
    } else {
      fetch(`${baseURL}/orders/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken.accessToken}`,
        },
      })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setOrdersData(data);
          setIsContentReady(true);
        });
    }
  };
  window.addEventListener("click", () => {
    console.log(ordersData);
  })
  
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
            })
          }
        });
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  ///******************************************************************************************* */
  // useEffect(() => {
  //   console.clear();
  //   images.length && console.log(images);
  // }, [images]);

  // const onSubmit = (event) => {
  //   event.preventDefault();
  //   console.log("Images:", images);
  //   const formdata = new FormData();
  //   formdata.append("files", images);

  // const selectFiles = (e) => {
  //   setImages([]);
  //   let arry = [];
  //   const arrFromObj = Object.keys(e.target.files);
  //   for (let x in e.target.files) {
  //     if (x < arrFromObj.length) {
  //       arry.push(e.target.files[x]);
  //     }
  //   }
  //   setImages([...images, ...arry]);
  // };



  return (
    <>
      {!isContentReady && <PreLoader />}
      {isContentReady && (
        <div className={st.pageContentWrapper}>
          

          {showModal && (
            <>
              <div className={st.modal_bg}>
                <form onSubmit={FormSender} className={st.OrderForm}>
                  <h2 className={st.form_title}>New product info</h2>
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
                  <div className={st.formInputsRow}>
                    <input
                      className={st.submit_btn}
                      value={"Done"}
                      type="submit"
                    />
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
          )}

          <button className={st.newOrderBtn} onClick={() => setShowModal(true)}>
            Create new Order
          </button>

          <table className={st.userListTable}>
            <thead className={st.table_header}>
              <th>received</th>
              <th>id</th>
              <th>username</th>
              <th>email</th>
              <th>birthday</th>
              <th>phone number</th>
              <th>add product</th>
            </thead>
            <tbody className={st.table_body}>
              {ordersData?.map((user, i) => (
                // <tr key={user._id}>
                <OrderReceived user={user} i={i} key="i" />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
