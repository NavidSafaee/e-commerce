import { useContext, useEffect, useState } from 'react'
import baseURL from '../../../baseURL'

import st from './UserList.module.scss'
import { isTokenExpired, refreshTokenHandler } from '../../../functions';
import AuthContext from '../../../components/Context/AuthContext';
import PreLoader from '../../../components/PreLoader/PreLoader';

export default function UserLIst() {

  const authContext = useContext(AuthContext)

  const [isContentReady, setIsContentReady] = useState(false)
  const [userDatas, setUserDatas] = useState([])

  const getAllUsers = () => {
    const userToken = JSON.parse(localStorage.getItem("userToken"))
    if (isTokenExpired(userToken.accessToken)) {
      refreshTokenHandler()
        .then(token => {
          authContext.writeTokenInStorage(token)
          getAllUsers()
        })
    } else {
      fetch(`${baseURL}/users?role=CUSTOMER`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken.accessToken}`
        }
      }).then(res => res.json())
        .then(data => { console.log(data); setUserDatas(data); setIsContentReady(true) })
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <>
      {!isContentReady && <PreLoader />}
      {isContentReady &&
        <table className={st.userListTable}>
          <thead className={st.table_header}>
            <th>id</th>
            <th>username</th>
            <th>email</th>
            <th>birthday</th>
            <th>phone number</th>
            <th>address</th>
          </thead>
          <tbody className={st.table_body}>
            {userDatas?.map((user, i) => (
              <tr key={user._id}>
                <td>{i+1}</td>
                <td>{user.username}</td>
                <td>{user.email ? user.email : "---"}</td>
                <td>{user.birthDate ? user.birthDate.slice(0, 10) : "---"}</td>
                <td>{user.phoneNumber ? user.phoneNumber : "---"}</td>
                <td>{user.address ? user.address.slice(0, 40) : "---"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </>
  )
}
