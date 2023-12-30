import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function PaymentStatus() {

    const param = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!(param.status === "success" || param.status === "cancel")) {
            navigate("/not-found")
        }
    }, [])

    return (
        <>
            {
                param.status === "success" && <span>your payment was successfully!</span>
            }
            {
                param.status === "cancel" && <span>Your payment canceled!</span>
            }
        </>
    )
}

export default PaymentStatus