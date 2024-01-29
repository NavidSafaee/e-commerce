import { Link } from "react-router-dom";
import s from "./UserTickets.module.scss"
import { useEffect, useState } from "react";
import baseURL from "../../../baseURL";
import { isTokenExpired, refreshTokenHandler, showMessage } from "../../../functions";
import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import { RiKakaoTalkFill } from "react-icons/ri"
import { IoIosEye } from "react-icons/io"
import { IoSend } from "react-icons/io5"
import PreLoader from "../../PreLoader/PreLoader";

function UserTickets() {

  const authContext = useContext(AuthContext)

  const [ticketList, setTicketList] = useState([])
  const [showChatBox, setShowChatBox] = useState(false)
  const [currentChat, setCurrentChat] = useState({})
  const [newMessage, setNewMessage] = useState("")
  const [isContentReady, setIsContentReady] = useState(false)

  const getMyTickets = () => {
    const userToken = JSON.parse(localStorage.getItem("userToken"))
    if (isTokenExpired(userToken.accessToken)) {
      refreshTokenHandler()
        .then(token => {
          authContext.writeTokenInStorage(token)
          getMyTickets()
        })
    } else {
      fetch(`${baseURL}/tickets/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken.accessToken}`
        }
      }).then(res => res.json()).then(data => { setTicketList(data); setIsContentReady(true) })
    }
  }

  const sendNewMessage = (chat_id) => {
    const userToken = JSON.parse(localStorage.getItem("userToken"))
    if (isTokenExpired(userToken.accessToken)) {
      refreshTokenHandler()
        .then(token => {
          authContext.writeTokenInStorage(token)
          sendNewMessage()
        })
    } else {
      let req_body = {
        ticketText: newMessage,
        ticketId: chat_id
      }
      fetch(`${baseURL}/tickets/me`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${userToken.accessToken}`,
          "Content-type": "application/json"
        },
        body: JSON.stringify(req_body)
      }).then(res => {
        console.log(res);
        if (res.ok) {
          setNewMessage("")
          getMyTickets()
        } else {
          showMessage({
            title: 'Oops!',
            text: "There was an error sending the message",
            icon: 'error'
            // eslint-disable-next-line no-unused-vars
        })
        }
        return res.json()
      }).then(data => {console.log(data); setCurrentChat({...currentChat, chat: data})})
    }
  }

  useEffect(() => {
    getMyTickets()
  }, [])

  return (
    <>
      <section className={s.ticketsSection}>
        <Link className={s.create_btn} to="/user/new-ticket">Create new ticket</Link>
        
        {!isContentReady && <PreLoader />}
        
        {isContentReady && <table className={s.ticketsList}>
          <thead>
            <tr>
              <td>#</td>
              <td>topic</td>
              <td>date</td>
              <td>status</td>
              <td>action</td>
            </tr>
          </thead>
          <tbody>
            {
              ticketList?.reverse().map((ticket, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{ticket.topic}</td>
                  <td>{ticket.chat[0].date.slice(0, 10)}</td>
                  <td className={`${ticket.status === "OPEN" ? s.open : s.resolved}`}>{ticket.status === "OPEN" ? "Open" : "Closed"}</td>
                  <td onClick={() => { setShowChatBox(true); setCurrentChat(ticket) }}>{ticket.status === "OPEN" ? <RiKakaoTalkFill /> : <IoIosEye style={{ color: "gray" }} />}</td>
                </tr>
              ))
            }
          </tbody>
        </table>}

        {
          showChatBox && (
            <div className={s.modal_bg}>
              <div className={s.close_btn} onClick={() => setShowChatBox(false)}>Close</div>
              <div className={s.chat_contaner}>
                <h3 className={s.chat_title}>{currentChat.topic}</h3>
                <div className={s.messages_filed}>
                  {
                    currentChat.chat.map((item, i) => (
                      <div className={`${s.chat_row} ${item.role === "CUSTOMER" ? s.myMessage : s.admin}`} key={i}>
                        <div className={s.content}>
                          {item.chatText}
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className={s.type_box}>
                  <input type="text" className={s.input} placeholder="Message" value={newMessage} onChange={e => setNewMessage(e.target.value)} />
                  <button
                    className={s.send_btn}
                    onClick={() => {
                      if (newMessage.trim().length > 0) {
                        sendNewMessage(currentChat._id)
                      }
                    }}><IoSend /></button>
                </div>
              </div>
            </div>
          )
        }
      </section>
    </>
  )
}

export default UserTickets;
