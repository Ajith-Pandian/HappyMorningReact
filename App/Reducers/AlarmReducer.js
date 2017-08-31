import { CREATE_ALARM, MODIFY_ALRAM, DELETE_ALRAM } from "../Constants";

const initialState = {
  alarms: []
};

export default function AlarmReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ALARM:
      return {
        ...state,
        alarms: state.alarms.concat(action.alarm)
      };
    case MODIFY_ALRAM:
      return {
        ...state
      };
    case DELETE_ALRAM:
      return {
        ...state,
        alarms: state.alarms.filter(alarm => action.id !== alarm.id)
      };

    default:
      return state;
  }
}
