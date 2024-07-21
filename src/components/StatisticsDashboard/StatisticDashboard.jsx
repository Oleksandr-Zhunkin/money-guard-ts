import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import s from "./StatisticDashboard.module.scss";

import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticDashboard = ({ category }) => {
  const userBalance = useSelector(selectUser);

  const summary = category?.categoriesSummary
    .filter((items) => items.type !== "INCOME")
    .map((item) => item.total);
  const formattedBalance = userBalance?.balance
    ?.toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  const data = {
    labels: [],
    datasets: [
      {
        label: "# of Votes",
        data: summary,
        backgroundColor: [
          "#81e1ff",
          "#4a56e2",
          "#ffd8d0",
          "#fed057",
          "#fd9498",
          "#00ad84",
          "#6e78e8",
          "#c5baff",
          "#24cca7",
        ],
        borderWidth: 0,
      },
    ],
  };
  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Statistics</h2>
      <div className={s.chart}>
        <Doughnut data={data} />
        <p className={s.balance}>₴ {formattedBalance}</p>
      </div>
    </div>
  );
};
export default StatisticDashboard;
