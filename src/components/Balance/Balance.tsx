import { useSelector } from "react-redux";
import { selectUserBalance } from "../../redux/auth/selectors";

import s from "./Balance.module.scss";

type UserBalance = number | null;

const Balance = () => {
  const userBalance: UserBalance = useSelector(selectUserBalance);

  const formattedBalance = userBalance
    ?.toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return (
    <div className={s.balanceContainer}>
      <p className={s.balanceTitle}>YOUR BALANCE</p>
      <p className={s.balanceAmount}>
        <span className={s.balanceAmount1}>₴</span> {formattedBalance}
      </p>
    </div>
  );
};

export default Balance;
