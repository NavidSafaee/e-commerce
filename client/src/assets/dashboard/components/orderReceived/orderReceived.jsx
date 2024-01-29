/* eslint-disable react/prop-types */
import { FaEye } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import baseURL from "../../../baseURL";
import AuthContext from "../../../components/Context/AuthContext";
import {
  isTokenExpired,
  refreshTokenHandler,
  showMessage,
} from "../../../functions";
import st from "./../../panelPages/Orders/orders.module.css";
// import OrderReceived from "../../components/orderReceived/orderReceived";

// import st from "./Orders.module.css";

import { useContext, useEffect, useState } from "react";

function OrderReceived({ order, i }) {
  const authContext = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showOrderItems, setShowOrderItems] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [discount, setDiscount] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [maxQuantityAllowedInCart, setMaxQuantityAllowedInCart] = useState("");
  const [quantity, setQuantity] = useState("");
  const [orderIdPut111, setorderIdPut111] = useState("");
  const [images, setImages] = useState([]);
  const [OrderObject, setOrderObject] = useState({});
  const [orderFlag, setOrderFlag] = useState(false);
  const [itemValue, setItemValue] = useState({});
  const [textArea, setTextArea] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [orderIdPut, setOrderIdPut] = useState({
    _id: "",
    user: "",
    items: [],
    isDelivered: true,
    deliveryDate: "",
    createdAt: "",
    createdAt: "",
    isDelivered: true,
    items: [],
    updatedAt: "",
    __v: "",
  });
  const [ordersData, setOrdersData] = useState([]);

  const [price, setPrice] = useState("");
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [isContentReady, setIsContentReady] = useState(false);

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
          // console.log(res);
          return res.json();
        })
        .then((data) => {
          // console.log(data);
          setOrdersData(data);
          // console.log(ordersData, "ordersDataordersDataordersDataordersData");
          setIsContentReady(true);
        });
    }
  };

  const formData = new FormData();
  const selectFiles = (e) => {
    console.log(e.target.files.length);
    for (let i = 0; i < e.target.files.length; i++) {
      console.log(e.target.files[i]);
      formData.append("images", e.target.files[i]);
    }
    // setImages[images]
    // let arry = [];
    // const arrFromObj = Object.keys(e.target.files);
    // for (let x in e.target.files) {
    //   if (x < arrFromObj.length) {
    //     arry.push(e.target.files[x]);
    //   }
    // }
    // setImages([...images, ...arry]);
  };

  const handleselectedOption = (e) => {
    console.log(e.target.value);
    console.log(e.target);
    setSelectedOption(e.target.value);
    // console.log();
  };

  const addProductFormSender = (event) => {
    console.log(
      title,
      quantity,
      typeof price,
      category,
      description,
      maxQuantityAllowedInCart,
      images
    );
    event.preventDefault();
    const userToken = JSON.parse(localStorage.getItem("userToken"));
    if (isTokenExpired(userToken.accessToken)) {
      refreshTokenHandler().then((token) => {
        authContext.writeTokenInStorage(token);
        addProductFormSender();
      });
    } else {
      if (discount) {
        formData.append("orderId", order._id);
        formData.append("itemId", itemValue._id);
        formData.append("title", itemValue.product.title);
        formData.append("quantity", itemValue.quantity);
        formData.append("discount", discount);
        formData.append("price", price);
        formData.append("category", selectedOption);
        formData.append("description", textArea);
        formData.append("maxQuantityAllowedInCart", maxQuantityAllowedInCart);
      } else {
        formData.append("orderId", order._id);
        formData.append("itemId", itemValue._id);
        formData.append("title", itemValue.product.title);
        formData.append("quantity", itemValue.quantity);
        // formData.append("discount", discount);
        formData.append("price", price);
        formData.append("category", selectedOption);
        formData.append("description", textArea);
        formData.append("maxQuantityAllowedInCart", maxQuantityAllowedInCart);
      }

      // formData.append("images", ...images);
      // console.log(formData);

      fetch(`${baseURL}/products`, {
        method: "POST",
        headers: {
          // "Content-type": "multipart/form-data",
          // "Content-type": "application/json",
          Authorization: `Bearer ${userToken.accessToken}`,
        },
        body: formData,
      })
        .then((res) => {
          console.log(res);
          if (res.status === 204) {
            // setShowModal(true);
          } else {
            return res.json();
          }
        })
        .then((data) => {
          if (data) {
            console.log(data);
            showMessage({
              title: "Oops!",
              text: data.message,
              icon: "warning",
            });
          }
        });
    }
  };

  const getOrderId = (e) => {
    setOrderObject(order);
    const userToken = JSON.parse(localStorage.getItem("userToken"));
    if (isTokenExpired(userToken.accessToken)) {
      refreshTokenHandler().then((token) => {
        authContext.writeTokenInStorage(token);
        getOrderId();
      });
    } else {
      console.log(orderIdPut111);
      fetch(`${baseURL}/orders/${orderIdPut111}/delivered`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userToken.accessToken}`,
        },
      }).then((res) => {
        order.isDelivered = true;

        console.log(order.isDelivered, "adaaaa");
        console.log(res.status);
        if (res.status === 204) {
          // setShowModal(true);
        } else {
          return res.json();
        }
      });
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  useEffect(() => {
    if (orderFlag) {
      getOrderId();
    }
  }, [orderFlag]);

  // useEffect(() => {
  //   console.log(order.isDelivered)
  // }, []);

  return (
    <>
      {/* ************************************************************************************************ */}
      {showOrderItems && (
        <>
          <div className={st.modal_bg}>
            <form onSubmit={addProductFormSender} className={st.OrderForm}>
              <h2 className={st.form_title}>New product info</h2>
              <div className={st.formInputsRow}>
                <div className={st.labelWithInput}>
                  <label htmlFor="Title">Title</label>
                  <input
                    type="text"
                    placeholder="Enter products title"
                    // value={title}
                    value={itemValue.product.title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className={st.labelWithInput}>
                  <label htmlFor="Category">Category</label>
                  <select
                    // id="Category"
                    // name="cars"
                    onChange={handleselectedOption}
                    value={selectedOption}
                  >
                    {/* <option value="">select a category</option> */}
                    <option value="CHAIR">CHAIR</option>
                    <option value="SOFA">SOFA</option>
                    <option value="TV-STAND">TV-STAND</option>
                    <option value="ARMCHAIR">ARMCHAIR</option>
                    <option value="LAMP">LAMP</option>
                    <option value="CABINET">CABINET</option>
                  </select>
                </div>

                {/* <input
                  type="text"
                  placeholder="Enter producer category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                /> */}
                <div className={st.labelWithInput}>
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    type="number"
                    placeholder="How many products have arrived?"
                    // value={quantity}farzCer
                    value={itemValue.quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              </div>
              <div className={st.formInputsRow}>
                <div className={st.labelWithInput}>
                  <label htmlFor="maxCount">maxCount</label>
                  <input
                    type="number"
                    placeholder="How many products have maxQuantityAllowedInCart?"
                    value={maxQuantityAllowedInCart}
                    onChange={(e) =>
                      setMaxQuantityAllowedInCart(e.target.value)
                    }
                  />
                </div>
                <div className={st.labelWithInput}>
                  <label htmlFor="discount">Discount</label>
                  <input
                    type="text"
                    placeholder="Enter producer discount"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>

                <div className={st.labelWithInput}>
                  <label htmlFor="price">Price</label>
                  <input
                    type="text"
                    placeholder="product's price "
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className={st.formInputsRow}>
                <div className={st.labelWithInput}>
                  <label htmlFor="description">Description</label>
                  <textarea
                    name="message"
                    rows="4"
                    cols="50"
                    value={textArea}
                    onChange={(e) => setTextArea(e.target.value)}
                  ></textarea>
                </div>

                {/* <input
                  type="text"
                  placeholder="Enter producer description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                /> */}
                <input
                  type="file"
                  multiple
                  // value={images}
                  onChange={selectFiles}
                />
              </div>
              {/* <div className={st.formInputsRow}> */}
              <div className={st.btns}>
                <input className={st.submit_btn} value={"Done"} type="submit" />
                <button
                  onClick={() => setShowOrderItems(false)}
                  className={st.cancelBtn}
                >
                  {" "}
                  Cancel
                </button>
              </div>
              {/* </div> */}
            </form>
          </div>
        </>
      )}
      {showOrderDetail && (
        <div className={st.modal_bg}>
          <div className={st.content}>
            <div
              className={st.closeBtn}
              onClick={() => setShowOrderDetail(false)}
            >
              <IoCloseSharp />
            </div>
            <div className={st.createTime}>{order.createdAt.slice(0, 10)}</div>
            <div className={st.question}>
              Recieved?{" "}
              {order.isDelivered ? (
                <span style={{ color: "green" }}>Yes</span>
              ) : (
                <span style={{ color: "red" }}>No</span>
              )}
            </div>
            <table className={st.table}>
              <thead>
                <td>#</td>
                <td>Title</td>
                <td>Price</td>
                <td>Quantity</td>
                <td>Action</td>
              </thead>
              <tbody>
                {order.items.map((item, i) => (
                  <tr key={i}>
                    <td>{i++}</td>
                    <td>{item.product.title}</td>
                    <td>{item.product.price}</td>
                    <td>{item.quantity}</td>

                    <td
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        className={st.addProducrBtn}
                        onClick={() => {
                          // console.log(item,'joduuuuun');
                          // console.log(e.target);
                          setItemValue(item);

                          setShowOrderItems(true);
                          setShowOrderDetail(false);
                        }}
                        disabled={!order.isDelivered}
                        style={
                          order.isDelivered
                            ? { opacity: 1 }
                            : { opacity: 0.4, cursor: "" }
                        }
                      >
                        add product
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <tr>
        <td>{i + 1}</td>
        <td>{order.createdAt.slice(0, 10)}</td>
        <td>{order.deliveryDate.slice(0, 10)}</td>
        <td>{order.items.length}</td>
        {/* <td>{order.isDelivered ? "true" : "false"}</td> */}
        {/* <td>{order.items[0].product.price}</td>
        <td>{order.items[0].quantity}</td> */}
        {/* <td>{order.user}</td> */}
        {/* <td>{order.updatedAt.slice(0, 10)}</td> */}
        <td>
          <input
            type="checkbox"
            checked={order.isDelivered}
            style={
              order.isDelivered ? { opacity: 0.4 } : { opacity: 1, cursor: "" }
            }
            className={st.receivedCheckBox}
            onChange={() => {
              setIsSelected((pre) => !pre);
              setorderIdPut111(order._id);

              // getOrderId();
              setOrderFlag(true);
            }}
          />
        </td>
        {/* <td
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            className={st.addProducrBtn}
            onClick={() => setShowOrderItems(true)}
            disabled={!isSelected}
            style={isSelected ? { opacity: 1 } : { opacity: 0.4, cursor: "" }}
          >
            add product
          </button>
        </td> */}
        <td>
          <FaEye
            style={{ cursor: "pointer", fontSize: 20 }}
            onClick={() => setShowOrderDetail(true)}
          />
        </td>
      </tr>
    </>
  );
}

export default OrderReceived;
