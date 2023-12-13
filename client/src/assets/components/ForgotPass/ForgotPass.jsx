/* eslint-disable no-unused-vars */
import swal from 'sweetalert'
import './ForgotPass.scss'
import { EmailChecker, PhoneChecker } from '../REGEX/Regex'
import { useEffect, useState } from 'react'
import baseURL from '../../baseURL'
import { showMessage } from "./../../functions"

function ForgotPass() {

    const [formFlag, setFormFlag] = useState(false)
    const [userEmail, setUserEmail] = useState("")
    const [userPhone, setUserPhone] = useState("")
    const [emailOrPhone, setEmailOrPhone] = useState("")


    const EmailPhoneValidator = (inp) => {
        if (EmailChecker(inp) | PhoneChecker(inp)) {
            if (EmailChecker(inp)) {
                setUserEmail(inp)
                setUserPhone(undefined)
            } else if (PhoneChecker(inp)) {
                setUserPhone(inp)
                setUserEmail(undefined)
            }
            return true
        } else {
            swal({
                title: "Invalid contact info!",
                text: "Please enter a valid email or phone number",
                icon: "warning",
                dangerMode: true,
            })
            return false
        }
    }

    const FormChecker = () => {
        if (EmailPhoneValidator(emailOrPhone)) {
            setFormFlag(true)
        }
    }

    const FormSender = (input_type, send_value) => {
        let req_body = {}
        if (input_type === "email") {
            req_body = { email: send_value }
        } else {
            req_body = { phoneNumber: send_value }
        }
        console.log(req_body)

        fetch(`${baseURL}/auth/forgot-password`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(req_body)
        }).then(res => {
            console.log(res)
            if (res.ok) {
                showMessage({
                    title: `${userEmail ? "Email" : "message"} sent!`,
                    text: `please check your ${userEmail ? "Email inbox" : "phone"}!`,
                    icon: "info"
                })
            } else {
                return res.json()
            }
        }).then(data => {
            showMessage({
                title: "Oops!",
                text: data.message,
                icon: "error"
            }).then(val => setFormFlag(false))
        })
    }

    useEffect(() => {
        if (formFlag) {
            if (userEmail) {
                FormSender("email", userEmail)
            } else {
                FormSender("phoneNumber", userPhone)
            }
        }
    }, [formFlag])

    return (
        <div className="forget-page">
            <img className="forget-pass-img" src="./../../../../public/general_images/forget-pass.png" alt="forget-password" />
            <div className="forget-form-wrapper">
                <strong className="forgot-form-title">Forgot Your Password?</strong>
                <input
                    className="forgot-form-input"
                    type="text"
                    placeholder="Enter your email or phone number"
                    value={emailOrPhone}
                    onChange={e => setEmailOrPhone(e.target.value)}
                />
                <button className="forgot-form-btn" onClick={() => FormChecker()}>continue</button>
            </div>
        </div>
    )
}

export default ForgotPass