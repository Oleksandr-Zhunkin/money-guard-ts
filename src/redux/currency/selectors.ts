import { RootState } from "../store";
import { CurrencyData } from "../../types/types"; // t

export const selectMono = (state: RootState): CurrencyData[] =>
  state.rootReducer.mono.mono;
export const selectData = (state: RootState): number | null =>
  state.rootReducer.mono.data_mono;
