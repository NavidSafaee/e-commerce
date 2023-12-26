import Navbar from "../components/Navbar/Navbar"
import TopBar from "../components/TopBar/TopBar"
import TopStrip from "../components/TopStrip/TopStrip"
import { profileRoutes } from "../Routes"
import Footer from "../components/Footer/Footer"
import { useRoutes } from "react-router-dom"
import ProfilePageContainer from "../components/userProfile/ProfilePageContainer"

function UserProfilePage() {

    const profileRouter = useRoutes(profileRoutes)

    return (
        <>
            <TopStrip />
            <TopBar />
            <Navbar />
            <ProfilePageContainer>
                {profileRouter}
            </ProfilePageContainer>
            <Footer />
        </>
    )
}

export default UserProfilePage