import {
  SHOW_TIME_PICKER,
  HIDE_TIME_PICKER,
  ON_TIME_PICKED,
  SHOW_TIME_PICKER_WITH_TIME
} from "../Constants";
import update from "immutability-helper";
let initialState = {
  timePickerVisible: false,
  time: "",
  modifyAlarm: {},
  isModification: false
};
export default function TimePickerReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_TIME_PICKER:
      return {
        ...state,
        isModification: false,
        timePickerVisible: true
      };
    case SHOW_TIME_PICKER_WITH_TIME:
      return {
        ...state,
        time: action.time,
        modifyAlarm: action.modifyAlarm,
        isModification: true,
        timePickerVisible: true
      };
    case ON_TIME_PICKED:
      return {
        ...state,
        time: action.time,
        isModification: false,
        timePickerVisible: false
      };
    case HIDE_TIME_PICKER:
      return {
        ...state,
        timePickerVisible: false
      };
    default:
      return state;
  }
}
