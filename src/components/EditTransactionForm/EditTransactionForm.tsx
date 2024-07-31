import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Transaction } from "../../types/types";
import css from "./EditTransactionForm.module.scss";
import IncomeTransaction from "../IncomeTransaction/IncomeTransaction";
import ExpenseTransaction from "../ExpenseTransaction/ExpenseTransaction";
import { updateTransactionsThunk } from "../../redux/transactions/operations";
import { selectCategories } from "../../redux/categories/selectors";
import { getBalanceThunk } from "../../redux/auth/operations";
import {
  onSubmitValuesProps,
  SelectOptionType,
} from "../../types/TransactionFormTypes";
import { AppDispatch } from "../../redux/store";

const formSchema = Yup.object({
  datepicker: Yup.date().required(),
  comment: Yup.string().required(),
  categoryId: Yup.object({
    value: Yup.string().required(),
    label: Yup.string().required(),
  }).required(),
  sum: Yup.number().required().min(0, "Amount must be positive"),
});

type Prop = {
  transaction: Transaction;
  onClose: () => void;
};

const EditTransactionForm = ({ transaction, onClose }: Prop) => {
  const categories = useSelector(selectCategories);
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (values: onSubmitValuesProps, actions: any) => {
    onClose();
    dispatch(
      updateTransactionsThunk({
        id: transaction.id || "", // Ensure id is always a string
        data: {
          transactionDate: values.datepicker.toISOString(),
          string,
          type: values.type,
          categoryId: values.categoryId.value,
          comment: values.comment,
          amount: values.type === "EXPENSE" ? -values.sum : values.sum,
        },
      })
    )
      .unwrap()
      .then(() => {
        dispatch(getBalanceThunk());
      });

    actions.resetForm();
  };

  const initialValues: onSubmitValuesProps = {
    type: transaction.type,
    sum:
      transaction.type === "EXPENSE" ? -transaction.amount : transaction.amount,
    datepicker: transaction.transactionDate,
    comment: transaction.comment,
    categoryId: {
      value: transaction.categoryId,
      label:
        categories.find((elem) => elem.id === transaction.categoryId)?.name ||
        "",
    },
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={formSchema}
    >
      <Form className={css.form}>
        <button className={css.close} onClick={onClose} type="button"></button>
        <h2 className={css.tableContent}>Edit transaction</h2>
        <div className={css["switcher-container"]}>
          {transaction.type === "INCOME" ? (
            <span className={css.active}>Incoming</span>
          ) : (
            <span>Incoming</span>
          )}
          /{" "}
          {transaction.type === "EXPENSE" ? (
            <span className={css.active}>Expense</span>
          ) : (
            <span>Expense</span>
          )}
        </div>
        {transaction.type === "INCOME" ? (
          <IncomeTransaction />
        ) : (
          <ExpenseTransaction categories={categories} />
        )}
        <div className={css["buttons-container"]}>
          <button className={`${css.button} ${css.submit_btn}`} type="submit">
            Save
          </button>
          <button className={css.button} onClick={onClose} type="button">
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default EditTransactionForm;
