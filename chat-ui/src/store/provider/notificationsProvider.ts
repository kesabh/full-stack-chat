import { Notification } from "../interface/notification";
import {
  deleteNotification,
  setNotifications,
  updateNotifications,
} from "../reducers/notificationsSlice";
import { getStore } from "../store";

export const notificationsProvider = (): {
  setNotifications: (notifications: Notification[]) => {
    payload: Notification[];
    type: "notifications/setNotifications";
  };
  updateNotifications: (notification: Notification) => {
    payload: Notification;
    type: "notifications/updateNotifications";
  };
  deleteNotification: (notification: Notification) => {
    payload: Notification;
    type: "notifications/deleteNotification";
  };
} => {
  const { dispatch } = getStore();
  return {
    setNotifications: (
      notifications: Notification[]
    ): { payload: Notification[]; type: "notifications/setNotifications" } =>
      dispatch(setNotifications(notifications)),
    updateNotifications: (
      notification: Notification
    ): { payload: Notification; type: "notifications/updateNotifications" } =>
      dispatch(updateNotifications(notification)),
    deleteNotification: (
      notification: Notification
    ): { payload: Notification; type: "notifications/deleteNotification" } =>
      dispatch(deleteNotification(notification)),
  };
};
