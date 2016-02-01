import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Router, Route} from "react-router";
import {Map} from "immutable";
import moment from "moment";

import configureStore from "./store/configureStore";
import * as promoActions from "./actions/promo";
import App from "./components/App";
import {PromoContainer} from "./components/promo";

// promo initial state
const promo = {
  title: "Divinity Bundle",
  endDateTime: moment() // unix timestamp of tomorrow in seconds
    .add(2, "day")
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0)
    .set("millisecond", 0).unix(),
  isTimerEnabled: true,
  totalSold: 24999,
  features: [{
    icon: "support",
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
        active: "./img/games/divine_divinity.png",
        inactive: "./img/games/divine_divinity_inactive.png"
      },
      bg: "./img/games/bg_divine_divinity.jpg"
    },
    price: {
      standard: 5.99,
      promo: 0
    },
    languagesAmount: 4,
    goodiesAmount: 4,
    isUnlocked: false,
    unlock: {
      text: "Below average",
      textShort: "",
      hasSliderMark: false,
      includePrice: false
    }
  }, {
    title: "Beyond Divinity",
    url: "",
    img: {
      logo: {
        active: "./img/games/beyond_divinity.png",
        inactive: "./img/games/beyond_divinity_inactive.png"
      },
      bg: "./img/games/bg_beyond_divinity.jpg"
    },
    price: {
      standard: 5.99,
      promo: 1.67
      //promo: 9.00
    },
    languagesAmount: 4,
    goodiesAmount: 6,
    isUnlocked: false,
    unlock: {
      text: "Above average",
      textShort: "Average",
      hasSliderMark: true,
      includePrice: true
    }
  }, {
    title: "Divinity II Developer's cut",
    url: "",
    img: {
      logo: {
        active: "./img/games/divinity_2.png",
        inactive: "./img/games/divinity_2_inactive.png"
      },
      bg: "./img/games/bg_divinity_2.jpg"
    },
    price: {
      standard: 19.99,
      promo: 48.31
      //promo: 3.98
    },
    languagesAmount: 7,
    goodiesAmount: 9,
    isUnlocked: false,
    unlock: {
      text: "Top supporter",
      textShort: "Top 10%",
      hasSliderMark: true,
      includePrice: true
    }
  }],
  goodies: [{
    icon: "ost",
    title: "4 soundtracks",
    description: "Over 3 hours of award winning music from all 3 games."
  }, {
    icon: "stories",
    title: "2 short stories",
    description: "Prequel story for Divine Divinity and Beyond Divinity novella."
  }, {
    icon: "book",
    title: "Divinity 2 - Dev Journal",
    description: "144 pages long book, detailing story and art of Divinity 2."
  }, {
    icon: "film",
    title: "Making of Divinity 2",
    description: "40 minutes long, profesional documentary about the development of Divinity 2."
  }, {
    icon: "mac",
    title: "7 wallpapers",
    description: "Beatifull, hand crafted HD wallpepers with Divine, Beyond and Divinity 2 art"
  }, {
    icon: "zip",
    title: "...and more",
    description: "3 manuals, 56 artworks, 5 avatars, Beyond Divinity game-guide."
  }],
  goals: [{
    amount: 10000,
    img: "./img/goals/goal-thumbnail.jpg",
    description: "...[10000] to unlock exclusive, never before seen, trailer from Divinity: Original Sin"
  }, {
    amount: 25000,
    img: "./img/goals/goal-thumbnail.jpg",
    description: "...[25000] to unlock exclusive, never before seen, trailer from Divinity: Original Sin"
  }, {
    amount: 50000,
    img: "./img/goals/goal-thumbnail.jpg",
    description: "...[50000] to unlock exclusive, never before seen, trailer from Divinity: Original Sin"
  }, {
    amount: 80000,
    img: "./img/goals/goal-thumbnail.jpg",
    description: "...[80000] to unlock exclusive, never before seen, trailer from Divinity: Original Sin"
  }, {
    amount: 120000,
    img: "./img/goals/goal-thumbnail.jpg",
    description: "...[120000] to unlock exclusive, never before seen, trailer from Divinity: Original Sin"
  }],
  goalActiveSlider: 0,
  price: {
    total: 32,
    min: 0.99,
    max: 49.99,
    current: 0.99
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