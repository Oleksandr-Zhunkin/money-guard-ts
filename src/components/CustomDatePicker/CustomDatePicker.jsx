import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ field, form, ...props }) => {
  return (
    <DatePicker
      {...field}
      {...props}
      showIcon
      toggleCalendarOnIconClick
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        form.setFieldValue(field.name, val);
      }}
      maxDate={new Date()}
      calendarStartDay={1}
      icon={
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              d="M9 11H7V13H9V11ZM13 11H11V13H13V11ZM17 11H15V13H17V11ZM19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V9H19V20Z"
              fill="#734AEF"
            />
          </g>
          <defs>
            <clipPath id="clip0_34_6636">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      }
    />
  );
};

export default CustomDatePicker;
