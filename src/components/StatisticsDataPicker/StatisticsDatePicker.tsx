import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";
import Select, { StylesConfig } from "react-select";
import { useDispatch } from "react-redux";

import s from "./StatisticsDatePicker.module.scss";

import {
  fetchPeriodThunk,
  fetchYearThunk,
} from "../../redux/transactions/operations";
import { AppDispatch } from "../../redux/store";
import { PeriodDate } from "../../types/types";

interface OptionType {
  value: string | null | number;
  label: string;
  isDisabled?: boolean;
}

interface DataPikerProps {
  selectedYear: Date | number | string;
  setSelectedYear: React.Dispatch<React.SetStateAction<Date | number | string>>;
  selectedMonth: null | string;
  setSelectedMonth: React.Dispatch<React.SetStateAction<null | string>>;
  currentYear: number;
  defaultValue?: OptionType;
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

const StatisticDatePicker: React.FC<DataPikerProps> = ({
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  currentYear,
}) => {
  const currentMonth = new Date().getMonth() + 1;
  const dispatch = useDispatch<AppDispatch>();

  const generateMonthsOptions = (
    selectedYear: Date | number | string
  ): OptionType[] => {
    const monthsOptions = Array.from({ length: 12 }, (e, i): OptionType => {
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
  const years = Array.from(
    { length: currentYear - 2020 + 1 },
    (_, i) => 2020 + i
  );

  const yearOptions = years.map((year) => ({
    value: year,
    label: year.toString(),
  }));

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
        onChange={(option) => {
          if (option && "value" in option) {
            setSelectedMonth(option.value as string | null);
          } else {
            setSelectedMonth(null);
          }
        }}
        options={generateMonthsOptions(selectedYear)}
        placeholder="Select month"
      />
      <Select
        defaultValue={{ value: currentYear, label: currentYear.toString() }}
        styles={customStyles}
        className={s.monthYearPick}
        onChange={(option) => {
          if (option && "value" in option) {
            setSelectedYear(option.value as number | string | Date);
          } else {
            setSelectedYear(currentYear);
          }
        }}
        options={yearOptions}
        placeholder="Select year"
      />
    </div>
  );
};

export default StatisticDatePicker;
