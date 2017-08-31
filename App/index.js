import React from "react";
import DefaultShare from "./DefaultShare";
import SimpleShare from "./SimpleShare";
import Test from "./Test";
import NotificationAlarm from "./NotificationAlarm";
import { StackNavigator } from "react-navigation";
import { View, StatusBar } from "react-native";
import { Provider } from "react-redux";
import configureStore from "./store";

const AppContent = StackNavigator({
  Home: { screen: NotificationAlarm }
});
const App = () =>
  <View style={{ flex: 1 }}>
    <StatusBar backgroundColor="#175e65" barStyle="light-content" />
    <AppContent />
  </View>;
const ReduxApp = () =>
  <Provider store={configureStore()}>
    <App />
  </Provider>;
export default ReduxApp;
