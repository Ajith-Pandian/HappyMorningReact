import Reactotron from "reactotron-react-native";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducers from "./Reducers";

const configureStore = () =>
  Reactotron.createStore(reducers, applyMiddleware(thunk, logger));

export default configureStore;
