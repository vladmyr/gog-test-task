import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Router, Route} from "react-router";

import configureStore from "./store/configureStore";
import * as promoActions from "./actions/promo";
import App from "./components/App";
import {Promo} from "./components/promo";

const store = configureStore(promoActions.initPromo());

//const store = configureStore(Map());
const routes = <Route component={App}>
    <Route path="/" component={Promo}/>
</Route>;

ReactDOM.render(
  <Provider store={store}>
      <Router>{routes}</Router>
  </Provider>,
  document.getElementById("app")
);
//const store = configureStore(Map());
//store.dispatch(promoActions.initPromo());