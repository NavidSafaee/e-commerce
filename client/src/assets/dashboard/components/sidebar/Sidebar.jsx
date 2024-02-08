import { IoIosHome } from "react-icons/io";
import { FaUsers } from "react-icons/fa6";
import { MdReviews } from "react-icons/md";
import { FaBoxesStacked } from "react-icons/fa6";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import { GiNotebook } from "react-icons/gi";
import { FaClipboardList } from "react-icons/fa";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { useState } from "react";
import { useEffect } from "react";

export default function Sidebar() {
  const [listIndex, setListIndex] = useState(0);
  const [sidebarWidth, setsidebarWidth] = useState("sidebarWrapper");
  const [displayNone, setdisplayNone] = useState("none");
  const [displayBlock, setdisplayBlock] = useState("block");
  const [displayNoneUsers, setdisplayNoneUsers] = useState("none");
  const [displayBlockUsers, setdisplayBlockUsers] = useState("block");
  const [sidebarCloseArrow, setsidebarCloseArrow] =
    useState("topBarIconsArrows");
  const [sidebarOpenArrow, setsidebarOpenArrow] = useState(
    "topBarIconsArrowsHidden"
  );

  useEffect(() => {
    if (document.URL.includes("/users")) {
      setListIndex(1);
    } else if (document.URL.includes("/reviews")) {
      setListIndex(2);
    } else if (document.URL.includes("/products")) {
      setListIndex(3);
    } else if (document.URL.includes("/tickets")) {
      setListIndex(4);
    } else if (document.URL.includes("/customers/orders")) {
      setListIndex(5);
    } else if (document.URL.includes("/orders")) {
      setListIndex(6);
    } else {
      setListIndex(0);
    }
  });

  return (
    <div className={sidebarWidth}>
      <div className="sidebarBrandContainer">
        <div className="logoContainer">
          <img src="/general_images/logo.png" className="logoSidebar" alt="" />
        </div>
        <h1 className="sidebarMainTitle">SOFT LAND</h1>
        <div
          className="topbarArrows"
          onClick={(e) => {
            if (sidebarCloseArrow == "topBarIconsArrows") {
              setsidebarCloseArrow("topBarIconsArrowsHidden");
              setsidebarOpenArrow("topBarIconsArrows");
              setsidebarWidth("sidebarWrapperHover sidebarWrapper");
            } else {
              setsidebarCloseArrow("topBarIconsArrows");
              setsidebarOpenArrow("topBarIconsArrowsHidden");
              setsidebarWidth("sidebarWrapper");
            }
          }}
        >
          <KeyboardDoubleArrowRightIcon
            className={sidebarOpenArrow}
          ></KeyboardDoubleArrowRightIcon>
          <KeyboardDoubleArrowLeftIcon
            className={sidebarCloseArrow}
          ></KeyboardDoubleArrowLeftIcon>
        </div>
      </div>

      <div className="sidebarItemsList">
        <Link to="/admin-panel/" className="sidebarLink">
          <li className={`sidebarListItem ${listIndex === 0 && "active"}`}>
            <IoIosHome className="sidebarIcon" />
            <span>Home</span>
          </li>
        </Link>


        <div className="sidebarLink">
          <li
            className={`sidebarListItem ${listIndex === 4 && "active"}`}
            onClick={(e) => {
              if (displayBlockUsers == "block") {
                setdisplayBlockUsers("none");
                setdisplayNoneUsers("block");
              } else {
                setdisplayBlockUsers("block");
                setdisplayNoneUsers("none");
              }
            }}
          >
            <ListAltIcon className="sidebarIcon" />
            <span>Users</span>
            <KeyboardArrowDownIcon
              style={{ display: displayNoneUsers }}
            ></KeyboardArrowDownIcon>
            <KeyboardArrowUpIcon
              style={{ display: displayBlockUsers }}
            ></KeyboardArrowUpIcon>
          </li>
        </div>

        <Link to="/admin-panel/users" className="sidebarLink"
          style={{ display: displayBlockUsers, paddingLeft: "15px" }}
        >
          <li className={`sidebarListItem ${listIndex === 1 && "active"}`}>
            <FaUsers className="sidebarIcon" />
            <span>customers</span>
          </li>
        </Link>
        <Link to="/admin-panel/users" className="sidebarLink"
          style={{ display: displayBlockUsers, paddingLeft: "15px" }}
        >
          <li className={`sidebarListItem ${listIndex === 1 && "active"}`}>
            <FaUsers className="sidebarIcon" />
            <span>admins</span>
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
        <div className="sidebarLink">
          <li
            className={`sidebarListItem ${listIndex === 4 && "active"}`}
            onClick={(e) => {
              if (displayBlock == "block") {
                setdisplayBlock("none");
                setdisplayNone("block");
              } else {
                setdisplayBlock("block");
                setdisplayNone("none");
              }
            }}
          >
            <ListAltIcon className="sidebarIcon" />
            <span>Orders</span>
            <KeyboardArrowDownIcon
              style={{ display: displayNone }}
            ></KeyboardArrowDownIcon>
            <KeyboardArrowUpIcon
              style={{ display: displayBlock }}
            ></KeyboardArrowUpIcon>
          </li>
        </div>

        {/* KeyboardArrowDownIcon */}

        {/* <div className="selectSidebarOrders">
          <span className="icon1orders">
            <span className="selectSidebarIcone"><DynamicFeedIcon className="sidebarIcon" /></span>
            <span className="selectSidebarIcone">Orders</span>
          </span>
        </div> */}

        <Link
          to="/admin-panel/customers/orders"
          className="sidebarLink"
          style={{ display: displayBlock, paddingLeft: "15px" }}
        >
          <li className={`sidebarListItem ${listIndex === 5 && "active"}`}>
            <FaClipboardList className="sidebarIcon" />
            <span>Customers Orders</span>
          </li>
        </Link>

        <Link
          to="/admin-panel/orders"
          className="sidebarLink"
          style={{ display: displayBlock, paddingLeft: "15px" }}
        >
          <li className={`sidebarListItem ${listIndex === 6 && "active"}`}>
            <GiNotebook className="sidebarIcon" />
            <span>Admin Orders</span>
          </li>
        </Link>
      </div>
    </div>
  );
}
