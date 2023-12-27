import React from "react";
import "./Topbar.css";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">


        <div className="topLeft">
          {/* Admin Dashboard */}
          {/* <img src="./images/logoSOFT.png" id="logoSidebar" alt="" /> */}

        </div>

        <div className="topRight">
        <div className="topbarIconContainer">
            <SearchIcon />
          </div>
          <div className="topbarIconContainer">
            <NotificationsIcon />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <LanguageIcon />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <SettingsIcon />
          </div>
          <img src="./images/logoSOFT.png" className="topAvatar" />
        </div>


      </div>
    </div>

  )
}
