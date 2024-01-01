import React, { useState } from "react";

import { userRows } from "../../datas";
import "./Tickets.css";
import DoneIcon from "@mui/icons-material/Done";
import GradeIcon from "@mui/icons-material/Grade";
export default function Tickets() {
  const [userRowsData, setuserRowsData] = useState(userRows);

  const answerTicket = (event) => {
    document.querySelector("#userTicketBoxAnswer").className =
      "userTicketBoxAnswer";
  };
  const sendTicket = (event) => {
    document.querySelector("#userTicketBoxAnswer").className =
      "userTicketBoxAnswerDISACTIVE";
  };

  return (
    <div className="tickets">
      <div className="ticketsWrapper">
        <div className="ticketsBottom">
          <div className="usertickets">
            <div className="userTicketBox">
              <div className="userTcketBoxHearder">
                <div className="userTcketBoxTitle">
                  how we can get our orders in oother ciries?
                </div>
                <div className="userTicketBoxBtns">
                  <button className="TicketAnswer" onClick={answerTicket}>
                    Answer
                  </button>
                  <button className="TicketIgnore">Ignore</button>
                </div>
              </div>
              <div className="userTicketBoxDes">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates fugiat ducimus quam veniam, aut quibusdam nulla
                accusamus praesentium animi sequi!
              </div>
              <div className="userTicketBoxFooter">
                <div className="TicketDate">2024/1/1</div>
                <div className="TicketUserId">@sehya</div>
              </div>
            </div>
            <div
              className="userTicketBoxAnswerDISACTIVE"
              id="userTicketBoxAnswer"
            >
              <div className="userTicketBoxAnswerTitle">
                how we can get our orders in oother ciries?
              </div>
              <div className="userTicketBoxAnswerDes">
                <textarea
                  name=""
                  id="userTicketBoxAnswerDes"
                  placeholder="Text"
                ></textarea>
              </div>
              <button id="userTicketBoxAnswerBtn" onClick={sendTicket}>
                SEND
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
