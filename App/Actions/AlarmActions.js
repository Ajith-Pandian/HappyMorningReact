import {
  CREATE_ALARM,
  MODIFY_ALARM_TIME,
  MODIFY_ALARM_ACTIVE,
  MODIFY_ALARM_VIBRATE,
  MODIFY_ALARM_REPEAT,
  MODIFY_ALARM_DAYS,
  DELETE_ALARM
} from "../Constants";
import AlarmModel from "../Models/AlarmModel";
import { getTimeString } from "../Utils";
import { createNotification, deleteNotification } from "./NotificationActions";

export function addAlarm(date) {
  return dispatch => {
    let time = getTimeString(date);
    let alarm = new AlarmModel("Alarm", date, time);
    dispatch(createNotification(alarm.id, date));
    dispatch(_createAlarm(alarm));
  };
}

export function modifyAlarmTime(alarm, value) {
  return dispatch => {
    let time = getTimeString(value);
    dispatch(_modifyAlarmTime(alarm, value, time));
  };
}

export function modifyAlarmActive(alarm, value) {
  return dispatch => {
    dispatch(_modifyAlarmActive(alarm, value));
  };
}

export function modifyAlarmRepeat(alarm, value) {
  return dispatch => {
    dispatch(_modifyAlarmRepeat(alarm, value));
  };
}

export function modifyAlarmVibrate(alarm, value) {
  return dispatch => {
    dispatch(_modifyAlarmVibrate(alarm, value));
  };
}

export function modifyAlarmDays(alarm, dayIndex, value) {
  return dispatch => {
    dispatch(_modifyAlarmDays(alarm, dayIndex, value));
  };
}

export function deleteAlarm(id) {
  return dispatch => {
    dispatch(deleteNotification(id.toString()));
    dispatch(_deleteAlarm(id));
  };
}

function getAlarm(alarms, id) {
  return alarms.filter(alarm => alarm.id === id);
}
_createAlarm = alarm => {
  return { type: CREATE_ALARM, alarm };
};

_modifyAlarmTime = (alarm, value, time) => {
  return {
    type: MODIFY_ALARM_TIME,
    alarm,
    value,
    time
  };
};

_modifyAlarmActive = (alarm, value) => {
  return {
    type: MODIFY_ALARM_ACTIVE,
    alarm,
    value
  };
};

_modifyAlarmVibrate = (alarm, value) => {
  return {
    type: MODIFY_ALARM_VIBRATE,
    alarm,
    value
  };
};

_modifyAlarmRepeat = (alarm, value) => {
  return {
    type: MODIFY_ALARM_REPEAT,
    alarm,
    value
  };
};

_modifyAlarmDays = (alarm, dayIndex, value) => {
  return {
    type: MODIFY_ALARM_DAYS,
    alarm,
    dayIndex,
    value
  };
};

_deleteAlarm = id => {
  return {
    type: DELETE_ALARM,
    id
  };
};
