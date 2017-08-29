import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import DateTimePicker from "react-native-modal-datetime-picker";
import PushNotification from "react-native-push-notification";
import { sortByKey } from "../Utils";
import { ListItem } from "./Components";
import AlarmModel from "../AlarmModel";
import AlarmDatabase from "../AlarmDatabase";
export default class App extends Component {
  state = {
    data: [],
    isDateTimePickerVisible: false
  };
  constructor() {
    super();
    PushNotification.configure({
      onRegister: function(token) {
        console.log("TOKEN:", token);
      },
      onNotification: function(notification) {
        console.log("NOTIFICATION:", notification);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      requestPermissions: true
    });
  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = selectedDate => {
    this.addAlarmItem(selectedDate);
    this._hideDateTimePicker();
  };
  addAlarmItem = date => {
    let currentEpochTime = date.getTime();
    let hours = date.getHours(),
      minutes = date.getMinutes();
    let isPM = hours >= 12;
    let isMidday = hours == 12;
    minutes = minutes >= 10 ? minutes : "0" + minutes;
    hours = hours - (isPM && !isMidday ? 12 : 0);
    hours = hours >= 10 ? hours : "0" + hours;
    let time = [hours, minutes].join(":") + (isPM ? " PM" : " AM");
    PushNotification.localNotificationSchedule({
      //title: "My Notification Title",
      message: "Alarm @ " + time,
      //  playSound: false,
      //soundName: "default",
      date,
      //alertAction: "Cancel",
      number: 0
    });
    let alarm = new AlarmModel("Alarm", date, time, "MON");
    console.log(alarm);
    //AlarmDatabase.save(alarm);
    //  console.log(AlarmDatabase.findAll(true));
    this.setState(
      prevState => {
        let { data } = prevState;
        return {
          data: data.concat({
            key: data.key ? data.key + 1 : 0,
            time
          })
        };
      },
      state => console.log(this.state)
    );
  };

  render() {
    let { data } = this.state;
    //index % 2 === 0
    let { container, iconCircle, iconButton } = styles;
    return (
      <View style={container}>
        {data && data.length > 0
          ? <FlatList
              data={data}
              renderItem={({ item, index }) => {
                return <ListItem time={item.time} isOn={false} index={index} />;
              }}
            />
          : <Text>No Alarms</Text>}
        <TouchableOpacity
          style={iconButton}
          activeOpacity={0.5}
          onPress={() => this._showDateTimePicker()}
        >
          <View style={iconCircle}>
            <Icon
              name={"add"}
              size={30}
              color="#01a699"
              style={{ backgroundColor: "transparent" }}
            />
          </View>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode={"time"}
          date={new Date()}
          titleIOS={"Pick Time"}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#49b1b2"
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 100
  },
  iconButton: {
    position: "absolute",
    width: 60,
    height: 60,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    bottom: 0
  }
});
App.navigationOptions = {
  title: "HappyMorning",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#175e65"
  }
};
