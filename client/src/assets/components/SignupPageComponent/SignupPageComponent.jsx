/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from 'react-router-dom';
import style from './SignupPageComponent.module.scss';
import { useEffect, useState } from 'react';
import { EmailChecker, PhoneChecker } from '../REGEX/Regex';
import baseURL from '../../baseURL';
import { Spinner } from 'react-bootstrap';
import { useContext } from 'react';
import AuthContext from '../Context/AuthContext';
import { showMessage } from '../../functions';
import { CgEditBlackPoint } from "react-icons/cg";
import { FaUser } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";

function SignupPageComponent() {
    // const squaresArray = Array.from(Array(260).keys())

    const authContext = useContext(AuthContext)
    const navigate = useNavigate()

    const [formFlag, setFormFlag] = useState(false)
    const [OTP_Flag, setOTP_Flag] = useState(false)
    const [userOTP, setUserOTP] = useState("")
    const [username, setUsername] = useState("")
    const [userPass, setUserPass] = useState("")
    const [userConfirmPass, setUserConfirmPass] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPhone, setUserPhone] = useState("")
    const [emailOrPhone, setEmailOrPhone] = useState("")
    const [showModal, setShowModal] = useState(false)

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
            showMessage({
                title: "Invalid contact info!",
                text: "Please enter a valid email or phone number",
                icon: "warning",
                dangerMode: true
            })
            return false
        }
    }

    const FormChecker = () => {
        if (EmailPhoneValidator(emailOrPhone)) {
            setFormFlag(true)
        }
    }

    const FormSender = () => {
        let formInfo = {
            username,
            password: userPass,
            email: userEmail,
            phoneNumber: userPhone,
            confirmPassword: userConfirmPass
        }
        fetch(`${baseURL}/auth/contact-verification?action=signup`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(formInfo)
        }).then(res => {
            console.log(res)
            if (res.status === 204) {
                setShowModal(true)
            } else {
                return res.json()
            }
        }).then(data => {
            if (data) {
                showMessage({ title: "Oops!", text: data.message, icon: "warning" })
                    .then(val => {
                        setFormFlag(false)
                        setUserPass("")
                        setUserConfirmPass("")
                    })
            }
        })
    }

    const OPTSender = () => {
        setOTP_Flag(true)
        let formInfoWithOTP = {
            username,
            password: userPass,
            email: userEmail,
            phoneNumber: userPhone,
            confirmPassword: userConfirmPass,
            OTP: userOTP
        }
        console.log(formInfoWithOTP);
        fetch(`${baseURL}/auth/signup`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(formInfoWithOTP)
        })
            .then(res => {
                console.log(res)
                if (res.ok) {
                    showMessage({
                        title: "congratulations!",
                        text: "Your registration was successful!",
                        icon: "success",
                        timer: 3000
                    })
                }
                return res.json()
            })
            .then(data => {
                if (data.message && (data.message === "Wrong contact info or OTP")) {
                    showMessage({
                        title: "Wrong OTP!!",
                        text: "Please enter the OTP correctly",
                        icon: "error"
                    })
                    setOTP_Flag(false)
                    setUserOTP("")
                } else if (data) {
                    authContext.login(data.user, data.accessToken, data.refreshToken)
                    navigate("/")
                }
            })
    }

    useEffect(() => {
        if (formFlag) {
            FormSender()
        }
    }, [formFlag])

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
                            <li className={style.ruleItem}><CgEditBlackPoint /> The username should preferably be real</li>
                            <li className={style.ruleItem}><CgEditBlackPoint /> Password must have at least 6 characters</li>
                            <li className={style.ruleItem}><CgEditBlackPoint /> Enter your valid email or phone number</li>
                            <li className={style.ruleItem}><CgEditBlackPoint /> A verification code will be sent to your email/mobile phone</li>
                        </ul>
                    </div>
                </div>
                <div className={style.form_container}>
                    <strong className={style.form_title}>
                        Signup
                    </strong>
                    <div className={style.form_items}>
                        <div className={style.inputBox}>
                            <FaUser />
                            <input type="text"
                                required
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            /><i className={style.placeHolder}>Username</i>
                        </div>
                        <div className={style.inputBox}>
                            <FaTelegramPlane />
                            <input type="text"
                                required
                                value={emailOrPhone}
                                onChange={(e) => setEmailOrPhone(e.target.value)}
                            /><i className={style.placeHolder}>Email / phone number</i>
                        </div>
                        <div className={style.inputBox}>
                            <IoIosLock />
                            <input type="password"
                                required
                                value={userPass}
                                onChange={(e) => setUserPass(e.target.value)}
                                minLength={6}
                            /><i className={style.placeHolder}>Password</i>
                        </div>
                        <div className={style.inputBox}>
                            <IoIosLock />
                            <input type="password"
                                required
                                value={userConfirmPass}
                                onChange={(e) => setUserConfirmPass(e.target.value)}
                                minLength={6}
                            /><i className={style.placeHolder}>Reenter Password</i>
                        </div>
                    </div>
                    <button className={style.formBtn} onClick={FormChecker}>
                        {!formFlag ? "continue" : <Spinner animation="grow" variant="light" />}
                    </button>
                    <p className={style.question}>Already have an account? <Link to="/login">login</Link></p>
                </div>

                {showModal && <div className={style.otp_modal_bg}>
                    <div className={style.otp_modal}>
                        <img src="/general_images/otp_icon.png" alt="password-icon" />
                        <span className={style.otp_title}>Enter OTP code</span>
                        <p className={style.check_way_text}>Please check your {(userEmail !== undefined) ? "email" : "phone"}</p>
                        <input className={style.otp_input}
                            type="text"
                            value={userOTP}
                            onChange={e => setUserOTP(e.target.value)}
                            maxLength={6}
                            minLength={6}
                            onKeyDown={e => {if (e.code === "Enter") {OPTSender()}}}
                        />
                        <button
                            className={`${style.otp_verification_btn} ${(userOTP.length == 6) && style.otp_active_btn}`}
                            onClick={OPTSender}
                        >
                            {!OTP_Flag ? "Verify OTP" : <Spinner animation="grow" variant="light" />}
                        </button>
                    </div>
                </div>}

            </section>
        </>
    )
}

export default SignupPageComponent