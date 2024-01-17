import React, { useState } from "react";
import { userRows } from "../../datas";
import "./CustomerOrders.css";
import DoneIcon from "@mui/icons-material/Done";
import GradeIcon from "@mui/icons-material/Grade";
export default function CustomerOrders() {
  const [userRowsData, setuserRowsData] = useState(userRows);

  return (
    <div className="comments">
      <div className="commentsWrapper">
        <div className="commentsBottom">
          <div className="userComments">
            {userRowsData.map((data, index) => (
              <div id="commentBox" key={index}>
                <div id="commentBoxHeader">
                  <div id="commentBoxUsername" key={index}>
                    <GradeIcon className="ratingIcon"></GradeIcon>
                    <GradeIcon className="ratingIcon"></GradeIcon>
                    <GradeIcon className="ratingIcon"></GradeIcon>
                    <GradeIcon className="ratingIcon"></GradeIcon>
                  </div>
                  <div className="commentBoxHeaderBtns">
                    <button>
                      <DoneIcon className="accept"></DoneIcon>
                    </button>
                    <button>
                      <DoneIcon className="reject"></DoneIcon>
                    </button>
                  </div>
                </div>

                <div className="productImageComment">
                  <img src="..\images\5.jpg" alt="" />
                  <div id="commentBoxText" key={index}>
                    <p id="userNameComment">{data.username}</p>
                    {data.comments}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
