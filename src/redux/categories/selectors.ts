import { RootState } from "../store";
import { ObjectCategory, SummaryObject } from "./slice";

export const selectCategories = (state: RootState): ObjectCategory[] =>
  state.rootReducer.categories.categories;
export const selectSummary = (state: RootState): SummaryObject | null =>
  state.rootReducer.categories.summary;
