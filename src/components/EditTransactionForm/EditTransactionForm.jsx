import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import css from "./EditTransactionForm.module.scss";

import IncomeTransaction from "../IncomeTransaction/IncomeTransaction";
import ExpenseTransaction from "../ExpenseTransaction/ExpenseTransaction";
import { updateTransactionsThunk } from "../../redux/transactions/operations";
import { selectCategories } from "../../redux/categories/selectors";
import { getBalanceThunk } from "../../redux/auth/operations";

let formSchema = Yup.object({
  datepicker: Yup.date().required(),
  comment: Yup.string().required(),
});

const EditTransactionForm = ({
  transaction = {
    id: "f1372b12-642f-4437-8140-94eec9b7d51e",
    transactionDate: "2024-07-14T14:06:44.217Z",
    type: "EXPENSE",
    comment: "for goIt school",
    amount: -10000,
    balanceAfter: 8000,
    categoryId: "c9d9e447-1b83-4238-8712-edc77b18b739",
    userId: "d761b29a-7ba8-47da-b036-9be4b8058b80",
  },
  onClose,
}) => {
  const category = useSelector(selectCategories);
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    onClose();
    dispatch(
      updateTransactionsThunk({
        id: transaction.id,
        data: {
          transactionDate: values.datepicker,
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

  return (
    <Formik
      initialValues={{
        type: transaction.type,
        sum:
          transaction.type === "EXPENSE"
            ? -transaction.amount
            : transaction.amount,
        datepicker: new Date(transaction.transactionDate),
        comment: transaction.comment,
        categoryId: {
          value: transaction.categoryId,
          label: category.find((elem) => elem.id == transaction.categoryId)
            ?.name,
        },
      }}
      onSubmit={handleSubmit}
      validationSchema={formSchema}
    >
      <Form className={css.form}>
        <button className={css.close} onClick={(e) => onClose(e)}></button>
        <h2 className={css.tableContent}>Edit transaction</h2>
        <div className={css["switcher-container"]}>
          {transaction.type == "INCOME" ? (
            <span className={css.active}>Incoming</span>
          ) : (
            <span>Incoming</span>
          )}
          /{" "}
          {transaction.type == "EXPENSE" ? (
            <span className={css.active}>Expense</span>
          ) : (
            <span>Expense</span>
          )}
        </div>
        {transaction.type == "INCOME" ? (
          <IncomeTransaction />
        ) : (
          <ExpenseTransaction
            categories={category}
            defaultValue={
              category.find((elem) => elem.id === transaction.categoryId)?.name
            }
          />
        )}
        <div className={css["buttons-container"]}>
          <button className={`${css.button} ${css.submit_btn}`} type="submit">
            Save
          </button>
          <button className={css.button} onClick={onClose} type="click">
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default EditTransactionForm;
