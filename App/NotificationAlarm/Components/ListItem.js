import React, { Component } from "react";
import { TouchableOpacity, Text, Switch, View, Dimensions } from "react-native";
import DaysSelector from "./DaysSelector";
import {
  modifyAlarm,
  deleteAlarm,
  modifyAlarmActive,
  modifyAlarmRepeat,
  modifyAlarmVibrate,
  modifyAlarmDays
} from "../../Actions/AlarmActions";
import { showTimePickerWithTime } from "../../Actions/TimePickerActions";
import { connect } from "react-redux";

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };
  }
  render() {
    let {
      alarm,
      index,
      modifyAlarm,
      modifyAlarmDays,
      deleteAlarm,
      modifyAlarmRepeat,
      modifyAlarmVibrate,
      modifyAlarmActive,
      showTimePickerWithTime
    } = this.props;
    let { alarmTime, time, days, vibrate, repeat, isActive } = alarm;
    let { isExpanded } = this.state;
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
          <TouchableOpacity
            onPress={() => showTimePickerWithTime(alarm, alarmTime)}
          >
            <Text style={{ color: "black", fontSize: 30 }}>
              {time}
            </Text>
          </TouchableOpacity>
          <Switch
            onValueChange={value =>
              this.setState({ switchValue: value }, () =>
                modifyAlarmActive(alarm, value)
              )}
            onTintColor="#49b1b2"
            value={isActive}
          />
        </View>

        <View>
          <DaysSelector
            days={days}
            isExpanded={isExpanded}
            isVibrate={vibrate}
            isRepeat={repeat}
            onDaysChange={(daysIndex, value) =>
              modifyAlarmDays(alarm, daysIndex, value)}
            onDelete={() => deleteAlarm(alarm.id)}
            onRepeatChange={value => modifyAlarmRepeat(alarm, value)}
            onVibrateChange={value => modifyAlarmVibrate(alarm, value)}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
const mapStateToProps = ({ TimePickerReducer }) => {
  let { modifyAlarm } = TimePickerReducer;
  return {
    modifyAlarm
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  modifyAlarmDays: (alarm, daysIndex, value) => {
    dispatch(modifyAlarmDays(alarm, daysIndex, value));
  },
  deleteAlarm: id => {
    dispatch(deleteAlarm(id));
  },
  modifyAlarmRepeat: (alarm, value) => {
    dispatch(modifyAlarmRepeat(alarm, value));
  },
  modifyAlarmVibrate: (alarm, value) => {
    dispatch(modifyAlarmVibrate(alarm, value));
  },
  modifyAlarmActive: (alarm, value) => {
    dispatch(modifyAlarmActive(alarm, value));
  },
  showTimePickerWithTime: (modifyAlarm, newDate) => {
    dispatch(showTimePickerWithTime(modifyAlarm, newDate));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
