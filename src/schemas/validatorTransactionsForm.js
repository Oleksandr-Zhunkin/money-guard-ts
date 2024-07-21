import * as Yup from "yup";

export const transactionSchema = () =>
  Yup.object({
    sum: Yup.number()
      .min(1, "Amount must be at least 1 characters!")
      .required("Amount is required!"),

    comment: Yup.string()
      .min(3, "Comment must be at least 3 characters!")
      .max(14, "Comment must be less than 14 characters!")
      .required("Comment is required!"),
  });
