import {
  CREATE_ALARM,
  MODIFY_ALARM_ACTIVE,
  MODIFY_ALARM_VIBRATE,
  MODIFY_ALARM_REPEAT,
  MODIFY_ALARM_DAYS,
  DELETE_ALARM
} from "../Constants";
import AlarmModel from "../AlarmModel";
import { getTimeString } from "../Utils";

export function addAlarm(date) {
  return (dispatch, getState) => {
    let time = getTimeString(date);
    let alarm = new AlarmModel("Alarm", date, time);
    dispatch(_createAlarm(alarm));
  };
}

export function modifyAlarmActive(alarm, value) {
  return (dispatch, getState) => {
    dispatch(_modifyAlarmActive(alarm, value));
  };
}

export function modifyAlarmRepeat(alarm, value) {
  return (dispatch, getState) => {
    dispatch(_modifyAlarmRepeat(alarm, value));
  };
}

export function modifyAlarmVibrate(alarm, value) {
  return (dispatch, getState) => {
    dispatch(_modifyAlarmVibrate(alarm, value));
  };
}

export function modifyAlarmDays(alarm, dayIndex, value) {
  return (dispatch, getState) => {
    dispatch(_modifyAlarmDays(alarm, dayIndex, value));
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

export function _modifyAlarmActive(alarm, value) {
  return {
    type: MODIFY_ALARM_ACTIVE,
    alarm,
    value
  };
}

export function _modifyAlarmVibrate(alarm, value) {
  return {
    type: MODIFY_ALARM_VIBRATE,
    alarm,
    value
  };
}

export function _modifyAlarmRepeat(alarm, value) {
  return {
    type: MODIFY_ALARM_REPEAT,
    alarm,
    value
  };
}

export function _modifyAlarmDays(alarm, dayIndex, value) {
  return {
    type: MODIFY_ALARM_DAYS,
    alarm,
    dayIndex,
    value
  };
}

export function _deleteAlarm(id) {
  return {
    type: DELETE_ALARM,
    id
  };
}
