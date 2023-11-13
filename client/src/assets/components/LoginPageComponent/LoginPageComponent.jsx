import { Link } from "react-router-dom"
import "./LoginPageSection.css"
import { useState } from "react"

function LoginPageComponent() {

    // const [formFlag, setFormFlag] = useState(false)
    // const [userEmail, setUserEmail] = useState("")
    // const [userPhone, setUserPhone] = useState("")

    // const squaresArray = Array.from(Array(260).keys())

    return (
        <>
            <section className="login-signup-page-container">

                {/* {
                    squaresArray.map((sq, i) => (
                        <span key={i} className="bg-square"></span>
                    ))
                } */}

                <div className="login-form-wrapper">

                    <img src="./../../../../public/general_images/logo.png" alt="logo" />
                    <div className="login-form-content">

                        <h2 className="form-title">Login</h2>

                        <div className="login-form">

                            <div className="inputBox">

                                <input type="email" required /> <i>Email</i>

                            </div>

                            <div className="inputBox">

                                <input type="password" required /> <i>Password</i>

                            </div>

                            <div className="links"> <Link to="/forgot-pass" className="forget-btn">Forgot Password</Link> <Link to="/sign-up">Signup</Link>

                            </div>

                            <div className="inputBox">

                                <button className="form-btn">Login</button>

                            </div>

                        </div>

                    </div>

                </div>

            </section>
        </>
    )
}

export default LoginPageComponent