/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom"
import "./LoginPageSection.css"
import { useEffect, useState, useContext } from "react"
import { EmailChecker, PhoneChecker } from "../REGEX/Regex"
import baseURL from "../../baseURL"
import AuthContext from "../Context/AuthContext"
import { Spinner } from "react-bootstrap"
import { showMessage } from "../../functions"
// import { useState } from "react"

function LoginPageComponent() {

    const [loginWay, setLoginWay] = useState(0)
    const [formFlag, setFormFlag] = useState(false)
    const [OTP_Flag, setOTP_Flag] = useState(false)
    const [userOTP, setUserOTP] = useState("")
    const [userPass, setUserPass] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPhone, setUserPhone] = useState("")
    const [emailOrPhone, setEmailOrPhone] = useState("")
    const [showModal, setShowModal] = useState(false)

    // const squaresArray = Array.from(Array(260).keys())

    const navigate = useNavigate()
    const authContext = useContext(AuthContext)

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
            showMessage(
                {
                    title: "Invalid Contact info!",
                    text: "Please enter a valid email or phone number",
                    icon: "error",
                    dangerMode: true,
                    timer: 3000
                }
            ).then(val => {
                setEmailOrPhone("")
                setUserPass("")
                setFormFlag(false)
            })
            return false
        }
    }

    const FormChecker = () => {
        if (EmailPhoneValidator(emailOrPhone)) {
            setFormFlag(true)
        }
    }

    const FormSender = (way) => {
        let formInfo = null

        if (!way) { // login with password
            formInfo = {
                password: userPass,
                email: userEmail,
                phoneNumber: userPhone
            }

        } else {  // with otp
            formInfo = {
                email: userEmail,
                phoneNumber: userPhone,
                OTP: userOTP,
            }
        }
        fetch(`${baseURL}/auth/login`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(formInfo)
        }).then(res => {
            if (!res.ok) {
                setFormFlag(false)
            }
            return res.json()
        }).then(data => {
            if (data.message) {
                showMessage({ title: "Oops!", text: data.message, icon: "error" })
            } else if(data) {
                authContext.login(data.user, data.accessToken, data.refreshToken)
                if (data.user.role === "CUSTOMER") {
                    navigate("/")
                } else if (data.user.role === "ADMIN") {
                    navigate("/admin-panel")
                }
            }
        })
    }

    const verifyContact = () => {
        let formInfo = {
            email: userEmail,
            phoneNumber: userPhone,
        }
        fetch(`${baseURL}/auth/contact-verification`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(formInfo)
        }).then(res => {
            if (res.status === 204) {
                setShowModal(true)
            }
        })
    }

    useEffect(() => {
        if (formFlag) {
            if (loginWay) {
                verifyContact()
            } else {
                FormSender(0)
            }
        }
    }, [formFlag])

    return (
        <>
            <section className="login-signup-page-container">

                {/* {
                    squaresArray.map((sq, i) => (
                        <span key={i} className="bg-square"></span>
                    ))
                } */}

                <div className="login-form-wrapper">

                    <img src="./../../../../public/general_images/logo.png" alt="logo" />
                    <div className="login-form-content">

                        <h2 className="form-title">Login</h2>

                        <div className="login-way-box">
                            <span>with</span>
                            <div className={`login-ways ${loginWay ? "otp" : "pass"}`}>
                                <span className={`login-option ${!loginWay && "active"}`} onClick={() => setLoginWay(0)}>password</span>
                                <span className={`login-option ${loginWay && "active"}`} onClick={() => setLoginWay(1)}>OTP</span>
                            </div>
                        </div>
                        <div className="login-form">

                            <div className={`inputBox ${loginWay && "move-input"}`}>

                                <input type="text" required value={emailOrPhone} onChange={e => setEmailOrPhone(e.target.value)} /> <i>Email / Phone number</i>

                            </div>

                            {<div className={`inputBox ${loginWay && "hide-input"}`}>

                                <input type="password" required value={userPass} onChange={e => setUserPass(e.target.value)} /> <i>Password</i>

                            </div>}

                            <div className="links"> <Link to="/forgot-pass" className="forget-btn">Forgot Password</Link> <Link to="/sign-up">Signup</Link>

                            </div>

                            <div className="inputBox">

                                <button
                                    className="form-btn"
                                    onClick={FormChecker}
                                >
                                    {loginWay ? "Send OTP" : "Login"}
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

                {showModal && <div className="otp-modal-bg">
                    <div className="otp-modal">
                        <img src="./../../../../public/general_images/otp_icon.png" alt="password-icon" />
                        <span className='otp-title'>Enter OTP code</span>
                        <p className='check-way-text'>Please check your {(userEmail !== undefined) ? "email" : "phone"}</p>
                        <input className='otp-input'
                            type="text"
                            value={userOTP}
                            onChange={e => setUserOTP(e.target.value)}
                            maxLength={6}
                            minLength={6}
                        />
                        <button
                            className={`otp-verification-btn ${(userOTP.length == 6) && "otp-active-btn"}`}
                            onClick={() => { FormSender(1); setOTP_Flag(true) }}
                        >
                            {!OTP_Flag ? "Verify OTP" : <Spinner animation="grow" variant="dark" />}
                        </button>
                    </div>
                </div>}

            </section>
        </>
    )
}

export default LoginPageComponent