import Select from "react-select";

import { Category } from "../../types/TransactionFormTypes";

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backdropFilter: "blur(100px)",
    outline: "none",
    border: "none",
    background: "transparent",
    color: "#FFFFFF99",
    minHeight: "35px",
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    padding: "0 6px",
  }),
  input: (provided: any) => ({
    ...provided,
    margin: "0",
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    display: "none",
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    height: "35px",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#FBFBFB",
  }),
  menu: (provided: any) => ({
    ...provided,
    background:
      "linear-gradient(0deg, rgba(83, 61, 186, 0.7) 0%, rgba(80, 48, 154, 0.7) 43.14%, rgba(106, 70, 165, 0.525) 73.27%, rgba(133, 93, 175, 0.133) 120.03%)",
    backdropFilter: "blur(100px)",
    scrollBehavior: "smooth",
    scrollbarWidth: "thin",
    scrollbarColor: "#BFB4DD",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor:
      state.isSelected || state.isFocused
        ? "rgba(255, 255, 255, 0.1)"
        : "transparent",
    color: state.isSelected || state.isFocused ? "#FF868D" : provided.color,
  }),
};

import { FieldProps } from "formik";

interface Prop extends FieldProps {
  options: Category[];
}

const CustomSelect = ({ field, form, options, ...props }: Prop) => {
  const newOption = options.map((elem) => {
    return { value: elem.id, label: elem.name };
  });

  return (
    <Select
      {...field}
      {...props}
      value={field.value}
      options={newOption}
      onChange={(option) => form.setFieldValue(field.name, option)}
      onBlur={() => form.setFieldTouched(field.name, true)}
      styles={customStyles}
    />
  );
};

export default CustomSelect;
