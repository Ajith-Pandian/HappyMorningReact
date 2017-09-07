import {
  CONFIGURE_NOTIFICATION,
  CREATE_NOTIFICATION,
  MODIFY_NOTIFICATION,
  DELETE_NOTIFICATION
} from "../Constants";
import NotificationModel from "../Models/NotificationModel";
import { getTimeString } from "../Utils";
import PushNotification from "react-native-push-notification";

export const configureNotification = () => {
  setupNotification();
  return dispatch => {
    dispatch(_configureNotification());
  };
};

setupNotification = () => {
  PushNotification.configure({
    onRegister: function(token) {
      console.log("TOKEN:", token);
    },
    onNotification: function(notification) {
      console.log("NOTIFICATION:", notification);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true
    },
    requestPermissions: true
  });
};
cancelNotification = id => {
  PushNotification.cancelLocalNotifications({ id });
};
scheduleNotification = notification => {
  PushNotification.localNotificationSchedule(notification);
};
export function createNotification(id, date) {
  let time = getTimeString(date);
  let notification = new NotificationModel(
    id.toString(),
    "HappyMorning",
    "Alarm @ " + time,
    date
  );
  scheduleNotification(notification);
  return dispatch => {
    dispatch(_createNotification(notification));
  };
}

export function modifyNotification(notification, value) {
  cancelNotification(notification.id);
  scheduleNotification(notification);
  return dispatch => {
    dispatch(_modifyNotification(notification));
  };
}

export function deleteNotification(id) {
  return dispatch => {
    cancelNotification(id);
    dispatch(_deleteNotification(id));
  };
}
_configureNotification = () => {
  return {
    type: CONFIGURE_NOTIFICATION
  };
};
_createNotification = notification => {
  return {
    type: CREATE_NOTIFICATION,
    notification
  };
};

_modifyNotification = (notification, value) => {
  return {
    type: MODIFY_NOTIFICATION,
    notification,
    value
  };
};

_deleteNotification = id => {
  return {
    type: DELETE_NOTIFICATION,
    id
  };
};
