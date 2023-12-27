import { User } from "../interface/user";
import { setUserDetails } from "../reducers/userSlice";
import { getStore } from "../store";

export const userProvider = (): {
  setUserDetails: (userDetails: User) => {
    payload: User;
    type: "user/setUserDetails";
  };
} => {
  const { dispatch } = getStore();
  return {
    setUserDetails: (
      userDetails: User
    ): { payload: User; type: "user/setUserDetails" } =>
      dispatch(setUserDetails(userDetails)),
  };
};
