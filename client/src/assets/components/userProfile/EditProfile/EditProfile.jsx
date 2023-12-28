import { useContext } from 'react'
import style from './EditProfile.module.scss'
import AuthContext from '../../Context/AuthContext'
import { RiEdit2Line } from "react-icons/ri";
import { PiWarningFill } from "react-icons/pi";
import { MdVerified } from "react-icons/md";

function EditProfile() {

  const authContext = useContext(AuthContext)

  return (
    <section className={style.profileMainSection}>
      <div className={style.filedsWrapper}>
        <div className={style.editItem}>
          <div className={style.contentSide}>
            <b className={style.boxTitle}>Username</b>
            <span className={style.boxValue}>{authContext.userInfo.username}</span>
          </div>
          <RiEdit2Line className={style.editBtn} />
        </div>
        <div className={style.editItem}>
          <div className={style.contentSide}>
            <b className={style.boxTitle}>Email {authContext.userInfo.email && <MdVerified />}</b>
            <span className={style.boxValue}>{authContext.userInfo.email}</span>
          </div>
          <RiEdit2Line className={style.editBtn} />
          {!authContext.userInfo.email ? <PiWarningFill className={style.warnIcon} /> : null}
        </div>
        <div className={style.editItem}>
          <div className={style.contentSide}>
            <b className={style.boxTitle}>Phone number {authContext.userInfo.phoneNumber && <MdVerified />}</b>
            <span className={style.boxValue}>{authContext.userInfo.phoneNumber ? authContext.userInfo.phoneNumber : "---"}</span>
          </div>
          <RiEdit2Line className={style.editBtn} />
          {!authContext.userInfo.phoneNumber ? <PiWarningFill className={style.warnIcon} /> : null}
        </div>
        <div className={style.editItem}>
          <div className={style.contentSide}>
            <b className={style.boxTitle}>Date of birth</b>
            <span className={style.boxValue}>{authContext.userInfo.birthday ? authContext.userInfo.birthday : "---"}</span>
          </div>
          <RiEdit2Line className={style.editBtn} />
          {!authContext.userInfo.birthday ? <PiWarningFill className={style.warnIcon} /> : null}
        </div>
        <div className={style.editItem}>
          <div className={style.contentSide}>
            <b className={style.boxTitle}>Password</b>
            <span className={style.boxValue}>* * * * * *</span>
          </div>
          <RiEdit2Line className={style.editBtn} />
        </div>
        <div className={style.editItem}>
          <div className={style.contentSide}>
            <b className={style.boxTitle}>Address</b>
            <span className={style.boxValue}>{authContext.userInfo.address ? authContext.userInfo.address : "---"}</span>
          </div>
          <RiEdit2Line className={style.editBtn} />
          {!authContext.userInfo.address ? <PiWarningFill className={style.warnIcon} /> : null}
        </div>
      </div>
    </section>
  )
}

export default EditProfile