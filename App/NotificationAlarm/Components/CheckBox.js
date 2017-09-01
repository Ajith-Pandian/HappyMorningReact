import React, { Component } from "react";
import { TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const UNCHECKED = (
  <Icon name="check-box-outline-blank" size={30} color="#49b1b2" />
);
const CHECKED = <Icon name="check-box" size={30} color="#49b1b2" />;

export default class CheckBox extends Component {
  state = { isChecked: this.props.value };
  render() {
    let { isChecked } = this.state;
    let { name, onValueChange } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.3}
        onPress={() => {
          this.setState(
            prevState => {
              return { isChecked: !prevState.isChecked };
            },
            () => onValueChange(this.state.isChecked)
          );
        }}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        {isChecked ? CHECKED : UNCHECKED}
        <Text>
          {name}
        </Text>
      </TouchableOpacity>
    );
  }
}
