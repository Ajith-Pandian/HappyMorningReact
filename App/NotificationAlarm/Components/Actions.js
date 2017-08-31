import React, { Component } from "react";
import { View } from "react-native";
import CheckBox from "./CheckBox";
import DeleteButton from "./DeleteButton";
import { deleteAlarm } from "../../Actions/AlarmActions";
import { connect } from "react-redux";

const Actions = ({ onDelete }) => {
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
        name="Repeat"
        onValueChange={value => console.log("Repeat " + value)}
      />
      <CheckBox
        style={{ flex: 33 }}
        name="Vibrate"
        onValueChange={value => console.log("Vibrate " + value)}
      />
      <DeleteButton onPress={() => onDelete()} style={{ flex: 33 }} />
    </View>
  );
};

export default connect()(Actions);
