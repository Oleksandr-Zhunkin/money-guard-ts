import { useEffect, useState } from "react";
import TransactionsList from "../../components/TransactionsList/TransactionsList";
import AddTransactionForm from "../../components/AddTransactionForm/AddTransactionForm";
import ButtonAddTransactions from "../../components/ButtonAddTransaction/ButtonAddTransaction";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import Loader from "../../components/Loader/Loader";

import s from "./HomePage.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { getTransactionsThunk } from "../../redux/transactions/operations";
import { selectIsLoading } from "../../redux/transactions/selectors";

export default function HomePage() {
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  useEffect(() => {
    dispatch(getTransactionsThunk());
  }, [dispatch]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className={s.tab}>
      <TransactionsList />
      <ButtonAddTransactions toggleModal={toggleModal} />
      <ModalWindow isOpen={isModalOpen} onClose={toggleModal}>
        <AddTransactionForm onClose={toggleModal} />
      </ModalWindow>
    </div>
  );
}
