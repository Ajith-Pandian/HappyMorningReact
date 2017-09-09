import { combineReducers } from "redux";
import AlarmReducer from "./AlarmReducer";
import PersistReducer from "./PersistReducer";
import TimePickerReducer from "./TimePickerReducer";
import NotificationReducer from "./NotificationReducer";

const getRootReducer = navReducer =>
  combineReducers({
    nav: navReducer,
    AlarmReducer,
    TimePickerReducer,
    NotificationReducer,
    PersistReducer
  });

export default getRootReducer;
