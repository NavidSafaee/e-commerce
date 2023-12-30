/* eslint-disable react/prop-types */

import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import "./Panel_main_page.css";

export default function Panel_main_page(props) {
    // let router = useRoutes(mainRoutes);

    return (
        <>
            <div className="topBarPosition">
                <Topbar />
            </div>
            <div className="sidBarPosition">
                <Sidebar />
            </div>
            {props.children}
        </>
    )
}