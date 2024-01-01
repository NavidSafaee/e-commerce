import React from "react";
import "./Home.css";
import WidgetSm from "../../components/WidgetLg/WidgetLg";
import WidgetLg from "../../components/WidgetLg/WidgetLg";
import Chart from "./../../components/Chart/Chart";
import { xAxisData } from "../../datas";

export default function Home() {
  return (
    <div className="home">
      <div className="HomeCards">
        <div className="HomeCard">
          <div className="HomeCardHeader">
            <div className="HomeCardHeaderIcon">icon</div>
            <div className="HomeCardHeaderTitle">totalSale</div>
          </div>
          <div className="HomeCardValue">
            <p id="HomeCardValue">$450000</p>
          </div>
        </div>
        <div className="HomeCard">
          <div className="HomeCardHeader">
            <div className="HomeCardHeaderIcon">icon</div>
            <div className="HomeCardHeaderTitle">totalSale</div>
          </div>
          <div className="HomeCardValue">
            <p id="HomeCardValue">$450000</p>
          </div>
        </div>
        <div className="HomeCard">
          <div className="HomeCardHeader">
            <div className="HomeCardHeaderIcon">icon</div>
            <div className="HomeCardHeaderTitle">totalSale</div>
          </div>
          <div className="HomeCardValue">
            <p id="HomeCardValue">$450000</p>
          </div>
        </div>
      </div>
      <Chart grid title="Month Sale" data={xAxisData} dataKey="Sale" className="chartHome" />
    </div>
  );
}
