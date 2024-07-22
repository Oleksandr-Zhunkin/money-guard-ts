import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import IconEdit from "../Icons/IconEdit";
import useResponse from "../../hooks/useResponse";
import { selectCategories } from "../../redux/categories/selectors";
import { deleteTransactionsThunk } from "../../redux/transactions/operations";
import { getBalanceThunk } from "../../redux/auth/operations";
import s from "./TransactionsItem.module.scss";
import IconArrowUp from "../Icons/IconArrowUp";
import { TransactionType } from "../../types/TransactionFormTypes";

interface Props {
  transaction: TransactionType;
  openModal: () => void;
}

const formatDate = (dateInput: Date | string): string => {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);

  return `${day}.${month}.${year}`;
};
function TransactionsItem({ transaction, openModal }: Props) {
  const dispatch = useDispatch<Dispatch>();
  const { isMobile } = useResponse();
  const categories = useSelector(selectCategories);
  const category = categories.find(
    (item) => item.id === transaction.categoryId
  );
  const categoryName = category ? category.name : "Unknown";
  const displayAmount = Math.abs(transaction.amount);

  const handleDeleteTransaction = () => {
    if (transaction.id) {
      dispatch(deleteTransactionsThunk(transaction.id))
        .unwrap()
        .then(() => dispatch(getBalanceThunk()));
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const transactionRow = (
    <tr key={transaction.id}>
      <td>{formatDate(transaction.transactionDate)}</td>
      <td className={s.type}>{transaction.type === "INCOME" ? "+" : "-"}</td>
      <td>{categoryName}</td>
      <td>{transaction.comment}</td>
      <td
        className={clsx(s.sum, {
          [s.income]: transaction.type === "INCOME",
          [s.expense]: transaction.type === "EXPENSE",
        })}
      >
        {displayAmount}
      </td>
      <td>
        <div className={s.btnBox}>
          <button
            className={s.edit}
            type="button"
            onClick={openModal}
            aria-label="edit button"
          >
            <IconEdit />
          </button>
          <button
            className={s.button}
            type="button"
            onClick={handleDeleteTransaction}
            aria-label="delete button"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );

  const transactionCard = (
    <li
      className={clsx(s.card, {
        [s.cardIncome]: transaction.type === "INCOME",
        [s.cardExpense]: transaction.type === "EXPENSE",
      })}
      key={transaction.id}
    >
      <div className={s.cardRow}>
        <span className={s.cardLabel}>Date</span>
        <span className={s.cardValue}>
          {formatDate(transaction.transactionDate)}
        </span>
      </div>
      <div className={s.cardRow}>
        <span className={s.cardLabel}>Type</span>
        <span className={s.cardValue}>
          {transaction.type === "INCOME" ? "+" : "-"}
        </span>
      </div>
      <div className={s.cardRow}>
        <span className={s.cardLabel}>Category</span>
        <span className={s.cardValue}>{categoryName}</span>
      </div>
      <div className={s.cardRow}>
        <span className={s.cardLabel}>Comment</span>
        <span className={s.cardValue}>{transaction.comment}</span>
      </div>
      <div className={s.cardRow}>
        <span className={s.cardLabel}>Sum</span>
        <span
          className={clsx(s.cardSum, {
            [s.income]: transaction.type === "INCOME",
            [s.expense]: transaction.type === "EXPENSE",
          })}
        >
          {displayAmount}
        </span>
      </div>
      <div className={s.cardActions}>
        <button
          className={s.button}
          type="button"
          onClick={handleDeleteTransaction}
          aria-label="delete button"
        >
          Delete
        </button>
        <button
          className={s.editContainer}
          type="button"
          onClick={openModal}
          aria-label="edit button"
        >
          <IconEdit />
          <p className={s.edit}>Edit</p>
        </button>
        <button
          className={s.gotoUpButton}
          type="button"
          onClick={scrollToTop}
          aria-label="back to top button"
        >
          <IconArrowUp />
        </button>
      </div>
    </li>
  );

  return isMobile ? transactionCard : transactionRow;
}

export default TransactionsItem;
