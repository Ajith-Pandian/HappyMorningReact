import "./ReactotronConfig";
import React, { Component } from "react";
import { View, StatusBar, AsyncStorage } from "react-native";
import { StackNavigator, addNavigationHelpers } from "react-navigation";
import { connect, Provider } from "react-redux";
import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, autoRehydrate } from "redux-persist";
import thunk from "redux-thunk";
import logger from "redux-logger";

import DefaultShare from "./DefaultShare";
import SimpleShare from "./SimpleShare";
import Test from "./Test";
import NotificationAlarm from "./NotificationAlarm";
import HappyScreen from "./HappyScreen";

import getStore from "./store";
import NavigatorService from "./NavigatorService";
const AppContentNavigator = StackNavigator({
  Home: { screen: NotificationAlarm },
  HappyScreen: { screen: HappyScreen }
});

class AppNavigator extends Component {
  componentDidMount() {
    NavigatorService.setContainer(this.navigator);
  }

  render() {
    return (
      <AppContentNavigator
        ref={navigatorRef => {
          this.navigator = navigatorRef;
        }}
      />
    );
  }
}
const initialState = AppContentNavigator.router.getStateForAction(
  AppContentNavigator.router.getActionForPathAndParams("Home")
);

navReducer = (state = initialState, action) => {
  const nextState = AppContentNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

let store = getStore(navReducer);

persistStore(store, { storage: AsyncStorage, blacklist: ["nav"] }, () => {
  console.log("Rehydration Completed");
});

const AppWithNavigationState = ({ dispatch, nav }) =>
  <AppNavigator
    navigation={addNavigationHelpers({
      dispatch,
      state: nav
    })}
  />;

const ConnectedApp = connect(state => ({
  nav: state.nav
}))(AppWithNavigationState);

const App = () =>
  <View style={{ flex: 1 }}>
    <StatusBar backgroundColor="#175e65" barStyle="light-content" />
    <ConnectedApp />
  </View>;

const ReduxApp = () =>
  <Provider store={store}>
    <App />
  </Provider>;

export default ReduxApp;
