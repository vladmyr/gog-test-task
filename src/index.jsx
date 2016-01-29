import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Router, Route} from "react-router";
import {Map} from "immutable";

import configureStore from "./store/configureStore";
import * as promoActions from "./actions/promo";
import App from "./components/App";
import {PromoContainer} from "./components/promo";

// promo initial state
const promo = {
  title: "Divine Divinity",
  timeLeft: 26,
  totalSold: 13853,
  features: [{
    icon: "heart",
    text: "Support Larian Studio"
  }, {
    icon: "mouse",
    text: "Play Divinity 2: DC before release"
  }, {
    icon: "drm",
    text: "Get DRM-free games with goodies"
  }],
  items: [{
    title: "Divine Divinity",
    url: "",
    img: {
      logo: {
        active: "",
        inactive: ""
      },
      bg: ""
    },
    price: {
      standard: 5.99,
      promo: 0
    },
    languagesAmount: 4,
    goodiesAmount: 4,
    isUnlocked: true
  }, {
    title: "Beyond Divinity",
    url: "",
    img: {
      logo: {
        active: "",
        inactive: ""
      },
      bg: ""
    },
    price: {
      standard: 5.99,
      promo: 7.67
    },
    languagesAmount: 4,
    goodiesAmount: 6,
    isUnlocked: false
  }, {
    title: "Divinity II Developer's cut",
    url: "",
    img: {
      logo: {
        active: "",
        inactive: ""
      },
      bg: ""
    },
    price: {
      standard: 19.99,
      promo: 18.31
    },
    languagesAmount: 7,
    goodiesAmount: 9,
    isUnlocked: false
  }],
  goals: [{
    amount: 10000,
    percentage: 0,
    img: "",
    description: "... [10000] to unlock exclusive, never before seen, trailer from Divinity: Original Sin"
  }, {
    amount: 25000,
    percentage: 0,
    img: "",
    description: "...[25000] to unlock exclusive, never before seen, trailer from Divinity: Original Sin"
  }, {
    amount: 50000,
    percentage: 0,
    img: "",
    description: "...[50000] to unlock exclusive, never before seen, trailer from Divinity: Original Sin"
  }, {
    amount: 80000,
    percentage: 0,
    img: "",
    description: "...[80000] to unlock exclusive, never before seen, trailer from Divinity: Original Sin"
  }, {
    amount: 120000,
    percentage: 0,
    img: "",
    description: "...[120000] to unlock exclusive, never before seen, trailer from Divinity: Original Sin"
  }],
  goalActiveSlider: 0,
  price: {
    total: 32,
    min: 1.99,
    max: 49.99,
    current: 7.34
  }
};

const store = configureStore(Map());
store.dispatch(promoActions.initPromo(promo));
store.dispatch(promoActions.setPromo(promo));

const routes = <Route component={App}>
    <Route path="/" component={PromoContainer}/>
</Route>;

ReactDOM.render(
  <Provider store={store}>
      <Router>{routes}</Router>
  </Provider>,
  document.getElementById("app")
);
//const store = configureStore(Map());
//store.dispatch(promoActions.initPromo());