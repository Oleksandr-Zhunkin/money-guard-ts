import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";

import s from "./StatisticsDatePicker.module.scss";

import {
  fetchPeriodThunk,
  fetchYearThunk,
} from "../../redux/transactions/operations";

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#4A56E21A",
    color: "#FBFBFB",
    borderRadius: "8px",
    borderColor: "1px solid #FFFFFF99",
    fontSize: "16px",
    fontWeight: "400",
    width: "100%",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#FBFBFB",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "linear-gradient(0deg, rgba(83, 61, 186, 0.7) 0%, rgba(80, 48, 154, 0.7) 43.14%, rgba(106, 70, 165, 0.525) 73.27%, rgba(133, 93, 175, 0.133) 120.03%)"
      : "#4A56E21A",
    color: state.isSelected ? "#FF868D" : "#FBFBFB",
    "&:hover": {
      backgroundColor:
        "linear-gradient(0deg, rgba(83, 61, 186, 0.7) 0%, rgba(80, 48, 154, 0.7) 43.14%, rgba(106, 70, 165, 0.525) 73.27%, rgba(133, 93, 175, 0.133) 120.03%)",
      color: "#FF868D",
    },
  }),
  menu: (provided) => ({
    ...provided,
    background:
      "linear-gradient(0deg, rgba(83, 61, 186, 0.7) 0%, rgba(80, 48, 154, 0.7) 43.14%, rgba(106, 70, 165, 0.525) 73.27%, rgba(133, 93, 175, 0.133) 120.03%)",
  }),
};

const StatisticDatePicker = ({
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  currentYear,
}) => {
  const currentMonth = new Date().getMonth() + 1;

  const generateMonthsOptions = (selectedYear) => {
    const monthsOptions = Array.from({ length: 12 }, (e, i) => {
      const month = new Date(0, i).toLocaleString("en", { month: "long" });
      return {
        value: i + 1,
        label: month,
        isDisabled: i + 1 > currentMonth && selectedYear === currentYear,
      };
    });
    monthsOptions.unshift({ value: null, label: "All months" });
    return monthsOptions;
  };
  const dispatch = useDispatch();
  const years = Array.from(
    { length: currentYear - 2020 + 1 },
    (_, i) => 2020 + i
  );

  const yearOptions = years.map((year) => ({ value: year, label: year }));
  useEffect(() => {
    const data = { year: selectedYear, month: selectedMonth };
    const dataYear = { year: selectedYear };
    dispatch(selectedMonth ? fetchPeriodThunk(data) : fetchYearThunk(dataYear));
  }, [selectedMonth, selectedYear, dispatch, currentYear]);

  return (
    <div className={s.monthYearPick_wrapper}>
      <Select
        defaultValue={{ value: null, label: "All months" }}
        styles={customStyles}
        className={s.monthYearPick}
        onChange={(option) => setSelectedMonth(option.value)}
        options={generateMonthsOptions(selectedYear)}
        placeholder="Select month"
      />
      <Select
        defaultValue={{ value: currentYear, label: currentYear }}
        styles={customStyles}
        className={s.monthYearPick}
        onChange={(selectedOption) => setSelectedYear(selectedOption.value)}
        options={yearOptions}
        placeholder="Select year"
      />
    </div>
  );
};

export default StatisticDatePicker;
