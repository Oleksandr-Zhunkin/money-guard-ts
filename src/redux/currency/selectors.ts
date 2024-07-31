import { RootState } from "../store";
import { CurrencyData } from "../../types/types"; // t

export const selectMono = (state: RootState): CurrencyData[] => state.mono.mono;
export const selectData = (state: RootState): number | null =>
  state.mono.data_mono;
