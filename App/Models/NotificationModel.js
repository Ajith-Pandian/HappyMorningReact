export default class NotificationModel {
  constructor(id, title, message, date) {
    this.id = id;
    this.title = title;
    this.message = message;
    this.date = date || new Date();
  }
}
