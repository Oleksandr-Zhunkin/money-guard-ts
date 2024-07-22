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
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { monoReducer } from "./currency/slice";
import { categoriesReducer } from "./categories/slice";
import { transactionsReducer } from "./transactions/slice";
import { PersistConfig } from "redux-persist";

import { UserState } from "../types/types";  
import { MonoState } from "../types/types"; 

const authPersistConfig: PersistConfig<UserState> = {
  key: "auth",
  version: 1,
  storage,
  whitelist: ["token"],
};


const monoPersistConfig: PersistConfig<MonoState> = {
  key: "mono",
  version: 1,
  storage,
  whitelist: ["data_mono", "mono"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    mono: persistReducer(monoPersistConfig, monoReducer),
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

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
