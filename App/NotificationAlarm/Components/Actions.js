import React, { Component } from "react";
import { View } from "react-native";
import CheckBox from "./CheckBox";
import DeleteButton from "./DeleteButton";
import { deleteAlarm } from "../../Actions/AlarmActions";
import { connect } from "react-redux";

const Actions = ({
  onDelete,
  onRepeatChange,
  onVibrateChange,
  isRepeat,
  isVibrate
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        margin: 4
      }}
    >
      <CheckBox
        style={{ flex: 33 }}
        value={isRepeat}
        name="Repeat"
        onValueChange={value => onRepeatChange(value)}
      />
      <CheckBox
        style={{ flex: 33 }}
        value={isVibrate}
        name="Vibrate"
        onValueChange={value => onVibrateChange(value)}
      />
      <DeleteButton onPress={() => onDelete()} style={{ flex: 33 }} />
    </View>
  );
};

export default connect()(Actions);
