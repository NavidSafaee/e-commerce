import "./Home.css";
import WidgetSm from "../../components/WidgetLg/WidgetLg";
import WidgetLg from '../../components/WidgetLg/WidgetLg'

export default function Home() {
  return (
    <div className="home">
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />

      </div>
    </div>
  );
}
