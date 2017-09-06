import { getRandomId } from "../Utils";

export default class NotificationModel {
  constructor(title, message, date) {
    this.id = getRandomId();
    this.title = title;
    this.message = message;
    this.date = date || new Date();
  }
}
