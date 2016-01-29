import {Map} from "immutable";
import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";

import promoReducer from "../reducers/promo";

const createStoreWIthMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore);

export default function configureStore(initialState = Map()) {
  const store = createStoreWIthMiddleware(promoReducer, initialState);

  if (module.hot) {
    // enables hot module replacement for reducers
    module.hot.accept("../reducers/promo", () => {
      const nextReducer = require("../reducers/promo");
      store.replaceReducer(nextReducer);
    })
  }

  return store;
}