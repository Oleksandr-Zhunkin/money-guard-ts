import { SelectState } from "../../types/types";
import { CurrencyRate } from "../../types/types";
export const selectMono = (state: SelectState): CurrencyRate[] =>
  state.mono.mono;
export const selectData = (state: SelectState): number | null =>
  state.mono.data_mono;
