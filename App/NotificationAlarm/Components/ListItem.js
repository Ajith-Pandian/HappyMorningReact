import React, { Component } from "react";
import { TouchableOpacity, Text, Switch, View, Dimensions } from "react-native";
import DaysSelector from "./DaysSelector";

export default class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchValue: props.isOn,
      isExpanded: false,
    };
  }
  render() {
    let { time, index } = this.props;
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

        <View>
          <DaysSelector
            isExpanded={isExpanded}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
