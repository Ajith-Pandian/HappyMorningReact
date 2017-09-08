//import Reactotron from "reactotron-react-native";
import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, autoRehydrate } from "redux-persist";
import { AsyncStorage } from "react-native";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducers from "./Reducers";

const store = createStore(
  reducers,
  {},
  compose(applyMiddleware(thunk, logger), autoRehydrate(true))
);

// persistStore(configureStore, { storage: AsyncStorage }, () => {
//   console.log("rehydration complete");
// });
persistStore(store, { storage: AsyncStorage });
export default store;
