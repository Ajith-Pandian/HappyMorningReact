import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Platform,
  Switch,
  PushNotificationIOS
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import DateTimePicker from "react-native-modal-datetime-picker";
import PushNotification from "react-native-push-notification";
const unChecked = (
  <Icon name="check-box-outline-blank" size={30} color="#49b1b2" />
);
const checked = <Icon name="check-box" size={30} color="#49b1b2" />;
class CheckBox extends Component {
  state = { isChecked: false };
  render() {
    let { isChecked } = this.state;
    let { name, onValueChange } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.3}
        onPress={() => {
          this.setState(
            prevState => {
              return { isChecked: !prevState.isChecked };
            },
            () => onValueChange(this.state.isChecked)
          );
        }}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        {isChecked ? checked : unChecked}
        <Text>
          {name}
        </Text>
      </TouchableOpacity>
    );
  }
}
const Delete = () =>
  <TouchableOpacity
    activeOpacity={0.3}
    onPress={() => {
      console.log("Delete pressed");
    }}
    style={{ flexDirection: "row", alignItems: "center" }}
  >
    <Icon name="delete" size={30} color="#49b1b2" />
    <Text>Delete</Text>
  </TouchableOpacity>;

class Actions extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: 4
        }}
      >
        <CheckBox
          style={{ flex: 33 }}
          name="Repeat"
          onValueChange={value => console.log("Repeat " + value)}
        />
        <CheckBox
          style={{ flex: 33 }}
          name="Vibrate"
          onValueChange={value => console.log("Vibrate " + value)}
        />
        <Delete style={{ flex: 33 }} />
      </View>
    );
  }
}
class Days extends Component {
  constructor() {
    super();
    this.state = { isSelected: false };
  }
  render() {
    let { value, onValueChange } = this.props;
    let { isSelected } = this.state;
    return (
      <TouchableOpacity
        onPress={() =>
          this.setState(
            prevState => {
              return { isSelected: !prevState.isSelected };
            },
            () => onValueChange(this.state.isSelected)
          )}
        style={{ marginLeft: 2, marginRight: 2 }}
      >
        <Text
          style={{
            marginLeft: 2,
            marginRight: 2,
            color: isSelected ? "blue" : "black"
          }}
        >
          {value}
        </Text>
      </TouchableOpacity>
    );
  }
}

class DaysSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedDays: [] };
  }
  render() {
    const days = [
      { id: 1, name: "MON" },
      { id: 2, name: "TUE" },
      { id: 3, name: "WED" },
      { id: 4, name: "THU" },
      { id: 5, name: "FRI" },
      { id: 6, name: "SAT" },
      { id: 7, name: "SUN" }
    ];
    let { onDaysChange } = this.props;
    let daysList = days.map(({ name }, index) =>
      <TouchableOpacity key={index}>
        <Days
          value={name}
          onValueChange={value => {
            console.log(`Date ${name} selected ${value}`);
            if (value) {
              this.setState(
                prevState => {
                  let newArray = prevState.selectedDays.slice();
                  newArray.push(name);
                  return {
                    selectedDays: newArray
                  };
                },
                () => {
                  onDaysChange(this.state.selectedDays);
                }
              );
            } else {
              this.setState(
                prevState => {
                  let newArray = prevState.selectedDays.slice();
                  var index = newArray.indexOf(name);
                  return {
                    selectedDays:
                      index > -1 ? newArray.splice(index, 1) : newArray
                  };
                },
                () => {
                  onDaysChange(this.state.selectedDays);
                }
              );
            }
          }}
        />
      </TouchableOpacity>
    );
    return (
      <View style={{ margin: 8 }}>
        <View style={{ flexDirection: "row" }}>
          {daysList}
        </View>
        <Actions />
      </View>
    );
  }
}
class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchValue: props.isOn,
      isExpanded: false,
      selectedDays: []
    };
  }
  render() {
    let { time, index, timeDifference } = this.props;
    let { isExpanded, selectedDays } = this.state;
    let isEvenItem = index % 2 === 0;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          this.setState(prevState => {
            return { isExpanded: !prevState.isExpanded };
          })}
        style={{
          width: Dimensions.get("window").width,
          backgroundColor: isEvenItem ? "#dddddd" : "white",
          padding: 10
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Text style={{ color: "black", fontSize: 30 }}>
            {time}
          </Text>
          <Switch
            onValueChange={value => this.setState({ switchValue: value })}
            onTintColor="#49b1b2"
            value={this.state.switchValue}
          />
        </View>
        {isExpanded
          ? <View>
              <DaysSelector
                selectedDays={selectedDays}
                onDaysChange={selectedDays => this.setState({ selectedDays })}
              />
            </View>
          : selectedDays && selectedDays.length > 0
            ? <View style={{ flexDirection: "row" }}>
                {selectedDays.map((day, index) =>
                  <Text style={{ margin: 2 }} key={index}>
                    {day}
                  </Text>
                )}
              </View>
            : <Text style={{ margin: 2 }}>EveryDay</Text>}
        <Text style={{ margin: 2 }}>
          Time Remaining : {timeDifference}
        </Text>
      </TouchableOpacity>
    );
  }
}
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
      // IOS ONLY (optional): default: all - Permissions to register.
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
    // let now = new Date().getTime();
    // let timeDifference = selectedDate.getTime() - now;
    // console.log(
    //   "timeDifference " + Math.round(timeDifference / 1000) + " seconds"
    // );
    this.addAlarmItem(selectedDate);
    this._hideDateTimePicker();
  };
  addAlarmItem = date => {
    let currentEpochTime = date.getTime();
    let currentTime = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    });
    console.log(date);
    PushNotification.localNotificationSchedule({
      //  title: "My Notification Title",
      message: "My Notification Message",
      //  playSound: false,
      //soundName: "default",
      date,
      //alertAction: "Cancel",
      number: 0
    });
    console.log(currentTime);
    this.setState(
      prevState => {
        return {
          data: prevState.data.concat({
            key: currentEpochTime,
            time: currentTime
          })
        };
      },
      state => console.log(this.state)
    );
  };
  scheduleIosNotification = () => {
    console.log("Notification schdule");
    //  PushNotificationIOS.scheduleLocalNotification({
    //    fireDate: new Date(Date.now() + 10 * 1000),
    //    alertBody: "ScheduledNotification"
    //  });
    PushNotification.localNotificationSchedule({
      //  title: "My Notification Title",
      message: "My Notification Message",
      //  playSound: false,
      //soundName: "default",
      date: new Date(Date.now() + 10 * 1000),
      //alertAction: "Cancel",
      number: 0
    });
  };
  render() {
    let { data } = this.state;
    //index % 2 === 0

    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#49b1b2"
        }}
      >
        {data && data.length > 0
          ? <FlatList
              data={data}
              renderItem={({ item, index }) => {
                return (
                  <ListItem
                    time={item.time}
                    timeDifference={item.timeDifference}
                    isOn={false}
                    index={index}
                  />
                );
              }}
            />
          : <Text>No Alrams</Text>}
        <TouchableOpacity
          style={{
            margin: 10,
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.2)",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            backgroundColor: "#fff",
            borderRadius: 100,
            position: "absolute",
            bottom: 0
          }}
          onPress={() => this._showDateTimePicker()}
        >
          <Icon
            name={"add"}
            size={30}
            color="#01a699"
            style={{ backgroundColor: "transparent" }}
          />
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
App.navigationOptions = {
  title: "HappyMorning",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#175e65"
  }
};
