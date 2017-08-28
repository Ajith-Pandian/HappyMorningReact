import React, { Component } from "react";
import { TouchableOpacity, Text, Switch, View, Dimensions } from "react-native";
import DaysSelector from "./DaysSelector";

export default class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchValue: props.isOn,
      isExpanded: false,
      selectedDays: []
    };
  }
  render() {
    let { time, index } = this.props;
    let { isExpanded, selectedDays } = this.state;
    let isEvenItem = index % 2 === 0;
    console.log(selectedDays);
    let daysLength = selectedDays ? selectedDays.length : 0;
    let containDays = selectedDays && daysLength > 0;
    let hasSomeDays = containDays && daysLength < 7;
    let hasAllDays = containDays && daysLength === 7;
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
          : hasSomeDays
            ? <View style={{ flexDirection: "row" }}>
                {selectedDays.map((day, index) =>
                  <Text style={{ margin: 2 }} key={index}>
                    {day}
                  </Text>
                )}
              </View>
            : <Text style={{ margin: 2 }}>
                {hasAllDays ? "EveryDay" : "Today"}
              </Text>}
      </TouchableOpacity>
    );
  }
}
