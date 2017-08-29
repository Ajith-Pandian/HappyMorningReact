import { getRandomId } from "./Utils";

export default class AlarmModel {
  constructor(title, alarmTime, visibleTime, days, repeat, vibrate, isActive) {
    this.id = getRandomId();
    this.title = title;
    this.alarmTime = alarmTime;
    this.time = visibleTime;
    this.days = "";
    this.repeat = repeat || false;
    this.vibrate = vibrate || false;
    this.isActive = isActive || false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
