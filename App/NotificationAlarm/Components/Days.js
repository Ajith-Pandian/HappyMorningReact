import React, { Component } from "react";
import { TouchableOpacity, Text } from "react-native";

export default class Days extends Component {
  constructor(props) {
    super(props);
    this.state = { isSelected: props.isSelected };
  }
  getBackgroundStyle = isSelected => {
    let containerStyle = {
      borderRadius: 100,
      backgroundColor: "#7049b3",
      overflow: "hidden"
    };
    return isSelected ? containerStyle : {};
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
            height: 30,
            width: 30,
            marginLeft: 4,
            marginRight: 4,
            alignItems: "center",
            justifyContent: "center"
          },
          this.getBackgroundStyle(isSelected)
        ]}
      >
        <Text
          style={[
            {
              textAlignVertical: "center",
              textAlign: "center",
              color: isSelected ? "white" : "black"
            }
          ]}
        >
          {value}
        </Text>
      </TouchableOpacity>
    );
  }
}
