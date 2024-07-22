import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";
import Select, { StylesConfig } from "react-select";
import { useDispatch } from "react-redux";
import {
  fetchPeriodThunk,
  fetchYearThunk,
} from "../../redux/transactions/operations";
import s from "./StatisticsDatePicker.module.scss";


interface OptionType {
  value: number | null;
  label: string;
  isDisabled?: boolean;
}


interface StatisticDatePickerProps {
  selectedYear: number | null;
  setSelectedYear: (year: number | null) => void;
  selectedMonth: number | null;
  setSelectedMonth: (month: number | null) => void;
  currentYear: number;
}


const customStyles: StylesConfig<OptionType> = {
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


function StatisticDatePicker({
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  currentYear,
}: StatisticDatePickerProps) {
  const currentMonth = new Date().getMonth() + 1;

  const generateMonthsOptions = (selectedYear: number | null): OptionType[] => {
    const monthsOptions = Array.from({ length: 12 }, (_, i) => {
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

  const yearOptions: OptionType[] = years.map((year) => ({
    value: year,
    label: year.toString(),
  }));

  useEffect(() => {
    const data = { year: selectedYear, month: selectedMonth };
    const dataYear = { year: selectedYear };
    if (selectedMonth !== null) {
      dispatch(fetchPeriodThunk(data));
    } else {
      dispatch(fetchYearThunk(dataYear));
    }
  }, [selectedMonth, selectedYear, dispatch, currentYear]);

  const handleMonthChange = (option: OptionType | null) => {
    setSelectedMonth(option ? option.value : null);
  };

  const handleYearChange = (option: OptionType | null) => {
    setSelectedYear(option ? option.value : null);
  };

  return (
    <div className={s.monthYearPick_wrapper}>
      <Select
        defaultValue={{ value: null, label: "All months" }}
        styles={customStyles}
        className={s.monthYearPick}
        onChange={handleMonthChange}
        options={generateMonthsOptions(selectedYear)}
        placeholder="Select month"
      />
      <Select
        defaultValue={{ value: currentYear, label: currentYear.toString() }}
        styles={customStyles}
        className={s.monthYearPick}
        onChange={handleYearChange}
        options={yearOptions}
        placeholder="Select year"
      />
    </div>
  );
}

export default StatisticDatePicker;
