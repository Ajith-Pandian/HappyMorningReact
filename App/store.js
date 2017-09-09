//import Reactotron from "reactotron-react-native";
import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, autoRehydrate } from "redux-persist";
import { AsyncStorage } from "react-native";
import thunk from "redux-thunk";
import logger from "redux-logger";
import getRootReducer from "./Reducers";

const getStore = navReducer =>
  createStore(
    getRootReducer(navReducer),
    {},
    compose(applyMiddleware(thunk, logger), autoRehydrate(true))
  );

export default getStore;
