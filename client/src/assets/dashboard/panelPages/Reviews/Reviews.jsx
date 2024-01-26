/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react"
import s from "./Reviews.module.scss"
import { isTokenExpired, refreshTokenHandler, showMessage } from "../../../functions"
import baseURL from "../../../baseURL"
import AuthContext from "../../../components/Context/AuthContext"
import PreLoader from "../../../components/PreLoader/PreLoader"
import { AiTwotoneStar } from "react-icons/ai"
import { FaCalendarDays } from "react-icons/fa6"
import { PiChatTextFill } from "react-icons/pi"
import { Link } from "react-router-dom"

function Reviews() {

    const authContext = useContext(AuthContext)

    const [comments, setComments] = useState([])
    const [isContentReady, setIsContentReady] = useState(false)

    const getPendingComments = () => {
        const userToken = JSON.parse(localStorage.getItem("userToken"))
        if (isTokenExpired(userToken.accessToken)) {
            refreshTokenHandler()
                .then(token => {
                    authContext.writeTokenInStorage(token)
                    getPendingComments()
                })
        } else {
            fetch(`${baseURL}/reviews/pending`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${userToken.accessToken}`
                }
            }).then(res => { return res.json() })
                .then(data => { setComments(data); setIsContentReady(true) })
        }
    }

    const confirmReview = (id) => {
        const userToken = JSON.parse(localStorage.getItem("userToken"))
        if (isTokenExpired(userToken.accessToken)) {
            refreshTokenHandler()
                .then(token => {
                    authContext.writeTokenInStorage(token)
                    confirmReview()
                })
        } else {
            fetch(`${baseURL}/reviews/${id}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${userToken.accessToken}`,
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ validationStatus: "VALID" })
            }).then(res => {
                if (res.ok) {
                    showMessage({
                        title: "Great",
                        text: "The comment has been approved",
                        icon: "success"
                    }).then(btn => {
                        if (btn) {
                            location.reload()
                        }
                    })
                }
            })
        }
    }

    useEffect(() => {
        getPendingComments()
    }, [])

    return (
        <>
            {!isContentReady && <PreLoader type={"comment"} />}
            {isContentReady && (
                <>
                    <div className={s.pageContentContainer}>
                        <h2 className={s.title}>Pending Reviews ({comments?.length})</h2>
                        <div className={s.commentsContainer}>
                            {comments?.reverse().map((com, i) => (
                                <div className={s.commentItem} key={i}>
                                    <div className={s.imgContainer}>
                                        <Link to={`/products/${com.product}`}>
                                            <img src="https://assets.wfcdn.com/im/52655192/resize-h755-w755%5Ecompr-r85/2360/236087900/Jacquilla+72.83%27%27+Velvet+Sofa.jpg" alt="img" />
                                        </Link>
                                        <div className={s.starBox}><AiTwotoneStar /> {com.rating}</div>
                                    </div>
                                    <div className={s.mainPart}>
                                        <div className={s.titleContainer}>
                                            {com.user?.username}
                                        </div>
                                        <div className={s.textBox}>
                                            <PiChatTextFill />
                                            <q>{com.review}</q>
                                        </div>
                                        <div className={s.timeRow}>
                                            <FaCalendarDays />
                                            {com.createdAt === com.updatedAt ? com.createdAt.slice(0, 10) : com.updatedAt.slice(0, 10)}
                                            <FaCalendarDays />
                                        </div>
                                    </div>
                                    <div className={s.statusBtn} onClick={() => confirmReview(com._id)}>Confirm</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )
            }
        </>
    )
}

export default Reviews