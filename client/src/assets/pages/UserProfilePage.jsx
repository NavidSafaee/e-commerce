/* eslint-disable react/prop-types */
import Navbar from "../components/Navbar/Navbar"
import TopBar from "../components/TopBar/TopBar"
import TopStrip from "../components/TopStrip/TopStrip"
import Footer from "../components/Footer/Footer"
import ProfilePageContainer from "../components/userProfile/ProfilePageContainer"

function UserProfilePage(props) {

    return (
        <>
            <TopStrip />
            <TopBar />
            <Navbar />
            <ProfilePageContainer>
                {props.children}
            </ProfilePageContainer>
            <Footer />
        </>
    )
}

export default UserProfilePage