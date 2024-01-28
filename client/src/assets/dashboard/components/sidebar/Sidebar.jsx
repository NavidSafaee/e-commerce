import { IoIosHome } from "react-icons/io"
import { FaUsers } from "react-icons/fa6"
import { MdReviews } from "react-icons/md"
import { FaBoxesStacked } from "react-icons/fa6"
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import { GiNotebook } from "react-icons/gi"
import { FaClipboardList } from "react-icons/fa"

import { Link } from "react-router-dom";
import "./Sidebar.css";
import { useState } from "react";
import { useEffect } from "react";

export default function Sidebar() {

  const [listIndex, setListIndex] = useState(0)

  useEffect(() => {
    if (document.URL.includes("/users")) {
      setListIndex(1)
    } else if (document.URL.includes("/reviews")) {
      setListIndex(2)
    } else if (document.URL.includes("/products")) {
      setListIndex(3)
    } else if (document.URL.includes("/tickets")) {
      setListIndex(4)
    } else if (document.URL.includes("/customers/orders")) {
      setListIndex(5)
    } else if (document.URL.includes("/orders")) {
      setListIndex(6)
    } else {
      setListIndex(0)
    }
  })

  return (
    <div className="sidebarWrapper">
      <div className="sidebarBrandContainer">
        <div className="logoContainer">
          <img src="/general_images/logo.png" className="logoSidebar" alt="" />
        </div>
        <h1 className="sidebarMainTitle">SOFT LAND</h1>
      </div>

      <div className="sidebarItemsList">
        <Link to="/admin-panel/" className="sidebarLink">
          <li className={`sidebarListItem ${listIndex === 0 && "active"}`}>
            <IoIosHome className="sidebarIcon" />
            <span>Home</span>
          </li>
        </Link>

        <Link to="/admin-panel/users" className="sidebarLink">
          <li className={`sidebarListItem ${listIndex === 1 && "active"}`}>
            <FaUsers className="sidebarIcon" />
            <span>Users</span>
          </li>
        </Link>
        <Link to="/admin-panel/reviews" className="sidebarLink">
          <li className={`sidebarListItem ${listIndex === 2 && "active"}`}>
            <MdReviews className="sidebarIcon" />
            <span>Reviews & Ratings</span>
          </li>
        </Link>
        <Link to="/admin-panel/products" className="sidebarLink">
          <li className={`sidebarListItem ${listIndex === 3 && "active"}`}>
            <FaBoxesStacked className="sidebarIcon" />
            <span>Products</span>
          </li>
        </Link>

        <Link to="/admin-panel/tickets" className="sidebarLink">
          <li className={`sidebarListItem ${listIndex === 4 && "active"}`}>
            <DynamicFeedIcon className="sidebarIcon" />
            <span>Tickets</span>
          </li>
        </Link>

        <Link to="/admin-panel/customers/orders" className="sidebarLink">
          <li className={`sidebarListItem ${listIndex === 5 && "active"}`}>
            <FaClipboardList className="sidebarIcon" />
            <span>Customers Orders</span>
          </li>
        </Link>

        <Link to="/admin-panel/orders" className="sidebarLink">
          <li className={`sidebarListItem ${listIndex === 6 && "active"}`}>
            <GiNotebook className="sidebarIcon" />
            <span>Admin Orders</span>
          </li>
        </Link>
      </div>
    </div>
  )
}
