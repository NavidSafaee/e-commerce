import { useContext, useEffect, useState } from "react";
import st from "./Orders.module.css";
import PreLoader from "../../../components/PreLoader/PreLoader";
import { isTokenExpired, refreshTokenHandler } from "../../../functions";
import AuthContext from "../../../components/Context/AuthContext";
import baseURL from "../../../baseURL";

export default function Orders() {

  const authContext = useContext(AuthContext)

  const [isContentReady, setIsContentReady] = useState(false)
  const [ordersData, setOrdersData] = useState([])
  const [showModal, setShowModal] = useState(false)

  const getAllOrders = () => {
    const userToken = JSON.parse(localStorage.getItem("userToken"))
    if (isTokenExpired(userToken.accessToken)) {
      refreshTokenHandler()
        .then(token => {
          authContext.writeTokenInStorage(token)
          getAllOrders()
        })
    } else {
      fetch(`${baseURL}/orders/customer`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken.accessToken}`
        }
      }).then(res => res.json())
        .then(data => { console.log(data); setOrdersData(data); setIsContentReady(true) })
    }
  }

  useEffect(() => {
    getAllOrders()
  }, [])

  return (
    <>
      {!isContentReady && <PreLoader />}
      {
        isContentReady &&
        <div className={st.pageContentWrapper}>

          {showModal && <>
            <div className={st.modal_bg}>
              <form onSubmit={() => console.log(2)} className={st.OrderForm}>
                <h2 className={st.form_title}>New product info</h2>
                <div className={st.formInputsRow}>
                  <input
                    type="text"
                    placeholder="Enter products title"
                  />
                  <input
                    type="text"
                    placeholder="Enter producer name"
                  />
                </div>
                <div className={st.formInputsRow}>
                  <input
                    type="number"
                    placeholder="How many products have arrived?"
                  />
                  <input
                    type="text"
                    placeholder="product's price "
                  />
                </div>
                <div className={st.formInputsRow}>
                  <input type="date" />
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
          </>}

          <button
            className={st.newOrderBtn}
            onClick={() => setShowModal(true)}
          >
            Create new Order
          </button>

          <table className={st.userListTable}>
            <thead className={st.table_header}>
              <th>id</th>
              <th>username</th>
              <th>email</th>
              <th>birthday</th>
              <th>phone number</th>
              <th>address</th>
            </thead>
            <tbody className={st.table_body}>
              {ordersData?.map((user, i) => (
                <tr key={user._id}>
                  <td>{i + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email ? user.email : "---"}</td>
                  <td>{user.birthDate ? user.birthDate.slice(0, 10) : "---"}</td>
                  <td>{user.phoneNumber ? user.phoneNumber : "---"}</td>
                  <td>{user.address ? user.address.slice(0, 40) : "---"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </>
  )
}
