/* eslint-disable react/prop-types */

import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import "./Panel_main_page.css";

export default function Panel_main_page(props) {
    

    return (
        <>
            <div className="topBarPosition">
                <Topbar />
            </div>
            <div className="sidBarPosition">
                <Sidebar />
            </div>
            <div className="adminPanelContentContainer">
                {props.children}
            </div>
        </>
    )
}