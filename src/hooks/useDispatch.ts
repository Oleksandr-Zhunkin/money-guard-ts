import { useDispatch, useSelector, useStore } from "react-redux";
import type {
  AppDispatch,
  // persistor,
  RootState,
} from "../redux/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
// export const useAppStore = useStore.withTypes<persistor>();
