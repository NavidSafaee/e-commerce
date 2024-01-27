import { useContext, useEffect, useState } from "react";
import st from "./Orders.module.css";
import PreLoader from "../../../components/PreLoader/PreLoader";
import { isTokenExpired, refreshTokenHandler } from "../../../functions";
import AuthContext from "../../../components/Context/AuthContext";
import baseURL from "../../../baseURL";
import { showMessage } from "../../../functions";
// import { off } from "../../../../../../server/src/models/cartModel";

export default function Orders() {
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [maxQuantityAllowedInCart, setMaxQuantityAllowedInCart] = useState("");
  const [images, setImages] = useState([]);
  const [checkBox, setcheckBox] = useState(true);
  const authContext = useContext(AuthContext);
  const [isContentReady, setIsContentReady] = useState(false);
  const [ordersData, setOrdersData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddProduct, setshowAddProduct] = useState(false);

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
          return res.json();
        })
        .then((data) => {
          setOrdersData(data);
          setIsContentReady(true);
        });
    }
  };
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
      console.log([...images]);
      console.log(formData);
      // if (images) {
      // for (let i = 0; i < images.length; i++) {
      //   console.log(typeof(images[i]),'typelrde haaaa');
      //   formData.append('images', images[i]);
      // }
      // }

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
            setShowModal(true);
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
            }).then((val) => {});
          }
        });
    }
  };

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
            }).then((val) => {});
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

  const selectFiles = (e) => {
    setImages([]);
    let arry = [];
    const arrFromObj = Object.keys(e.target.files);
    for (let x in e.target.files) {
      if (x < arrFromObj.length) {
        arry.push(e.target.files[x]);
      }
    }
    setImages([...images, ...arry]);
  };

  const receivedTick = (e) => {
    const tags = Array.from(e.target.parentNode.parentNode.children);
    if (e.target.checked == true) {
      e.target.parentNode.parentNode.children[6].children[0].style.opacity =
        "1";
      setcheckBox(false);
    }
  };

  return (
    <>
      {!isContentReady && <PreLoader />}
      {isContentReady && (
        <div className={st.pageContentWrapper}>
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
                      onClick={() => setshowAddProduct(false)}
                      className={st.cancelBtn}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}

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
                <tr key="2">
                  <td>
                    <input type="checkbox" onChange={receivedTick} />
                  </td>
                  <td>{i + 1}</td>
                  <td>{user.createdAt}</td>
                  <td>{user.user}</td>
                  {/* <td>{toString(user.isDelivered)}</td> */}
                  <td>{user.updatedAt}</td>
                  <td>{user.isDelivered ? "true" : "false"}</td>
                  <td>
                    <button
                      className={st.addProducrBtn}
                      onClick={() => setshowAddProduct(true)}
                      disabled={checkBox}
                      style={{ opacity: 0.7 }}
                    >
                      add product
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
