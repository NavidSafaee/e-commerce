import st from './UserHelp.module.scss'
import Accordion from 'react-bootstrap/Accordion'
import { Link } from "react-router-dom"

function UserHelp() {
  return (
    <section className={st.helpSection}>
      <h2 className={st.title}>Frequently Asked Questions</h2>
      <Accordion className={st.accordion} defaultActiveKey={"0"}>
        <Accordion.Item eventKey="0">
          <Accordion.Header><b>Where is Soft-Land?</b></Accordion.Header>
          <Accordion.Body style={{background: "#E1F0DA"}}>
            soft-land is an online store in the field of home furniture that started its activity in Tabriz in 2017. This online store has prioritized customer satisfaction and quality assurance since the first days. Every product that is included in the sales list has been reviewed and approved by our experts; However, if dissatisfaction is reported by the customer, we will replace or modify the product at the first opportunity free of charge.
            The special services of Soft-Land have distinguished this center from other competitors and we owe this situation to the welcome of our dear customers.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header><b>How can I edit my user profile and email?</b></Accordion.Header>
          <Accordion.Body style={{background: "#E1F0DA"}}>
            In the <Link to="/user/profile/edit">«Edit Profile»</Link> section, you can change and modify any of the options you want.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header><b>How to register my address in the user account?</b></Accordion.Header>
          <Accordion.Body style={{background: "#E1F0DA"}}>
            In the <Link to="/user/profile/edit">«Edit Profile»</Link> section, Refer to the address part.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header><b>How to select a secure password?</b></Accordion.Header>
          <Accordion.Body style={{background: "#E1F0DA"}}>
            In order to have a secure password, it is better to observe the following: <br /><br />
            1- Use long passwords <br />
            2- Be sure to use a combination of numbers and letters <br />
            3- It is better to use capital letters <br />
            4- Change your password regularly and periodically
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header><b>I forgot my password, how can I recover my password through the web version?</b></Accordion.Header>
          <Accordion.Body style={{background: "#E1F0DA"}}>
            Enter the <Link to={"/forgot-pass"}>reset password</Link> page; By entering the email or contact number you registered with, you will receive the link to the password change page; Now you can enter the new password.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </section>
  )
}

export default UserHelp