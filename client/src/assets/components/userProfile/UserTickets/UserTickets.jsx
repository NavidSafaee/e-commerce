import style from "./UserTickets.module.scss";
import { useContext, useEffect, useState } from "react";


function UserTickets() {
  const [orderCount, setorderCount] = useState("1");
  const [showModal, setShowModal] = useState(false);

  const NumberSender = (e) => {

  }
  return (
    <>
      <div className={style.modal_bg}>
        <form onSubmit={NumberSender} className={style.OrderForm}>
          <h2 className={style.form_title}>New product info</h2>
          <div className={style.formInputsRow}>
            <input
              type="number"
              placeholder="Enter number of product"
              onChange={(e) => {
                // setorderCount(e.target.value);
              }}
            />
          </div>
          <div className={style.formInputsRow}>
            <input className={style.submit_btn} value={"Done"} type="submit" />
            <button
              onClick={() => {
                // setShowModal(false);
              }}
              // onClick={() => set()}
              className={style.cancelBtn}
            >
              Cancel
            </button>
          </div>
        </form>
        {/* <AdminOrder /> */}
      </div>
    </>
  );
}

export default UserTickets;
