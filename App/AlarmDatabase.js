import Realm from "realm";
const ALARM = "Alarm";

const alarmRealm = new Realm({
  schema: [
    {
      name: ALARM,
      primaryKey: "id",
      properties: {
        id: { type: "string", indexed: true },
        title: "string",
        alarmTime: "date",
        time: "string",
        repeat: "bool",
        vibrate: "bool",
        isActive: "bool",
        createdAt: "date",
        updatedAt: "date"
      }
    }
  ]
});

export default class AlarmService {
  static findAll(sortBy) {
    if (!sortBy) sortBy = [["completed", false], ["updatedAt", true]];
    return alarmRealm.objects(ALARM).sorted(sortBy);
  }

  static save(alarm) {
    alarmRealm.write(() => {
      alarm.updatedAt = new Date();
      alarmRealm.create(ALARM, alarm);
    });
  }

  static update(alarm, callback) {
    if (!callback) return;
    alarmRealm.write(() => {
      callback();
      alarm.updatedAt = new Date();
    });
  }
}
