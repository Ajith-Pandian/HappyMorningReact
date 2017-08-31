import { combineReducers } from "redux";

import AlarmsReducer from "./AlarmReducer";

const rootReducer = combineReducers({ AlarmsReducer });

export default rootReducer;
