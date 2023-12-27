import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../interface/user";

const initialUserState: User = {
  name: "",
  email: "",
  profilePicture: "",
  userId: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<User>): User => {
      return { ...state, ...action.payload };
    },
  },
});

export default userSlice.reducer;
export const { setUserDetails } = userSlice.actions;
