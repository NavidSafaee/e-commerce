/* eslint-disable react/prop-types */
import style from './EditProfile.module.scss'
import AuthContext from '../../Context/AuthContext'
import Button from '@mui/material/Button'
import { MdClose } from 'react-icons/md'
import { useContext, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import baseURL from '../../../baseURL'
import { isTokenExpired, refreshTokenHandler, showMessage } from '../../../functions'
import { EmailChecker, PhoneChecker } from '../../REGEX/Regex'

function EditModal({ ModalCloser, modalType, default_value }) {

    const authContext = useContext(AuthContext)

    const [inputValue, setInputValue] = useState(default_value)
    const [userOTP, setUserOTP] = useState("")
    const [firstModalPending, setFirstModalPending] = useState(false)
    const [OTP_Flag, setOTP_Flag] = useState(false)
    const [showSecondModal, setShowSecondModal] = useState(false)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")

    const Function_Identifier = () => {
        switch (modalType) {
            case "username":
                editHandler({ "username": inputValue })
                break;
            case "birthday":
                editHandler({ "birthDate": inputValue })
                break;

            case "email":
                if (EmailChecker(inputValue)) {
                    verification_handler({ "email": inputValue })
                } else {
                    setFirstModalPending(false)
                    showMessage({
                        title: "Invalid contact info!",
                        text: "Please enter a valid email",
                        icon: "warning",
                        dangerMode: true
                    })
                }
                break;
            case "phoneNumber":
                if (PhoneChecker(inputValue)) {
                    verification_handler({ "phoneNumber": inputValue })
                } else {
                    setFirstModalPending(false)
                    showMessage({
                        title: "Invalid contact info!",
                        text: "Please enter a valid phone number",
                        icon: "warning",
                        dangerMode: true
                    })
                }
                break;
            case "password":
                editHandler({ oldPassword, newPassword, confirmNewPassword })
                break;
            default:
                break;
        }
    }

    const verification_handler = (obj) => {
        setFirstModalPending(true)
        fetch(`${baseURL}/auth/contact-verification?action=edit`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(obj)
        }).then(res => {
            if (res.ok) {
                setFirstModalPending(false)
                setShowSecondModal(true)
            }
        })
    }

    const editHandler = (obj) => {
        if (modalType === "phoneNumber") {
            obj = { ...obj, phoneNumber: inputValue }
        } else if (modalType === "email") {
            obj = { ...obj, email: inputValue }
        }
        const userToken = JSON.parse(localStorage.getItem("userToken"))
        if (isTokenExpired(userToken.accessToken)) {
            refreshTokenHandler()
                .then(token => {
                    authContext.writeTokenInStorage(token)
                    editHandler()
                })
        } else {
            fetch(`${baseURL}/users/me`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${userToken.accessToken}`,
                    "Content-type": "application/json"
                },
                body: JSON.stringify(obj)
            })
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    console.log(data)
                    if (data.message) {
                        showMessage({
                            title: "Oops!",
                            text: data.message,
                            icon: "error",
                            timer: 5000,
                        })
                        setOldPassword("")
                        setNewPassword("")
                        setConfirmNewPassword("")
                    } else {
                        showMessage({
                            title: "Great",
                            text: "Your account updated successfully!",
                            icon: "success",
                            timer: 5000,
                        })
                        authContext.login(data, userToken.accessToken, userToken.refreshToken)
                        ModalCloser()
                    }
                })
        }
    }

    return (
        <div className={style.modal_wrapper}>
            {!showSecondModal && <div className={style.modal_box}>
                <div className={style.modal_head}>
                    <span>change {modalType}</span>
                    <MdClose onClick={() => ModalCloser()} style={{ cursor: "pointer" }} />
                </div>
                <div className={style.modal_body}>
                    {
                        (modalType === "email" || modalType === "username" || modalType === "phoneNumber")
                        &&
                        <input className={style.userInput} type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => {if (e.code === "Enter") {Function_Identifier()}}} />
                    }
                    {
                        (modalType === "birthday") && <input className={style.userInput} type="date" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => {if (e.code === "Enter") {Function_Identifier()}}}/>
                    }
                    {
                        (modalType === "password" && (
                            <>
                                <input type="password" className={style.userInput} placeholder='old password' value={oldPassword} onChange={e => setOldPassword(e.target.value)}/>
                                <input type="password" className={style.userInput} placeholder='new password' value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
                                <input type="password" className={style.userInput} placeholder='reenter new password' value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)}/>
                            </>
                        ))
                    }

                    <div className={style.modal_btns}>
                        <Button
                            variant="contained"
                            disabled={modalType === "password" ? false : (inputValue === default_value) || inputValue.trim() === ""}
                            onClick={Function_Identifier}>
                            {(modalType === "email" || modalType === "phoneNumber") ? "Get OTP" : "Edit"}
                            {firstModalPending && <Spinner animation="grow" variant="light" />}
                        </Button>
                        <Button variant="outlined" onClick={() => ModalCloser()}>cancel</Button>
                    </div>
                </div>
            </div>}
            {showSecondModal && <div className={style.verification_modal}>
                <img src="/general_images/otp_icon.png" alt="password-icon" />
                <span className={style.otp_title}>Enter OTP code</span>
                <p className={style.check_way_text}>Please check your {(modalType === "email") ? "email" : "phone"}</p>
                <input className={style.otp_input}
                    type="text"
                    value={userOTP}
                    onChange={e => setUserOTP(e.target.value)}
                    maxLength={6}
                    minLength={6}
                />
                <button
                    className={`${style.otp_verification_btn} ${(userOTP.length == 6) && style.otp_active_btn}`}
                    onClick={() => { setOTP_Flag(true); editHandler({ OTP: userOTP }) }}
                >
                    {!OTP_Flag ? "Verify OTP" : <Spinner animation="grow" variant="light" />}
                </button>
            </div>}
        </div>
    )
}

export default EditModal