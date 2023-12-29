/* eslint-disable react/prop-types */
import style from './EditProfile.module.scss'
import AuthContext from '../../Context/AuthContext'
import Button from '@mui/material/Button'
import { MdClose } from 'react-icons/md'
import { useContext, useState } from 'react'
import baseURL from '../../../baseURL'
import { isTokenExpired, refreshTokenHandler, showMessage } from '../../../functions'

function EditModal({ onHandleModal, modalType, default_value }) {

    const authContext = useContext(AuthContext)

    const [inputValue, setInputValue] = useState(default_value)

    const editHandler = () => {
        const userToken = JSON.parse(localStorage.getItem("userToken"))
        if (isTokenExpired(userToken.accessToken)) {
            refreshTokenHandler()
                .then(token => {
                    authContext.writeTokenInStorage(token)
                    editHandler()
                })
        } else {

            let req_body = {"username": inputValue}

            fetch(`${baseURL}/users/me`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${userToken.accessToken}`,
                    "Content-type": "application/json"
                },
                body: JSON.stringify(req_body)
            })
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    }
                })
                .then(data => {
                    showMessage({
                        title: "Great",
                        text: "Your account updated successfully!",
                        icon: "success",
                        timer: 5000,
                    })
                    authContext.login(data, userToken.accessToken, userToken.refreshToken)
                    onHandleModal(false)
                })
        }
    }

    return (
        <div className={style.modal_wrapper}>
            <div className={style.modal_box}>
                <div className={style.modal_head}>
                    <span>change {modalType}</span>
                    <MdClose onClick={() => onHandleModal(false)} style={{cursor: "pointer"}}/>
                </div>
                <div className={style.modal_body}>
                    <input className={style.userInput} type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} />
                    <div className={style.modal_btns}>
                        <Button variant="contained" disabled={inputValue === default_value} onClick={editHandler}>Edit</Button>
                        <Button variant="outlined" onClick={() => onHandleModal(false)}>cancel</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditModal