import {
  SHOW_TIME_PICKER,
  ON_TIME_PICKED,
  HIDE_TIME_PICKER,
  SHOW_TIME_PICKER_WITH_TIME
} from "../Constants";
import AlarmModel from "../Models/AlarmModel";

export function showTimePicker() {
  return (dispatch, getState) => {
    dispatch(_showTimePicker());
  };
}
export function showTimePickerWithTime(modifyAlarm, time) {
  return (dispatch, getState) => {
    dispatch(_showTimePickerWithTime(modifyAlarm, time));
  };
}
export function onTimePicked(time) {
  return (dispatch, getState) => {
    dispatch(_onTimePicked(time));
  };
}
export function hideTimePicker() {
  return (dispatch, getState) => {
    dispatch(_hideTimePicker());
  };
}

function _showTimePicker() {
  return {
    type: SHOW_TIME_PICKER
  };
}

function _showTimePickerWithTime(modifyAlarm, time) {
  return {
    type: SHOW_TIME_PICKER_WITH_TIME,
    time,
    modifyAlarm
  };
}

function _onTimePicked(time) {
  return {
    type: ON_TIME_PICKED,
    time
  };
}

function _hideTimePicker() {
  return {
    type: HIDE_TIME_PICKER
  };
}
