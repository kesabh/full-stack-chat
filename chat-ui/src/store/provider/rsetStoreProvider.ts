import { getStore } from "../store";

export const RESET_STORE = "RESET_STORE";

export const resetStoreProvider = (): {
  resetStore: () => {
    type: string;
  };
} => {
  const { dispatch } = getStore();
  return {
    resetStore: (): {
      type: string;
    } => dispatch({ type: RESET_STORE }),
  };
};
