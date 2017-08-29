import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import Actions from "./Actions";
import Days from "./Days";

export default class DaysSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedDays: props.selectedDays };
  }
  render() {
    const days = [
      { id: 1, name: "S" },
      { id: 2, name: "M" },
      { id: 3, name: "T" },
      { id: 4, name: "W" },
      { id: 5, name: "T" },
      { id: 6, name: "F" },
      { id: 7, name: "S" }
    ];
    let { onDaysChange, selectedDays } = this.props;
    let daysList = days.map((days, index) =>
      <TouchableOpacity key={index}>
        <Days
          value={days.name}
          isSelected={
            selectedDays &&
            selectedDays.length > 0 &&
            selectedDays.indexOf(days.id) >= 0
          }
          onValueChange={value => {
            console.log(`Date ${days.id} selected ${value}`);
            if (value) {
              this.setState(
                prevState => {
                  let newArray = prevState.selectedDays.slice();
                  newArray.push(days.name);
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
                  var index = newArray.indexOf(days.name);
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
