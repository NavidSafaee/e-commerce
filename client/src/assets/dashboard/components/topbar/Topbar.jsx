import { useContext } from "react";
import AuthContext from "../../../components/Context/AuthContext";
import "./Topbar.css";
import { showMessage } from "../../../functions";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import LogoutIcon from "@mui/icons-material/Logout";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

export default function Topbar() {
  const auth = useContext(AuthContext);

  const logout = () => {
    showMessage({
      title: "Logout",
      text: "Are you Sure?",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then((select) => {
      if (select) {
        auth.logout({
          accessToken: auth.accessToken,
          refreshToken: auth.refreshToken,
        });
      }
    });
  };

  return (
    <div className="panel-topbar">
      <div className="topbar-ul-left-wrapper">
        <ui className="topbar-left-ui">
          <li className="topbar-right-li">
            <FormatListBulletedIcon className="topbarIconsMenu"></FormatListBulletedIcon>
          </li>
          <li className="topbar-right-li">
            <h5 className="admin-name">
              Welcome <span>{auth.userInfo.username}</span>
            </h5>
          </li>
        </ui>
      </div>

      <div className="topbar-ul-right-wrapper">
        <ui className="topbar-right-ui">
          <li className="topbar-right-li">
            <SearchIcon className="topbarIcons"></SearchIcon>
          </li>
          <li className="topbar-right-li">
            <NotificationsIcon className="topbarIcons"></NotificationsIcon>
          </li>
          <li className="topbar-right-li">
            <MessageIcon className="topbarIcons"></MessageIcon>
          </li>
          <li className="topbar-right-li">
            <LogoutIcon
              className="topbarIcons  admin-logout-btn"
              onClick={logout}
            ></LogoutIcon>

            {/* <button className="admin-logout-btn" onClick={logout}>
              Logout
            </button> */}
          </li>
        </ui>
      </div>
    </div>
  );
}
