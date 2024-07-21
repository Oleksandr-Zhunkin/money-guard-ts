import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import css from "./AddTransactionForm.module.scss";

import IncomeTransaction from "../IncomeTransaction/IncomeTransaction";
import ExpenseTransaction from "../ExpenseTransaction/ExpenseTransaction";
import { addTransactionsThunk } from "../../redux/transactions/operations";
import { categoriesThunk } from "../../redux/categories/operations";
import { selectCategories } from "../../redux/categories/selectors";

let formSchema = Yup.object({
  sum: Yup.number().min(1).required(),
  datepicker: Yup.date().required(),
  comment: Yup.string().required(),
  categoryId: Yup.object()
    .shape({
      value: Yup.string().required(),
      label: Yup.string().required(),
    })
    .required(),
});

const AddTransactionForm = ({ onClose }) => {
  const categories = useSelector(selectCategories);
  const [isExpense, setIsIncome] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoriesThunk());
  }, [dispatch]);

  const handleSubmit = (values, actions) => {
    const category = isExpense
      ? "063f1132-ba5d-42b4-951d-44011ca46262"
      : values.categoryId.value;

    const data = {
      transactionDate: values.datepicker,
      type: isExpense ? "INCOME" : "EXPENSE",
      categoryId: category,
      comment: values.comment,
      amount: isExpense ? values.sum : -values.sum,
    };

    dispatch(addTransactionsThunk(data))
      .unwrap()
      .then(() => {
        onClose();
        actions.resetForm();
      })
      .catch((error) => {
        console.error("Error adding transaction:", error);
      });
  };

  const handleOnChange = () => {
    setIsIncome(!isExpense);
  };

  if (!categories.length) {
    return <div>Loading categories...</div>;
  }

  return (
    <Formik
      initialValues={{
        categoryId: {
          value: "c9d9e447-1b83-4238-8712-edc77b18b739",
          label: "Main expenses",
        },
        incomeExpense: !isExpense,
        sum: "",
        datepicker: new Date(),
        comment: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={formSchema}
    >
      <Form className={css.form}>
        <button className={css.close} onClick={onClose}></button>
        <h2 className={css.tableContent}>Add transaction</h2>
        <div className={css["switcher-container"]}>
          Incoming
          <label className={css.slider}>
            <Field
              checked={!isExpense}
              type="checkbox"
              name="incomeExpense"
              onChange={handleOnChange}
            />
            <span className={css["slider-circle"]}></span>
          </label>
          Expense
        </div>
        {isExpense ? (
          <IncomeTransaction />
        ) : (
          <ExpenseTransaction categories={categories} />
        )}
        <div className={css["buttons-container"]}>
          <button className={`${css.button} ${css.submit_btn}`} type="submit">
            Add
          </button>
          <button className={css.button} type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default AddTransactionForm;
