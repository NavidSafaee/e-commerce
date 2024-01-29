import { useContext, useEffect, useState } from 'react'
import s from './UserComments.module.scss'
import { isTokenExpired, refreshTokenHandler } from '../../../functions'
import AuthContext from '../../Context/AuthContext'
import baseURL from '../../../baseURL'
import PreLoader from '../../PreLoader/PreLoader'
import { AiTwotoneStar } from "react-icons/ai"
import { PiChatTextFill } from "react-icons/pi"
import { FaCalendarDays } from "react-icons/fa6"
import { Link } from "react-router-dom"

function UserComments() {

  const authContext = useContext(AuthContext)

  const [isContentReady, setIsContentReady] = useState(false)
  const [myComments, setMyComments] = useState([])

  const getAllComments = () => {
    const userToken = JSON.parse(localStorage.getItem("userToken"))
    if (isTokenExpired(userToken.accessToken)) {
      refreshTokenHandler()
        .then(token => {
          authContext.writeTokenInStorage(token)
          getAllComments()
        })
    } else {
      fetch(`${baseURL}/reviews/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken.accessToken}`
        }
      }).then(res => res.json())
        .then(data => { setMyComments(data); setIsContentReady(true) })
    }
  }

  useEffect(() => {
    getAllComments()
  }, [])

  return (
    <>
      {!isContentReady && <PreLoader type={"comment"} />}
      {
        isContentReady && (
          <section className={s.commentSection}>
            {myComments?.length === 0 ? (
              <div className={s.emptyBox}>No comment yet!</div>
            )
              :
              (
                <>
                  <div className={s.commentsContainer}>
                    {myComments?.reverse().map((comment, i) => (
                      <div className={s.commentItem} key={i}>
                        <div className={s.imgContainer}>
                          <Link to={`/products/${comment.product._id}`}>
                            <img src="https://assets.wfcdn.com/im/52655192/resize-h755-w755%5Ecompr-r85/2360/236087900/Jacquilla+72.83%27%27+Velvet+Sofa.jpg" alt="img" />
                          </Link>
                          <div className={s.starBox}><AiTwotoneStar /> {comment.rating}</div>
                        </div>
                        <div className={s.mainPart}>
                          <div className={s.titleContainer}>
                            {comment.product.title}
                          </div>
                          <div className={s.textBox}>
                            <PiChatTextFill />
                            <q>{comment.review}</q>
                          </div>
                          <div className={s.timeRow}>
                            <FaCalendarDays />
                            {comment.createdAt === comment.updatedAt ? comment.createdAt.slice(0, 10) : comment.updatedAt.slice(0, 10)}
                            <FaCalendarDays />
                          </div>
                        </div>
                        <div className={s.status}>
                          {comment.validationStatus === "PENDING" ?
                            (<span className={s.pending}>pending</span>)
                            :
                            (<span className={s.accepted}>accepted</span>)
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )
            }
          </section>
        )
      }
    </>
  )
}

export default UserComments