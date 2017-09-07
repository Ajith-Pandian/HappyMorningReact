import {
  CONFIGURE_NOTIFICATION,
  CREATE_NOTIFICATION,
  MODIFY_NOTIFICATION,
  DELETE_NOTIFICATION
} from "../Constants";
let initialState = {
  notifications: []
};
export default function NotificationReducer(state = initialState, action) {
  switch (action.type) {
    case CONFIGURE_NOTIFICATION:
      return {
        ...state
      };
    case CREATE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.concat(action.notification)
      };
    case MODIFY_NOTIFICATION:
      let { notification } = action;
      let index = state.alarms.indexOf(notification);
      return update(state, {
        alarms: {
          [index]: { $set: notification }
        }
      });
    case DELETE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => action.id !== notification.id
        )
      };
    default:
      return state;
  }
}
