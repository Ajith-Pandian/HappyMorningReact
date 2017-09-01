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
import { connect } from "react-redux";

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };
  }
  render() {
    let { alarm, index, dispatch } = this.props;
    let { time, days, vibrate, repeat, isActive } = alarm;
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
          <Text style={{ color: "black", fontSize: 30 }}>
            {time}
          </Text>
          <Switch
            onValueChange={value =>
              this.setState({ switchValue: value }, () =>
                dispatch(modifyAlarmActive(alarm, value))
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
              dispatch(modifyAlarmDays(alarm, daysIndex, value))}
            onDelete={() => dispatch(deleteAlarm(alarm.id))}
            onRepeatChange={value => dispatch(modifyAlarmRepeat(alarm, value))}
            onVibrateChange={value =>
              dispatch(modifyAlarmVibrate(alarm, value))}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect()(ListItem);
