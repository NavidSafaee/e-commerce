/* eslint-disable react/prop-types */
import baseURL from "../../../baseURL";
import AuthContext from "../../../components/Context/AuthContext";
import { isTokenExpired, refreshTokenHandler, showMessage } from "../../../functions";
import st from "./../../panelPages/Orders/orders.module.css";
import { useContext, useState } from "react";


function OrderReceived({ user, i }) {

  const authContext = useContext(AuthContext)

  const [title, setTitle] = useState("")
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [isSelected, setIsSelected] = useState(false)
  const [maxQuantityAllowedInCart, setMaxQuantityAllowedInCart] = useState("")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")

  console.log(user, i)

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
      formData.append("images", [...images]);

      for (const [key, value] of formData.entries()) {
        console.log(`${key}:${value}`);
      }
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
  };

  console.log(user, i, "receivedOrder");

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
      <tr>
        <td>
          <input type="checkbox" onChange={() => setIsSelected(pre => !pre)} />
        </td>
        <td>{i + 1}</td>
        <td>{user.createdAt}</td>
        <td>{user.user}</td>
        <td>{user.updatedAt}</td>
        <td>{user.isDelivered ? "true" : "false"}</td>
        <td>
          <button
            className={st.addProducrBtn}
            onClick={() => setShowAddProduct(true)}
            disabled={!isSelected}
            style={isSelected ? {opacity: 1} : { opacity: 0.7 }}
          >
            add product
          </button>
        </td>
      </tr>
    </>

  );
}

export default OrderReceived;