import {
  Action,
  Dispatch,
  Reducer,
  ThunkDispatch,
  UnknownAction,
  configureStore,
} from "@reduxjs/toolkit";
import { reducer } from "./reducer";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import { RESET_STORE } from "./provider/rsetStoreProvider";

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const rootReducer: Reducer = (state: RootState, action: Action) => {
  if (action.type === RESET_STORE) state = undefined;
  return reducer(state, action);
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export const reduxStore = configureStore({
  reducer: persistedReducer,
  middleware: (getdefaultmiddleware) =>
    getdefaultmiddleware({
      serializableCheck: false,
    }),
});

export const getStore = (): {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  dispatch: ThunkDispatch<any, undefined, UnknownAction> &
    Dispatch<UnknownAction>;
  state: RootState;
} => {
  const state: RootState = reduxStore.getState();
  const { dispatch } = reduxStore;
  return { dispatch, state };
};

export const persistor = persistStore(reduxStore);
