import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  WebStorage,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { monoReducer } from "./currency/slice";
import { categoriesReducer } from "./categories/slice";
import { transactionsReducer } from "./transactions/slice";

interface Configure {
  key: string[] | string;
  version: number;
  storage: WebStorage;
  whitelist: string[];
}

const persistConfig: Configure = {
  key: "token",
  version: 1,
  storage,
  whitelist: ["token"],
};

const monoConfig: Configure = {
  key: ["data_mono", "mono"],
  version: 1,
  storage,
  whitelist: ["data_mono", "mono"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
    mono: persistReducer(monoConfig, monoReducer),
    categories: categoriesReducer,
    transactions: transactionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
