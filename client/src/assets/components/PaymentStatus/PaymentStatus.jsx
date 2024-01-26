/* eslint-disable no-unused-vars */
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { showMessage } from "../../functions"

function PaymentStatus() {

    const param = useParams()
    const navigate = useNavigate()
    
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