import s from "../Navigation/Navigation.module.scss";

const IconHome = () => {
  return (
    <div className={s.icon_wrap}>
      <svg
        className={s.icon}
        width="38"
        height="38"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={s.icon}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 0C0.895431 0 0 0.89543 0 2V16C0 17.1046 0.89543 18 2 18H16C17.1046 18 18 17.1046 18 16V2C18 0.895431 17.1046 0 16 0H2ZM7.8 10.1176V14H4.8V8.82353H3L9 3L15 8.82353H13.2V14H10.2V10.1176H7.8Z"
          fill="#734AEF"
        />
      </svg>
    </div>
  );
};
export default IconHome;
