import { useContext, useState } from "react"
import ConsultStyle from "./ConsultationPageComponent.module.scss"
import { refreshTokenHandler, isTokenExpired } from "./../../functions"
import AuthContext from '../Context/AuthContext'
import baseURL from "../../baseURL"

function ConsultationPageComponent() {

    const authContext = useContext(AuthContext)

    const [topic, setTopic] = useState("")
    const [text, setText] = useState("")

    const sendMessage = () => {
        const userToken = JSON.parse(localStorage.getItem("userToken"))
        if (isTokenExpired(userToken.accessToken)) {
            refreshTokenHandler()
                .then(token => {
                    authContext.writeTokenInStorage(token)
                    sendMessage()
                })
        } else {
            let req_body = {
                ticketText: `${topic} -> ${text}`
            }
            fetch(`${baseURL}/tickets/me`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${userToken.accessToken}`
                },
                body: JSON.stringify(req_body)
            }).then(res => {
                console.log(res)
                return res.json()
            }).then(data => console.log(data))
        }
    }

    return (
        <>
            <section className={ConsultStyle.questionSection}>
                <div className={ConsultStyle.left_container}>
                    <h1 className={ConsultStyle.pageTitle}>Do you have a <br />problem?</h1>
                    <div action="#" className={ConsultStyle.form}>
                        <div className={ConsultStyle.input_container}>
                            <label htmlFor="name-input" className={ConsultStyle.input_label}>topic</label>
                            <input type="text" className={ConsultStyle.input} value={topic} onChange={e => setTopic(e.target.value)} />
                        </div>
                        <div className={ConsultStyle.textarea_container}>
                            <label htmlFor="text-area" className={ConsultStyle.input_label}>your message:</label>
                            <textarea className={ConsultStyle.textArea} name="message" id="text-area" value={text} onChange={e => setText(e.target.value)}></textarea>
                        </div>
                        <button className={ConsultStyle.submit_input} onClick={sendMessage}>Send</button>
                    </div>
                </div>
                <div className={ConsultStyle.right_container}>
                    <div className={ConsultStyle.image_container}>
                        <img src="/general_images/operator.png" alt="operator" className={ConsultStyle.image} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default ConsultationPageComponent