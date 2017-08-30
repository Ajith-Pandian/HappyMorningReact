import React, { Component } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Actions from "./Actions";
import Days from "./Days";

const days = [
  { id: 1, name: "S", selected: true },
  { id: 2, name: "M", selected: true },
  { id: 3, name: "T", selected: true },
  { id: 4, name: "W", selected: true },
  { id: 5, name: "T", selected: true },
  { id: 6, name: "F", selected: true },
  { id: 7, name: "S", selected: true }
];
export default class DaysSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedDays: days };
  }
  render() {
    let { isExpanded } = this.props;
    let { selectedDays } = this.state;
    let daysList = selectedDays.map((day, index) => {
      return (
        <TouchableOpacity key={index}>
          <Days
            value={day.name}
            isSelected={day.selected}
            onValueChange={value => {
              this.setState(prevState => {
                let selectedDays = prevState.selectedDays;
                selectedDays[index].selected = value;
                return {
                  selectedDays
                };
              });
            }}
          />
        </TouchableOpacity>
      );
    });
    let visibleDays = selectedDays.filter(days => days.selected == true);
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
        {isExpanded ? <Actions /> : false}
      </View>
    );
  }
}
