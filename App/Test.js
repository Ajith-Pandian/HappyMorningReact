import React, { Component } from "react";
import { View, Text, PanResponder } from "react-native";

let initialState = { grant: false, move: false };

class Test extends Component {
  state = initialState;
  constructor() {
    super();
  }
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        console.log("onPanResponderGrant");
        this.setState({ grant: true });
        console.log(gestureState);
        return true;
      },
      onPanResponderMove: (evt, gestureState) => {
        console.log("onPanResponderMove");
        console.log(gestureState.dx + " " + gestureState.dy); //x and y difference from last touch point
        let { dx, dy } = gestureState;
        this.setState({ move: dx === 0 && dy === 0 ? false : true });
        return true;
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        console.log("onPanResponderRelease");

        let { grant, move } = this.state;
        if (grant && !move) console.log("Clicked");

        this.setState(initialState);
        return true;
      },
      onPanResponderTerminate: (evt, gestureState) => {
        console.log("onPanResponderTerminate");

        return true;
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        console.log("onShouldBlockNativeResponder");
        return true;
      }
    });
  }
  render() {
    return (
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        {...this._panResponder.panHandlers}
      >
        <View
          style={{
            height: 80,
            width: 200,
            backgroundColor: "green",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ color: "white" }}>Touch Me..!!!</Text>
        </View>
      </View>
    );
  }
}
Test.navigationOptions = {
  header: "Test"
};
export default Test;
