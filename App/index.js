import React from "react";
import DefaultShare from "./DefaultShare";
import SimpleShare from "./SimpleShare";
import Test from "./Test";
import NotificationAlarm from "./NotificationAlarm";
import { StackNavigator } from "react-navigation";
import { View, StatusBar } from "react-native";

const AppContent = StackNavigator({
  Home: { screen: NotificationAlarm }
});
const App = () =>
  <View style={{ flex: 1 }}>
    <StatusBar backgroundColor="#175e65" barStyle="light-content" />
    <AppContent />
  </View>;
export default App;
