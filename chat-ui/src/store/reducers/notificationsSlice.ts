import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Notification } from "../interface/notification";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: [] as Notification[],
  reducers: {
    setNotifications: (
      state,
      action: PayloadAction<Notification[]>
    ): Notification[] => {
      state = action.payload;
      return state;
    },
    updateNotifications: (
      state,
      action: PayloadAction<Notification>
    ): Notification[] => {
      if (
        state.find(
          (notification: Notification) =>
            notification.chatId === action.payload.chatId
        )
      )
        return state;
      state = [...state, action.payload];
      return state;
    },
    deleteNotification: (
      state,
      action: PayloadAction<Notification>
    ): Notification[] => {
      state = state.filter(
        (item: Notification) => item.chatId !== action.payload.chatId
      );
      return state;
    },
  },
});

export default notificationSlice.reducer;

const { setNotifications, updateNotifications, deleteNotification } =
  notificationSlice.actions;
export { setNotifications, updateNotifications, deleteNotification };
