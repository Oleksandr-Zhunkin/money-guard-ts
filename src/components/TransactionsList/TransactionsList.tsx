import { useSelector } from "react-redux";
import { useState } from "react";
import s from "./TransactionsList.module.scss";
import ModalWindow from "../ModalWindow/ModalWindow";
import EditTransactionForm from "../EditTransactionForm/EditTransactionForm";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import Loader from "../Loader/Loader";
import {
  selectIsLoading,
  selectTransactions,
} from "../../redux/transactions/selectors";
import useResponse from "../../hooks/useResponse";
import { TransactionType } from "../../types/TransactionFormTypes"; 

const TransactionsList = () => {
  const transactions = useSelector(selectTransactions) as TransactionType[]; 
  const isLoading = useSelector(selectIsLoading);
  const { isMobile } = useResponse();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionType | null>(null);

  const openModal = (transaction: TransactionType) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
    setIsModalOpen(false);
  };

  if (transactions.length === 0) {
    return (
      <div className={s.filler}>
        <p>You don’t have any transactions now...</p>
      </div>
    );
  }

  const sortedTransactions = [...transactions].sort(
    (a, b) =>
      new Date(b.transactionDate).getTime() -
      new Date(a.transactionDate).getTime()
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
