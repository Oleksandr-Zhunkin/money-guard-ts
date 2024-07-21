import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import IconEdit from "../Icons/IconEdit";
import useResponse from "../../hooks/useResponse.js";
import { selectCategories } from "../../redux/categories/selectors.js";
import {
  deleteTransactionsThunk,
  getTransactionsThunk,
} from "../../redux/transactions/operations";
import { getBalanceThunk } from "../../redux/auth/operations.js";
import s from "./TransactionsItem.module.scss";
import IconArrowUp from "../Icons/IconArrowUp.jsx";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${day}.${month}.${year}`;
};

const TransactionsItem = ({ transaction = {}, openModal }) => {
  const dispatch = useDispatch();
  const displayType = transaction.type === "INCOME" ? "+" : "-";
  const { isMobile } = useResponse();

  const handleDeleteTransaction = () => {
    dispatch(deleteTransactionsThunk(transaction.id))
      .unwrap()
      .then(() => dispatch(getBalanceThunk()));
  };

  const categories = useSelector(selectCategories);
  const category = categories.find(
    (item) => item.id === transaction.categoryId
  );
  const categoryName = category ? category.name : "Unknown";
  const displayAmount = Math.abs(transaction.amount);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const transactionRow = (
    <tr key={transaction.id}>
      <td>{formatDate(transaction.transactionDate)}</td>
      <td className={s.type}>{displayType}</td>
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
            <IconEdit title="Edit" />
          </button>
          <button
            className={s.button}
            type="button"
            onClick={() => handleDeleteTransaction()}
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
        <span className={s.cardValue}>{displayType}</span>
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
          onClick={() => handleDeleteTransaction()}
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
};

export default TransactionsItem;
