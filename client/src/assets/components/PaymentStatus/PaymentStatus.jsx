/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { isTokenExpired, refreshTokenHandler, showMessage } from "../../functions"
import AuthContext from "../Context/AuthContext"
import baseURL from "../../baseURL"

function PaymentStatus() {

    const auth = useContext(AuthContext)
    const param = useParams()
    const navigate = useNavigate()

    const createOrder = () => {
        const userToken = JSON.parse(localStorage.getItem("userToken"))
        if (userToken && isTokenExpired(userToken.accessToken)) {
            refreshTokenHandler()
                .then(token => {
                    auth.writeTokenInStorage(token)
                    createOrder()
                })
        } else {
            fetch(`${baseURL}/carts/me`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${userToken.accessToken}`
                },
                body: JSON.stringify({discountPercentage: 0.2})
            }).then(res => {
                console.log(res)
                return res.json()
            }).then(data => console.log(data))
        }
    }
    
    useEffect(() => {
        if (!(param.status === "success" || param.status === "cancel")) {
            navigate("/not-found")
        } else {
            if (param.status === "success") {
                showMessage({
                    title: "Congratulations",
                    text: "The transaction was completed successfully",
                    icon: "success"
                }).then(res => {
                    navigate("/")
                })
                createOrder()
            } else {
                showMessage({
                    title: "Oops!",
                    text: "The transaction encountered an error",
                    icon: "error",
                    dangerMode: true
                }).then(res => {
                    navigate("/")
                })
            }
        }
    }, [])

    return (
        <>
        </>
    )
}

export default PaymentStatus