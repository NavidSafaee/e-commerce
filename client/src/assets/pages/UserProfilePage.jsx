/* eslint-disable react/prop-types */
import Navbar from "../components/Navbar/Navbar"
import TopBar from "../components/TopBar/TopBar"
import TopStrip from "../components/TopStrip/TopStrip"
import Footer from "../components/Footer/Footer"
import ProfilePageContainer from "../components/userProfile/ProfilePageContainer"
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import baseURL from "../baseURL"
import PreLoader from "../components/PreLoader/PreLoader"

function UserProfilePage(props) {

    const { pathname } = useLocation()
    const navigate = useNavigate()

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const userToken = JSON.parse(localStorage.getItem("userToken"))

        if (userToken) {
            fetch(`${baseURL}/users/me`, {
                headers: {
                    Authorization: `Bearer ${userToken.accessToken}`
                }
            }).then(res => {
                return res.json()
            }).then(userData => {
                if (userData.role === "CUSTOMER") {
                    setIsLoaded(true)
                } else {
                    navigate("/access-denied")
                }
            })
        } else {
            navigate("/access-denied")
        }
    }, [pathname])

    return (
        <>
            {isLoaded ?
                <>
                    <TopStrip />
                    <TopBar />
                    <Navbar />
                    <ProfilePageContainer>
                        {props.children}
                    </ProfilePageContainer>
                    <Footer />
                </>
                :
                <PreLoader />
            }
        </>
    )
}

export default UserProfilePage