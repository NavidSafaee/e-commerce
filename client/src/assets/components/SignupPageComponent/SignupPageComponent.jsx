import { Link } from 'react-router-dom';
import './SignupPageComponent.css';
import { useEffect, useState } from 'react';
import { EmailChecker, PhoneChecker } from '../REGEX/Regex';

function SignupPageComponent() {
    const squaresArray = Array.from(Array(260).keys())

    const [userEmail, setUserEmail] = useState(null)
    const [userPhone, setUserPhone] = useState(null)
    const [emailOrPhone, setEmailOrPhone] = useState("")

    const FormChecker = (inp) => {
        if (EmailChecker(inp) | PhoneChecker(inp)) {
            if (EmailChecker(inp)) {
                setUserEmail(inp)
                setUserPhone(null)
            } else if (PhoneChecker(inp)) {
                setUserPhone(inp)
                setUserEmail(null)
            }
        } else {
            alert("invalid information!")
        }
    }

    useEffect(() => {
        if (userEmail) {
            console.log("email : ", userEmail, userPhone)
        } else if(userPhone) {
            console.log("phone : ", userPhone, userEmail)
        }
    }, [userEmail, userPhone])

    return (
        <>
            <section className="signup-page-container">

                {
                    squaresArray.map((sq, i) => (
                        <span key={i} className="bg-square"></span>
                    ))
                }
                <div className="sign-up">

                    <img src="./../../../../public/general_images/logo.png" alt="" />
                    <div className="content">

                        <h2 className="form-title">signup</h2>

                        <div className="form">

                            <div className="inputBox">

                                <input type="password" required /> <i>Username</i>

                            </div>

                            <div className="inputBox">

                                <input type="text"
                                    value={emailOrPhone}
                                    onChange={(e) => setEmailOrPhone(e.target.value)}
                                /><i>Email / phone number</i>
                            </div>

                            <div className="inputBox">

                                <input type="password" required /> <i>Password</i>

                            </div>


                            <div className="links"><Link to={"/login"} className='login-link'>Login</Link>

                            </div>

                            <div className="inputBox">

                                <button className='form-btn' onClick={() => FormChecker(emailOrPhone)}>sign up</button>

                            </div>

                        </div>

                    </div>

                </div>

            </section>
        </>
    )
}

export default SignupPageComponent