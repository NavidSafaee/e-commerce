/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom"
import style from "./../SignupPageComponent/SignupPageComponent.module.scss"
import _style from "./LoginPageComponent.module.scss"
import { useEffect, useState, useContext } from "react"
import { EmailChecker, PhoneChecker } from "../REGEX/Regex"
import baseURL from "../../baseURL"
import AuthContext from "../Context/AuthContext"
import { Spinner } from "react-bootstrap"
import { showMessage } from "../../functions"
import { CgEditBlackPoint } from "react-icons/cg"
import { IoIosLock } from "react-icons/io"
import { FaTelegramPlane } from "react-icons/fa"

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
            } else if (data) {
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
        fetch(`${baseURL}/auth/contact-verification?action=login`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(formInfo)
        }).then(res => {
            if (res.status === 204) {
                setShowModal(true)
            }
            if (res.status === 400) {
                return res.json()
            }
        }).then(data => showMessage({
            title: 'Oops!',
            text: data.message,
            icon: 'error'
        }).then(val => { setFormFlag(false); setEmailOrPhone(""); setUserEmail(""); setUserPhone(""); setUserPass(""); }))
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

    useEffect(() => {
        setEmailOrPhone("")
    }, [loginWay])

    return (
        <>
            <section className={style.form_page_container}>

                <div className={style.form_bg_container}>
                    <div className={style.text_container}>
                        <img src="/general_images/logo.png" alt="logo" className={style.logo} />
                        <h1 className={style.softland}>Soft Land</h1>
                        <p className={style.info_text}>
                            Please pay attention to the following points:
                        </p>
                        <ul className={style.rules_list}>
                            <li className={style.ruleItem}><CgEditBlackPoint /> Password must have at least 6 characters</li>
                            <li className={style.ruleItem}><CgEditBlackPoint /> Enter your valid email or phone number</li>
                            <li className={style.ruleItem}><CgEditBlackPoint /> A verification code will be sent to your email/mobile phone</li>
                        </ul>
                    </div>
                </div>
                <div className={style.form_container}>
                    <strong className={style.form_title}>
                        Login
                    </strong>
                    <div className={_style.login_way_box}>
                        <span>with</span>
                        <div className={`${_style.login_ways} ${loginWay ? _style.otp : _style.pass}`}>
                            <span className={`${_style.login_option} ${!loginWay && _style.active}`} onClick={() => setLoginWay(0)}>password</span>
                            <span className={`${_style.login_option} ${loginWay && _style.active}`} onClick={() => setLoginWay(1)}>OTP</span>
                        </div>
                    </div>
                    <div className={style.form_items}>
                        <div className={`${_style.inputBox} ${loginWay && _style.move_input}`}>
                            <FaTelegramPlane />
                            <input type="text"
                                required
                                value={emailOrPhone}
                                onChange={(e) => setEmailOrPhone(e.target.value)}
                            /><i className={_style.placeHolder}>Email / phone number</i>
                        </div>
                        <div className={`${_style.inputBox} ${loginWay && _style.hide_input}`}>
                            <IoIosLock />
                            <input type="password"
                                required
                                value={userPass}
                                onChange={(e) => setUserPass(e.target.value)}
                                minLength={6}
                            /><i className={_style.placeHolder}>Password</i>
                        </div>
                    </div>
                    <button className={style.formBtn} onClick={FormChecker}>
                        {loginWay ? "Send OTP" : "Login"}
                    </button>
                    <p className={style.question}>{"Don't have an account?"} <Link to="/sign-up">signup</Link></p>
                    <Link to="/forgot-pass" className={_style.forgotBtn}>Forgot Password</Link>
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