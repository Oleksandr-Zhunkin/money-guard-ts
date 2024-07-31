import React from "react";
import s from "./ButtonAddTransaction.module.scss";
import IconAddTransaction from "../Icons/IconAddTransaction";

interface ButtonAddTransactionProps {
  toggleModal: () => void; 
}

const ButtonAddTransaction: React.FC<ButtonAddTransactionProps> = ({
  toggleModal,
}) => {
  return (
    <div>
      <button
        className={s.fixedButton}
        onClick={toggleModal}
        type="button"
        aria-label="Add transaction"
      >
        <IconAddTransaction />
      </button>
    </div>
  );
};

export default ButtonAddTransaction;
