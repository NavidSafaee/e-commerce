/* eslint-disable react/prop-types */
import { FaEye } from "react-icons/fa"
import { IoCloseSharp } from "react-icons/io5"
import baseURL from "../../../baseURL";
import AuthContext from "../../../components/Context/AuthContext";
import { isTokenExpired, refreshTokenHandler, showMessage } from "../../../functions";
import st from "./../../panelPages/Orders/orders.module.css";
import { useContext, useEffect, useState } from "react";


function OrderReceived({ order, i }) {

  const authContext = useContext(AuthContext)

  const [title, setTitle] = useState("")
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [isSelected, setIsSelected] = useState(false)
  const [maxQuantityAllowedInCart, setMaxQuantityAllowedInCart] = useState("")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [showOrderDetail, setShowOrderDetail] = useState(false)

  const selectFiles = (e) => {
    // setImages([]);
    let arry = [];
    const arrFromObj = Object.keys(e.target.files);
    for (let x in e.target.files) {
      if (x < arrFromObj.length) {
        arry.push(e.target.files[x]);
      }
    }
    // setImages([...images, ...arry]);
  }

  const addProductFormSender = (event) => {
    event.preventDefault();
    const userToken = JSON.parse(localStorage.getItem("userToken"));
    if (isTokenExpired(userToken.accessToken)) {
      refreshTokenHandler().then((token) => {
        authContext.writeTokenInStorage(token);
        addProductFormSender();
      });
    } else {
      const formData = new FormData();
      formData.append("orderId", "65b398a0bb0189b2dbf726bf");
      formData.append("itemId", "65b398a0bb0189b2dbf726c0");
      formData.append("title", title);
      formData.append("quantity", quantity);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("maxQuantityAllowedInCart", maxQuantityAllowedInCart);
      // formData.append("images", [...images]);

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
            })
          }
        });
    }
  }

  useEffect(() => {
    console.log(order.isDelivered)
  }, [])

  return (
    <>
      {showAddProduct && (
        <>
          <div className={st.modal_bg}>
            <form onSubmit={addProductFormSender} className={st.OrderForm}>
              <h2 className={st.form_title}>New product info</h2>
              <div className={st.formInputsRow}>
                <input
                  type="file"
                  multiple
                  // value={images}
                  onChange={selectFiles}
                />
                <input
                  type="text"
                  placeholder="Enter products title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter producer category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter producer description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className={st.formInputsRow}>
                <input
                  type="number"
                  placeholder="How many products have arrived?"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="How many products have maxQuantityAllowedInCart?"
                  value={maxQuantityAllowedInCart}
                  onChange={(e) =>
                    setMaxQuantityAllowedInCart(e.target.value)
                  }
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
                  className={st.submit_btn}
                  value={"Done"}
                  type="submit"
                />
                <button
                  onClick={() => setShowAddProduct(false)}
                  className={st.cancelBtn}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </>
      )}
      {
        showOrderDetail && (
          <div className={st.modal_bg}>
            <div className={st.content}>
              <div className={st.closeBtn} onClick={() => setShowOrderDetail(false)}><IoCloseSharp /></div>
              <div className={st.createTime}>{order.createdAt.slice(0, 10)}</div>
              <div className={st.question}>Recieved? {order.isDelivered ? <span style={{ color: "green" }}>Yes</span> : <span style={{ color: "red" }}>No</span>}</div>
              <table className={st.table}>
                <thead>
                  <td>#</td>
                  <td>title</td>
                  <td>price</td>
                  <td>quantity</td>
                </thead>
                <tbody>
                  {
                    order.items.map((item, i) => (
                      <tr key={i}>
                        <td>{i++}</td>
                        <td>{item.product.title}</td>
                        <td>{item.product.price}</td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        )
      }
      <tr>
        <td>
          <input type="checkbox" onChange={() => setIsSelected(pre => !pre)} />
        </td>
        <td>{i + 1}</td>
        <td>{order.createdAt.slice(0, 10)}</td>
        <td>{order.user}</td>
        <td>{order.updatedAt.slice(0, 10)}</td>
        <td>{order.isDelivered ? "true" : "false"}</td>
        <td style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: "center" }}>
          <button
            className={st.addProducrBtn}
            onClick={() => setShowAddProduct(true)}
            disabled={!isSelected}
            style={isSelected ? { opacity: 1 } : { opacity: 0.4, cursor: "" }}
          >
            add product
          </button>
          <FaEye style={{ cursor: "pointer", fontSize: 20 }} onClick={() => setShowOrderDetail(true)} />
        </td>
      </tr>
    </>

  );
}

export default OrderReceived;