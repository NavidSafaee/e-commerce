import "./Home.css";
import Chart from "./../../components/Chart/Chart";
import { xAxisData } from "../../datas";
import AnalogClock from "../../components/Clock/Clock";
import MyCalender from "../../components/Calender/Calender";
import { FaBoxesStacked } from "react-icons/fa6"
import { FaUsers } from "react-icons/fa6"
import { FaClipboardList } from "react-icons/fa"
import { FaComments } from "react-icons/fa"
import { LuMessagesSquare } from "react-icons/lu"
import { useContext, useEffect, useState } from "react";
import { isTokenExpired, refreshTokenHandler } from "../../../functions";
import baseURL from "../../../baseURL";
import AuthContext from "../../../components/Context/AuthContext";

export default function Home() {

  const authContext = useContext(AuthContext)

  const [users, setUsers] = useState(0)

  const getCusomersCount = (userToken) => {
    fetch(`${baseURL}/users/customers/count`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken.accessToken}`
      }
    }).then(res => res.json()).then(data => setUsers(data.count))
  }

  const getProductsCount = () => {
    fetch(`${baseURL}/products/count`, {
      method: "GET",
    }).then(res => res.json()).then(data => console.log(data))
  }

  const getOrders = (userToken) => {
    fetch(`${baseURL}/orders/customer/delivered/count`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken.accessToken}`
      }
    }).then(res => res.json())
  }

  const getPanelInfo = () => {
    const userToken = JSON.parse(localStorage.getItem("userToken"))
    if (isTokenExpired(userToken.accessToken)) {
      refreshTokenHandler()
        .then(token => {
          authContext.writeTokenInStorage(token)
          getPanelInfo()
        })
    } else {
      getCusomersCount(userToken)

      getProductsCount()

      getOrders(userToken)
    }
  }

  useEffect(() => {
    getPanelInfo()
  }, [])

  return (
    <div className="homePageContainer">
      <div className="HomeCards">
        <div className="HomeCard">
          <div className="icon-box" style={{ background: "#6C22A6" }}><FaBoxesStacked /></div>
          <h5 className="card-title">Products</h5>
          <div className="count" style={{ color: "#6C22A6" }}></div>
        </div>
        <div className="HomeCard">
          <div className="icon-box" style={{ background: "#F94A29" }}><FaUsers /></div>
          <h5 className="card-title">Users</h5>
          <div className="count" style={{ color: "#F94A29" }}>{users}</div>
        </div>
        <div className="HomeCard">
          <div className="icon-box" style={{ background: "#379237" }}><FaClipboardList /></div>
          <h5 className="card-title">Orders</h5>
          <div className="count" style={{ color: "#379237" }}></div>
        </div>
        <div className="HomeCard">
          <div className="icon-box" style={{ background: "#FF004D" }}><FaComments /></div>
          <h5 className="card-title">Comments</h5>
          <div className="count" style={{ color: "#FF004D" }}></div>
        </div>
        <div className="HomeCard">
          <div className="icon-box" style={{ background: "#FFA33C" }}><LuMessagesSquare /></div>
          <h5 className="card-title">Tickets</h5>
          <div className="count" style={{ color: "#FFA33C" }}></div>
        </div>
      </div>
      <div className="todaySection">
        <AnalogClock />
        <div className="calenderBox">
          <MyCalender />
        </div>
      </div>
      <Chart grid title="Month Sale" data={xAxisData} dataKey="Sale" className="chartHome" />
    </div>
  );
}
