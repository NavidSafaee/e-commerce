import React from "react";
import "./Topbar.css";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">


        <div className="topLeft">
          {/* Admin Dashboard */}
          {/* <img src="./images/logoSOFT.png" id="logoSidebar" alt="" /> */}

        </div>

        <div className="topRight">
        {/* <div className="topbarIconContainer">
            <SearchIcon  className="SearchIconAdmin"/>
            <input type="text" className="searchInputAdminPanel"  placeholder="Search"/>
          </div> */}
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
          {/* <img src="..\public\general_images\story\elon.png" className="topAvatar" /> */}
          <p className="adminName">Elon</p>
        </div>


      </div>
    </div>

  )
}
