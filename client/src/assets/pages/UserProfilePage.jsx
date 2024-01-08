/* eslint-disable react/prop-types */
import Navbar from "../components/Navbar/Navbar"
import TopBar from "../components/TopBar/TopBar"
import TopStrip from "../components/TopStrip/TopStrip"
import Footer from "../components/Footer/Footer"
import ProfilePageContainer from "../components/userProfile/ProfilePageContainer"
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext } from "react"
import baseURL from "../baseURL"
import PreLoader from "../components/PreLoader/PreLoader"
import AuthContext from "../components/Context/AuthContext"
import { isTokenExpired, refreshTokenHandler } from "../functions"

function UserProfilePage(props) {

    const authContext = useContext(AuthContext)
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const [isLoaded, setIsLoaded] = useState(false)

    const routeHandler = () => {
        const userToken = JSON.parse(localStorage.getItem("userToken"))
        if (isTokenExpired(userToken?.accessToken)) {
            refreshTokenHandler()
                .then(token => {
                    authContext.writeTokenInStorage(token)
                    routeHandler()
                })
        } else {
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
        }
    }

    useEffect(() => {
        const userToken = JSON.parse(localStorage.getItem("userToken"))

        if (userToken) {
            routeHandler()
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