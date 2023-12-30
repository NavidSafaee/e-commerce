import React from "react";
import "./Home.css";
import WidgetSm from "../../components/WidgetLg/WidgetLg";
import WidgetLg from "../../components/WidgetLg/WidgetLg";
import Chart from "./../../components/Chart/Chart";
import { xAxisData } from '../../datas';


export default function Home() {
  return (
    <div className="home">
      <Chart grid title="Month Sale" data={xAxisData} dataKey="Sale" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
