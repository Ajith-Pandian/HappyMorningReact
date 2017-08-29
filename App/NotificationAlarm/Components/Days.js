import React, { Component } from "react";
import { TouchableOpacity, Text } from "react-native";

export default class Days extends Component {
  constructor(props) {
    super(props);
    this.state = { isSelected: props.isSelected };
  }
  getBackgroundStyle = isSelected => {
    return isSelected
      ? {
          borderRadius: 100,
          backgroundColor: "#7049b3",
          color: "white"
        }
      : {};
  };
  render() {
    let { value, onValueChange } = this.props;
    let { isSelected } = this.state;
    return (
      <TouchableOpacity
        onPress={() =>
          this.setState(
            prevState => {
              return { isSelected: !prevState.isSelected };
            },
            () => onValueChange(this.state.isSelected)
          )}
        style={[
          {
            marginLeft: 4,
            marginRight: 4
          }
        ]}
      >
        <Text
          style={[
            {
              flex: 1,
              textAlignVertical: "center",
              textAlign: "center",
              height: 30,
              width: 30
            },
            this.getBackgroundStyle(isSelected)
          ]}
        >
          {value}
        </Text>
      </TouchableOpacity>
    );
  }
}
