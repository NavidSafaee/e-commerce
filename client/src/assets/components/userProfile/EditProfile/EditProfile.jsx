import { useContext, useEffect, useState } from 'react'
import Zoom from '@mui/material/Zoom';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import style from './EditProfile.module.scss'
import AuthContext from '../../Context/AuthContext'
import { RiEdit2Line } from "react-icons/ri";
import { PiWarningFill } from "react-icons/pi";
import { MdVerified } from "react-icons/md";
import EditModal from './EditModal';

function EditProfile() {

  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState("")
  const [default_value, setDefault_value] = useState(null)
  const [userInfo, setUserInfo] = useState({})
  const authContext = useContext(AuthContext)

  const ModalCloser = () => {
    setShowModal(false)
  }

  useEffect(() => {
    setUserInfo(authContext.userInfo)
  }, [authContext])

  useEffect(() => {
    if (modalType.length) {
      setShowModal(true)
    }
  }, [modalType])

  useEffect(() => {
    if (!showModal) {
      setModalType("")
    }
  }, [showModal])

  return (
    <section className={style.profileMainSection}>
      {showModal && <EditModal ModalCloser={ModalCloser} modalType={modalType} default_value={default_value}/>}
      <div className={style.filedsWrapper}>
        <div className={style.editItem}>
          <div className={style.contentSide}>
            <b className={style.boxTitle}>Username</b>
            <span className={style.boxValue}>{userInfo.username}</span>
          </div>
          <RiEdit2Line className={style.editBtn} onClick={() => {setModalType("username"); setDefault_value(userInfo.username)}}/>
        </div>
        <div className={style.editItem}>
          <div className={style.contentSide}>
            {authContext.userInfo.email ? <Tooltip title="verified" placement="right" TransitionComponent={Zoom}><b className={style.boxTitle}>Email <MdVerified /></b></Tooltip> : <b className={style.boxTitle}>Email</b>}
            <span className={style.boxValue}>{userInfo.email}</span>
          </div>
          <RiEdit2Line className={style.editBtn} onClick={() => {setModalType("email"); setDefault_value(userInfo.email)}}/>
          {!authContext.userInfo.email ? <Tooltip title="Please fill in this field" placement="top" TransitionComponent={Zoom}><Button><PiWarningFill className={style.warnIcon} /></Button></Tooltip> : null}
        </div>
        <div className={style.editItem}>
          <div className={style.contentSide}>
            {authContext.userInfo.phoneNumber ? <Tooltip title="verified" placement="right" TransitionComponent={Zoom}><b className={style.boxTitle}>Phone number <MdVerified /></b></Tooltip> : <b className={style.boxTitle}>Phone number</b>}
            <span className={style.boxValue}>{userInfo.phoneNumber ? userInfo.phoneNumber : "---"}</span>
          </div>
          <RiEdit2Line className={style.editBtn} onClick={() => {setModalType("phoneNumber"); setDefault_value(userInfo.phoneNumber)}}/>
          {!authContext.userInfo.phoneNumber ? <Tooltip title="Please fill in this field" placement="top" TransitionComponent={Zoom}><Button><PiWarningFill className={style.warnIcon} /></Button></Tooltip> : null}
        </div>
        <div className={style.editItem}>
          <div className={style.contentSide}>
            <b className={style.boxTitle}>Date of birth</b>
            <span className={style.boxValue}>{userInfo.birthDate ? userInfo.birthDate.slice(0, 10) : "---"}</span>
          </div>
          <RiEdit2Line className={style.editBtn} onClick={() => {setModalType("birthday"); setDefault_value(userInfo.birthDate)}}/>
          {!authContext.userInfo.birthDate ? <Tooltip title="Please fill in this field" placement="top" TransitionComponent={Zoom}><Button><PiWarningFill className={style.warnIcon} /></Button></Tooltip> : null}
        </div>
        <div className={style.editItem}>
          <div className={style.contentSide}>
            <b className={style.boxTitle}>Password</b>
            <span className={style.boxValue}>* * * * * *</span>
          </div>
          <RiEdit2Line className={style.editBtn} onClick={() => {setModalType("password"); setDefault_value(userInfo.password)}}/>
        </div>
        <div className={style.editItem}>
          <div className={style.contentSide}>
            <b className={style.boxTitle}>Address</b>
            <span className={style.boxValue}>{userInfo.address ? userInfo.address : "---"}</span>
          </div>
          <RiEdit2Line className={style.editBtn} onClick={() => {setModalType("address"); setDefault_value(userInfo.address)}}/>
          {!authContext.userInfo.address ? <Tooltip title="Please fill in this field" placement="top"><Button><PiWarningFill className={style.warnIcon} /></Button></Tooltip> : null}
        </div>
      </div>
    </section>
  )
}

export default EditProfile