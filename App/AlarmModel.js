import { getRandomId } from "./Utils";

const ALL_DAYS = [
  { id: 1, name: "S", selected: false },
  { id: 2, name: "M", selected: false },
  { id: 3, name: "T", selected: false },
  { id: 4, name: "W", selected: false },
  { id: 5, name: "T", selected: false },
  { id: 6, name: "F", selected: false },
  { id: 7, name: "S", selected: false }
];

export default class AlarmModel {
  constructor(title, alarmTime, visibleTime, days, repeat, vibrate, isActive) {
    this.id = getRandomId();
    this.title = title;
    this.alarmTime = alarmTime;
    this.time = visibleTime;
    this.days = days || ALL_DAYS;
    this.repeat = repeat || false;
    this.vibrate = vibrate || false;
    this.isActive = isActive || false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
