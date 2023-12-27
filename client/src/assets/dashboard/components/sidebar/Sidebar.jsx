import LineStyleIcon from "@mui/icons-material/LineStyle";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import StorefrontIcon from "@mui/icons-material/Storefront";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

import { Link } from "react-router-dom";

import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle"></h3>
          <ul className="sidebarList">
            <Link to="/admin-panel" className="link">
              <li className="sidebarListItem active">
                <LineStyleIcon className="sidebarIcon" />
                Home
              </li>
            </Link>
            {/* <li className="sidebarListItem">
              <TimelineIcon className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUpIcon className="sidebarIcon" />
              Sales
            </li> */}
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Users</h3>
          <ul className="sidebarList">
            <Link to="/admin-panel/users" className="link">
              <li className="sidebarListItem">
                <PermIdentityIcon className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/admin-panel/Comments" className="link">
              <li className="sidebarListItem">
                <PermIdentityIcon className="sidebarIcon" />
                Reviews & Ratings
              </li>
            </Link>
            <Link to="/admin-panel/products" className="link">
              <li className="sidebarListItem">
                <StorefrontIcon className="sidebarIcon" />
                Products
              </li>
            </Link>
            {/* <li className="sidebarListItem">
              <AttachMoneyIcon className="sidebarIcon" />
              Transactions
            </li>
            <li className="sidebarListItem">
              <BarChartIcon className="sidebarIcon" />
              Reports
            </li> */}
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Tickets & Comments</h3>
          <ul className="sidebarList">
            {/* <li className="sidebarListItem">
              <MailOutlineIcon className="sidebarIcon" />
              Mail
            </li> */}
            <li className="sidebarListItem">
              <DynamicFeedIcon className="sidebarIcon" />
              Tickets
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutlineIcon className="sidebarIcon" />
              Customer Orders
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Orders</h3>
          <ul className="sidebarList">
            <Link to="/admin-panel/Orders" className="link">
              <li className="sidebarListItem">
                <WorkOutlineIcon className="sidebarIcon" />
                Admin Orders
              </li>
            </Link>
            {/* <li className="sidebarListItem">
              <TimelineIcon className="sidebarIcon" />
              Customer Orders
            </li> */}
            {/* <li className="sidebarListItem">
              <ReportIcon className="sidebarIcon" />
              Reports
            </li> */}
          </ul>
        </div>

        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Products</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutlineIcon className="sidebarIcon" />
              Edit Products
            </li>
            <li className="sidebarListItem">
              <TimelineIcon className="sidebarIcon" />
              Edit Stock
            </li>
            <li className="sidebarListItem">
              <ReportIcon className="sidebarIcon" />
              Unavailable
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}
