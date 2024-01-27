import { useContext } from "react"
import AuthContext from "../../../components/Context/AuthContext"
import "./Topbar.css"
import { showMessage } from "../../../functions"

export default function Topbar() {

  const auth = useContext(AuthContext)

  const logout = () => {
    showMessage({
      title: "Logout",
      text: "Are you Sure?",
      icon: "warning",
      buttons: ["No", "Yes"]
    }).then(select => {
      if (select) {
        auth.logout({ accessToken: auth.accessToken, refreshToken: auth.refreshToken })
      }
    })
  }

  return (
    <div className="panel-topbar">
      <h2 className="admin-name">Welcome <span>{auth.userInfo.username}</span></h2>
      <button className="admin-logout-btn" onClick={logout}>Logout</button>
    </div>

  )
}
