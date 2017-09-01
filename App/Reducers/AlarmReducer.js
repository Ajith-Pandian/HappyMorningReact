import {
  CREATE_ALARM,
  MODIFY_ALARM_ACTIVE,
  MODIFY_ALARM_VIBRATE,
  MODIFY_ALARM_REPEAT,
  MODIFY_ALARM_DAYS,
  DELETE_ALARM
} from "../Constants";
import update from "immutability-helper";

const initialState = {
  alarms: []
};
const updateAlarmState = (state, index, property, value) =>
  update(state, {
    alarms: { [index]: { [property]: { $set: value } } }
  });
export default function AlarmReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ALARM:
      return {
        ...state,
        alarms: state.alarms.concat(action.alarm)
      };
    case MODIFY_ALARM_ACTIVE: {
      let { alarm, value } = action;
      let index = state.alarms.indexOf(alarm);
      return updateAlarmState(state, index, "isActive", value);
    }
    case MODIFY_ALARM_VIBRATE: {
      let { alarm, value } = action;
      let index = state.alarms.indexOf(alarm);
      return updateAlarmState(state, index, "vibrate", value);
    }
    case MODIFY_ALARM_REPEAT: {
      let { alarm, value } = action;
      let index = state.alarms.indexOf(alarm);
      return updateAlarmState(state, index, "repeat", value);
    }
    case DELETE_ALARM:
      return {
        ...state,
        alarms: state.alarms.filter(alarm => action.id !== alarm.id)
      };
    default:
      return state;
  }
}
