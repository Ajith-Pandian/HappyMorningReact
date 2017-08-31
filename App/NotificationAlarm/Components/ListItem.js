import React, { Component } from "react";
import { TouchableOpacity, Text, Switch, View, Dimensions } from "react-native";
import DaysSelector from "./DaysSelector";
import { modifyAlarm, deleteAlarm } from "../../Actions/AlarmActions";
import { connect } from "react-redux";

class ListItem extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      switchValue: props.alarm.isActive,
      isExpanded: false
    };
  }
  render() {
    let { alarm, index, dispatch } = this.props;
    let { time, days } = alarm;
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
            onValueChange={value =>
              this.setState({ switchValue: value }, () =>
                dispatch(modifyAlarm(alarm.id))
              )}
            onTintColor="#49b1b2"
            value={this.state.switchValue}
          />
        </View>

        <View>
          <DaysSelector
            days={days}
            isExpanded={isExpanded}
            onDelete={() => dispatch(deleteAlarm(alarm.id))}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect()(ListItem);
