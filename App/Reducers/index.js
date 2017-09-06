import { combineReducers } from "redux";

import AlarmsReducer from "./AlarmReducer";
import TimePickerReducer from "./TimePickerReducer";

const rootReducer = combineReducers({ AlarmsReducer, TimePickerReducer });

export default rootReducer;
