import { useSelector } from "react-redux";
import { selectUserBalance } from "../../redux/auth/selectors";

import s from "./Balance.module.scss";

const Balance: React.FC = () => {
  const userBalance = useSelector(selectUserBalance);

  const formattedBalance =
    userBalance !== undefined && userBalance !== null
      ? userBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")
      : "0.00";

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
