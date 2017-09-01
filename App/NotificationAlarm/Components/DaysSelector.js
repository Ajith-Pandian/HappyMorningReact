import React, { Component } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Actions from "./Actions";
import Days from "./Days";

export default class DaysSelector extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      isExpanded,
      onDelete,
      onRepeatChange,
      onVibrateChange,
      isVibrate,
      isRepeat,
      onDaysChange,
      days
    } = this.props;
    let daysList = days.map((day, index) => {
      return (
        <TouchableOpacity key={index}>
          <Days
            value={day.name}
            isSelected={day.selected}
            onValueChange={value => {
              onDaysChange(index, value);
            }}
          />
        </TouchableOpacity>
      );
    });
    let visibleDays = days.filter(day => day.selected == true);
    let hasAllDays = visibleDays && visibleDays.length === 7;
    return (
      <View style={{ margin: 8 }}>
        {!isExpanded
          ? hasAllDays
            ? <Text style={{ margin: 2 }}>EveryDay</Text>
            : <View style={{ flexDirection: "row" }}>
                {visibleDays.map((days, index) =>
                  <Text key={index} style={{ margin: 2 }}>
                    {days.name}
                  </Text>
                )}
              </View>
          : <View style={{ flexDirection: "row" }}>
              {daysList}
            </View>}
        {isExpanded
          ? <Actions
              onDelete={() => onDelete()}
              isVibrate={isVibrate}
              isRepeat={isRepeat}
              onRepeatChange={value => onRepeatChange(value)}
              onVibrateChange={value => onVibrateChange(value)}
            />
          : false}
      </View>
    );
  }
}
