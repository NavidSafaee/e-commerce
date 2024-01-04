/* eslint-disable react/prop-types */
import style from './EditProfile.module.scss'
import AuthContext from '../../Context/AuthContext'
import Button from '@mui/material/Button'
import { MdClose } from 'react-icons/md'
import { useContext, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import baseURL from '../../../baseURL'
import { isTokenExpired, refreshTokenHandler, showMessage } from '../../../functions'

function EditModal({ ModalCloser, modalType, default_value }) {

    const authContext = useContext(AuthContext)

    const [inputValue, setInputValue] = useState(default_value)
    const [userOTP, setUserOTP] = useState("")
    const [OTP_Flag, setOTP_Flag] = useState(false)
    const [showSecondModal, setShowSecondModal] = useState(false)

    const Function_Identifier = () => {
        setOTP_Flag(true)
        switch (modalType) {
            case "username":
                editHandler({ "username": inputValue })
                break;
            case "birthday":
                editHandler({ "birthDate": inputValue })
                break;

            case "email":
                verification_handler()
                break;
            default:
                break;
        }
    }

    const verification_handler = () => {
        return null
    }

    const editHandler = (obj) => {
        const userToken = JSON.parse(localStorage.getItem("userToken"))
        if (isTokenExpired(userToken.accessToken)) {
            refreshTokenHandler()
                .then(token => {
                    authContext.writeTokenInStorage(token)
                    editHandler()
                })
        } else {
            console.log(obj)
            fetch(`${baseURL}/users/me`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${userToken.accessToken}`,
                    "Content-type": "application/json"
                },
                body: JSON.stringify(obj)
            })
                .then(res => {
                    console.log(res)
                    if (res.ok) {
                        return res.json()
                    }
                })
                .then(data => {
                    console.log(data)
                    showMessage({
                        title: "Great",
                        text: "Your account updated successfully!",
                        icon: "success",
                        timer: 5000,
                    })
                    authContext.login(data, userToken.accessToken, userToken.refreshToken)
                    ModalCloser()
                })
        }
    }

    return (
        <div className={style.modal_wrapper}>
            <div className={style.modal_box}>
                <div className={style.modal_head}>
                    <span>change {modalType}</span>
                    <MdClose onClick={() => ModalCloser()} style={{ cursor: "pointer" }} />
                </div>
                <div className={style.modal_body}>
                    {
                        (modalType === "email" || modalType === "username" || modalType === "phoneNumber")
                        &&
                        <input className={style.userInput} type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} />
                    }
                    {
                        (modalType === "birthday") && <input className={style.userInput} type="date" value={inputValue} onChange={e => setInputValue(e.target.value)} />
                    }

                    <div className={style.modal_btns}>
                        <Button variant="contained" disabled={inputValue === default_value} onClick={Function_Identifier}>Edit</Button>
                        <Button variant="outlined" onClick={() => ModalCloser()}>cancel</Button>
                    </div>
                </div>
            </div>
            {showSecondModal && <div className={style.verification_modal}>
                <div className={style.otp_modal}>
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
                        onClick={editHandler({email: inputValue, OTP: userOTP})}
                    >
                        {!OTP_Flag ? "Verify OTP" : <Spinner animation="grow" variant="light" />}
                    </button>
                </div>
            </div>}
        </div>
    )
}

export default EditModal