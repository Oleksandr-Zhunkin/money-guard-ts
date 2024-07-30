import { RootState } from "../store";

export const selectMono = (state: RootState) => state.mono.mono;

export const selectData = (state: RootState) => state.mono.data_mono;
