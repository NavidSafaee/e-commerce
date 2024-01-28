import { useContext, useEffect, useState } from "react";
import st from "./Orders.module.css";
import PreLoader from "../../../components/PreLoader/PreLoader";
import { isTokenExpired, refreshTokenHandler } from "../../../functions";
import AuthContext from "../../../components/Context/AuthContext";
import baseURL from "../../../baseURL";
import OrderReceived from "../../components/orderReceived/OrderReceived";
import AdminOrder from "../../components/adminOrder/adminOrder";

// import { off } from "../../../../../../server/src/models/cartModel";

export default function Orders() {
  // const [date, setDate] = useState("");
  // const [price, setPrice] = useState("");
  // const [quantity, setQuantity] = useState(0);
  // const [title, setTitle] = useState("");
  // const [orderCount, setorderCount] = useState("1");
  // const [description, setDescription] = useState("");
  // const [category, setCategory] = useState("");
  // const [maxQuantityAllowedInCart, setMaxQuantityAllowedInCart] = useState("");
  // const [images, setImages] = useState([]);
  // const [checkBox, setcheckBox] = useState(true);
  const authContext = useContext(AuthContext);
  const [isContentReady, setIsContentReady] = useState(false);
  const [ordersData, setOrdersData] = useState([]);
  const [showCountModal, setShowCountModal] = useState(false);
  const [orderCount, setOrderCount] = useState(1)
  const [showOrderDetailModal, setShowOrderDetailModal] = useState(false)

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
  }

  const writeInStorage = (num) => {
    localStorage.setItem("ordersCount", JSON.stringify({ count: num }))
  }

  // const FormSender = (event) => {
  //   event.preventDefault();
  //   const userToken = JSON.parse(localStorage.getItem("userToken"));
  //   if (isTokenExpired(userToken.accessToken)) {
  //     refreshTokenHandler().then((token) => {
  //       authContext.writeTokenInStorage(token);
  //       FormSender();
  //     });
  //   } else {
  //     let formInfo = {
  //       orderItems: [
  //         {
  //           product: {
  //             title: title,
  //             price: +price,
  //           },
  //           quantity: +quantity,
  //         },
  //       ],
  //       deliveryDate: date,
  //     };
  //     fetch(`${baseURL}/orders`, {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json",
  //         Authorization: `Bearer ${userToken.accessToken}`,
  //       },
  //       body: JSON.stringify(formInfo),
  //     })
  //       .then((res) => {
  //         if (res.status === 204) {
  //           setShowCountModal(true);
  //         } else {
  //           return res.json();
  //         }
  //       })
  //       .then((data) => {
  //         if (data) {
  //           showMessage({
  //             title: "Oops!",
  //             text: data.message,
  //             icon: "warning",
  //           });
  //         }
  //       });
  //   }
  // };

  useEffect(() => {
    getAllOrders()
  }, [])

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
          {showCountModal && (
            <>
              <div className={st.modal_bg}>
                <form className={st.OrderForm}>
                  <h2 className={st.form_title}>New order count</h2>
                  <div className={st.formInputsRow}>
                    <input
                      type="number"
                      placeholder="Enter number of product"
                      onChange={(e) => setOrderCount(e.target.value)}
                      value={orderCount}
                      style={{ fontSize: 24 }}
                    />
                  </div>
                  <div className={st.formInputsRow}>
                    <button
                      onClick={() => { setShowCountModal(false); setOrderCount(1); setShowOrderDetailModal(true); writeInStorage(orderCount) }}
                      className={st.submit_btn}
                    >
                      Continue
                    </button>
                    <button
                      onClick={() => { setShowCountModal(false); setOrderCount(1) }}
                      className={st.cancelBtn}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}

          {showOrderDetailModal &&
            (
              <AdminOrder onClose={() => setShowOrderDetailModal(false)} />
            )
          }

          <button className={st.newOrderBtn} onClick={() => setShowCountModal(true)}>
            Create new Order
          </button>

          <table className={st.userListTable}>
            <thead className={st.table_header}>
              <th >Received</th>
              <th>Id</th>
              <th>username</th>
              <th>email</th>
              <th>birthday</th>
              <th>isDelivered</th>
              <th>action</th>
            </thead>
            <tbody className={st.table_body}>
              {ordersData?.reverse().map((order, i) => (
                // <tr key={order._id}>
                <OrderReceived order={order} i={i} key={i} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}