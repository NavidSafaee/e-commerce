import { useContext } from "react"
import AuthContext from "../../../components/Context/AuthContext"
import "./Topbar.css"

export default function Topbar() {

  const auth = useContext(AuthContext)

  return (
    <div className="panel-topbar">
      <h2 className="admin-name">Welcome <span>{auth.userInfo.username}</span></h2>
    </div>

  )
}
