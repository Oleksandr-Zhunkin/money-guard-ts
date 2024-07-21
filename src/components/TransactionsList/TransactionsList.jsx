import { useSelector } from "react-redux";
import { useState } from "react";

import s from "./TransactionsList.module.scss";

import ModalWindow from "../ModalWindow/ModalWindow";
import EditTransactionForm from "../EditTransactionForm/EditTransactionForm";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import Loader from "../Loader/Loader.jsx";

import {
  selectIsLoading,
  selectTransactions,
} from "../../redux/transactions/selectors.js";
import useResponse from "../../hooks/useResponse.js";

const TransactionsList = () => {
  const transactions = useSelector(selectTransactions);
  const isLoading = useSelector(selectIsLoading);
  const { isMobile } = useResponse();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const openModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
    setIsModalOpen(false);
  };

  if (!transactions.length) {
    return (
      <div className={s.filler}>
        <p>You don’t have any transactions now...</p>
      </div>
    );
  }

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)
  );

  return isLoading ? (
    <Loader />
  ) : (
    <>
      {!isMobile ? (
        <table className={s.wrapper_tab}>
          <thead>
            <tr>
              <th>Date</th>
              <th className={s.type}>Type</th>
              <th>Category</th>
              <th>Comment</th>
              <th className={s.sum}>Sum</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((transaction, index) => (
              <TransactionsItem
                key={transaction.id}
                transaction={transaction}
                openModal={() => openModal(transaction)}
                index={index + 1}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <ul className={s.listTrans}>
          {sortedTransactions.map((transaction, index) => (
            <TransactionsItem
              key={transaction.id}
              transaction={transaction}
              openModal={() => openModal(transaction)}
              index={index + 1}
            />
          ))}
        </ul>
      )}
      {isModalOpen && selectedTransaction && (
        <ModalWindow isOpen={isModalOpen} onClose={closeModal}>
          <EditTransactionForm
            transaction={selectedTransaction}
            onClose={closeModal}
          />
        </ModalWindow>
      )}
    </>
  );
};

export default TransactionsList;
