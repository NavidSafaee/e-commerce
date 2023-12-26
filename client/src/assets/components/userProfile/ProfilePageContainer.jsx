/* eslint-disable react/prop-types */
import style from "./ProfilePageContainer.module.scss"
import ProfileSidebar from "./ProfileSidebar/ProfileSidebar"

function ProfilePageContainer(props) {
  return (
    <section className={style.pageContainerSection}>
      <ProfileSidebar />
      {props.children}
    </section>
  )
}

export default ProfilePageContainer