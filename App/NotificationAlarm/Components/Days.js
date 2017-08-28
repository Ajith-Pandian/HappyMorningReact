import React, { Component } from "react";
import { TouchableOpacity, Text } from "react-native";

export default class Days extends Component {
  constructor(props) {
    super(props);
    this.state = { isSelected: props.isSelected };
  }
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
        style={{ marginLeft: 2, marginRight: 2 }}
      >
        <Text
          style={{
            marginLeft: 2,
            marginRight: 2,
            color: isSelected ? "blue" : "black"
          }}
        >
          {value}
        </Text>
      </TouchableOpacity>
    );
  }
}
