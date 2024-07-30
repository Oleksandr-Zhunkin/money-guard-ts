import React, { useState } from "react";
import { getYear } from "date-fns";
import s from "./Statistics.module.scss";

import StatisticDashboard from "../../components/StatisticsDashboard/StatisticDashboard";
import StatisticDatePicker from "../../components/StatisticsDataPicker/StatisticsDatePicker";
import StatisticsTable from "../../components/StatisticsTable/StatisticsTable";

import { useSelector } from "react-redux";
import { selectPeriodTransaction } from "../../redux/transactions/selectors";

const currentYear: Date | string | number = getYear(new Date());
const Statistics = () => {
  const [selectedYear, setSelectedYear] = useState<Date | number | string>(
    currentYear
  );
  const [selectedMonth, setSelectedMonth] = useState<null | string>(null);
  const period = useSelector(selectPeriodTransaction);

  return (
    <div className={s.box}>
      <StatisticDashboard category={period} />
      <div>
        <StatisticDatePicker
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          currentYear={currentYear}
        />
        <StatisticsTable category={period} />
      </div>
    </div>
  );
};
export default Statistics;
