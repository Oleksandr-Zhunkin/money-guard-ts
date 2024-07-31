import { useState } from "react";
import { getYear } from "date-fns";
import s from "./Statistics.module.scss";

import StatisticDashboard from "../../components/StatisticsDashboard/StatisticDashboard";
import StatisticDatePicker from "../../components/StatisticsDataPicker/StatisticsDatePicker";
import StatisticsTable from "../../components/StatisticsTable/StatisticsTable";

import { useSelector } from "react-redux";
import { selectPeriodTransaction } from "../../redux/transactions/selectors";
import { StatisticsTableProps } from "../../types/types";

const currentYear = getYear(new Date());
const Statistics = () => {
  const [selectedYear, setSelectedYear] = useState<number | string | Date>(
    currentYear
  );
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const period = useSelector(selectPeriodTransaction);
  const categoryData = period
    ? {
        categoriesSummary: [],
        expenseSummary: 0,
        incomeSummary: 0,
      }
    : undefined;
  return (
    <div className={s.box}>
      <StatisticDashboard category={categoryData} />
      <div>
        <StatisticDatePicker
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          currentYear={currentYear}
        />
        <StatisticsTable category={categoryData} />
      </div>
    </div>
  );
};
export default Statistics;
