import { RootState } from "../store";

export const selectMono = (state: RootState) => state.rootReducer.mono.mono;

export const selectData = (state: RootState) =>
  state.rootReducer.mono.data_mono;
