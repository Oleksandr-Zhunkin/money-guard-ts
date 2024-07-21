import s from "./ButtonAddTransaction.module.scss";

import IconAddTransaction from "../Icons/IconAddTransaction";

const ButtonAddTransaction = ({ toggleModal }) => {
  return (
    <div>
      <button className={s.fixedButton} onClick={toggleModal} type="button">
        <IconAddTransaction title="Add transaction" />
      </button>
    </div>
  );
};

export default ButtonAddTransaction;
