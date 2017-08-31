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
import { connect } from "react-redux";
import { addAlarm } from "../Actions/AlarmActions";
import { getTimeString } from "../Utils";
import { ListItem } from "./Components";
import AlarmModel from "../AlarmModel";
import AlarmDatabase from "../AlarmDatabase";

class App extends Component {
  state = {
    data: [],
    isDateTimePickerVisible: false
  };
  constructor(props) {
    super(props);
    console.log(props);
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
    // PushNotification.localNotificationSchedule({
    //   //title: "My Notification Title",
    //   message: "Alarm @ " + time,
    //   //  playSound: false,
    //   //soundName: "default",
    //   date,
    //   //alertAction: "Cancel",
    //   number: 0
    // });
    console.log(date);
    this.props.createAlarm(date);
    //AlarmDatabase.save(alarm);
    //  console.log(AlarmDatabase.findAll(true));
  };

  render() {
    let { alarms } = this.props;
    let { container, iconCircle, iconButton } = styles;
    return (
      <View style={container}>
        {alarms && alarms.length > 0
          ? <FlatList
              data={alarms}
              renderItem={({ item, index }) =>
                <ListItem alarm={item} index={index} />}
              keyExtractor={(item, index) => index}
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

const mapStateToProps = state => ({
  alarms: state.AlarmsReducer.alarms
});

const mapDispatchToProps = (dispatch, props) => ({
  createAlarm: date => {
    dispatch(addAlarm(date));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
