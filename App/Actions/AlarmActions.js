import { CREATE_ALARM, MODIFY_ALRAM, DELETE_ALRAM } from "../Constants";
import AlarmModel from "../AlarmModel";
import { getTimeString } from "../Utils";

export function addAlarm(date) {
  return (dispatch, getState) => {
    let time = getTimeString(date);
    let alarm = new AlarmModel("Alarm", date, time);
    dispatch(_createAlarm(alarm));
  };
}

export function modifyAlarm(id) {
  return (dispatch, getState) => {
    let alarm = getAlarm(getState().AlarmsReducer.alarms, id);
    console.log(alarm);
    dispatch(_modifyAlarm(alarm));
  };
}

export function deleteAlarm(id) {
  return dispatch => {
    dispatch(_deleteAlarm(id));
  };
}

function getAlarm(alarms, id) {
  return alarms.filter(alarm => alarm.id === id);
}

export function _createAlarm(alarm) {
  return {
    type: CREATE_ALARM,
    alarm
  };
}

export function _modifyAlarm(alarm) {
  return {
    type: MODIFY_ALRAM,
    alarm
  };
}

export function _deleteAlarm(id) {
  return {
    type: DELETE_ALRAM,
    id
  };
}
