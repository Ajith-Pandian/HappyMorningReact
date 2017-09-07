import { combineReducers } from "redux";

import AlarmReducer from "./AlarmReducer";
import TimePickerReducer from "./TimePickerReducer";
import NotificationReducer from "./NotificationReducer";

const rootReducer = combineReducers({
  AlarmReducer,
  TimePickerReducer,
  NotificationReducer
});

export default rootReducer;
