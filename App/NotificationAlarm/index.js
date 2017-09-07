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
import { addAlarm, modifyAlarmTime } from "../Actions/AlarmActions";
import { configureNotification } from "../Actions/NotificationActions";
import {
  showTimePicker,
  hideTimePicker,
  onTimePicked
} from "../Actions/TimePickerActions";
import { getTimeString } from "../Utils";
import { ListItem } from "./Components";
import AlarmModel from "../Models/AlarmModel";
import AlarmDatabase from "../AlarmDatabase";

class App extends Component {
  state = {
    data: []
  };
  constructor(props) {
    super(props);
    props._configureNotification();
  }
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
    console.log("Alarm with date" + date);
    this.props._createAlarm(date);
    //AlarmDatabase.save(alarm);
    //  console.log(AlarmDatabase.findAll(true));
  };

  render() {
    let {
      alarms,
      time,
      modifyAlarm,
      isModification,
      timePickerVisible,
      _showTimePicker,
      _hideTimePicker,
      _modifyAlarmTime,
      _onTimePicked
    } = this.props;
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
          onPress={() => _showTimePicker()}
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
          isVisible={timePickerVisible}
          onConfirm={selectedDate => {
            _onTimePicked(selectedDate);
            if (isModification) _modifyAlarmTime(modifyAlarm, selectedDate);
            else this.addAlarmItem(selectedDate);
          }}
          onCancel={() => _hideTimePicker()}
          mode={"time"}
          date={isModification ? time : new Date()}
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

const mapStateToProps = state => {
  let { AlarmReducer, TimePickerReducer } = state;
  let { alarms } = AlarmReducer;
  let {
    timePickerVisible,
    time,
    isModification,
    modifyAlarm
  } = TimePickerReducer;
  return {
    alarms,
    timePickerVisible,
    time,
    isModification,
    modifyAlarm
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  _configureNotification: () => {
    dispatch(configureNotification());
  },
  _createAlarm: date => {
    dispatch(addAlarm(date));
  },
  _showTimePicker: () => {
    dispatch(showTimePicker());
  },
  _onTimePicked: time => {
    dispatch(onTimePicked(time));
  },
  _hideTimePicker: () => {
    dispatch(hideTimePicker());
  },
  _modifyAlarmTime: (modifyAlarm, newDate) => {
    dispatch(modifyAlarmTime(modifyAlarm, newDate));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
