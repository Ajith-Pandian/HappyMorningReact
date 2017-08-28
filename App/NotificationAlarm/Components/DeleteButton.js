import React, { Component } from "react";
import { TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const DeleteButton = ({ onPress }) =>
  <TouchableOpacity
    activeOpacity={0.3}
    onPress={() => onPress()}
    style={{ flexDirection: "row", alignItems: "center" }}
  >
    <Icon name="delete" size={30} color="#49b1b2" />
    <Text>Delete</Text>
  </TouchableOpacity>;
export default DeleteButton;
