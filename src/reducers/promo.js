import {List, Map, fromJS} from "immutable";
import moment from "moment";

import * as promoActions from "../actions/promo";

/**
 * Initialize / reset state to default values
 * @param   {Immutable.Map} state
 * @returns {Immutable.Map}
 */
function initPromo(state = Map()){
  return fromJS({
    promo: {
      title: undefined,
      endDateTime: moment().unix() * 1000,
      isTimerEnabled: true,
      totalSold: 0,
      goals: [],
      goalActiveSlider: 0,
      features: [],
      goodies: [],
      items: [],
      price: {
        total: 0,
        min: 0,
        max: 0,
        current: 0
      }
    }
  });
}

/**
 * Set / update promo state
 * @param   {Immutable.Map}         state
 * @param   {Immutable.Map|Object}  promo
 * @returns {Immutable.Map}
 */
function setPromo(state = Map(), promo = Map()) {
  return state.mergeDeepIn(["promo"], fromJS(promo));
}

/**
 * Set / update promo item
 * @param   {Immutable.Map}         state
 * @param   {Number}                index
 * @param   {Immutable.Map|Object}  item
 * @return  {Immutable.Map}
 */
function updatePromoItem(state = Map(), index = 0, item = Map()) {
  switch (index < state.getIn(["promo", "items"]).size){
    case true:
      return state.mergeDeepIn(["promo", "items", index], fromJS(item));
    default:
      return state;
  }
}

/**
 * Set / update current price point
 * @param   {Immutable.Map} state
 * @param   {Number}        value
 * @returns {Immutable.Map}
 */
function setPriceCurrent(state = Map(), value = 0){
  if(value < state.getIn(["promo", "price", "min"]) || value > state.getIn(["promo", "price", "max"])) {
    // price is out of range - skip
    return state;
  } else {
    // set new current price point
    return state.setIn(["promo", "price", "current"], value);
  }
}

/**
 * Update unlocked items from promo bundle
 * @param   {Immutable.Map} state
 * @returns {Immutable.Map} state
 */
function updateUnlockedItems(state = Map()) {
  let current = state.getIn(["promo", "price", "current"]);

  return state.getIn(["promo", "items"]).reduce(function(state, item, index){
    return state.setIn(["promo", "items", index, "isUnlocked"], item.getIn(["price", "promo"]) <= current);
  }, state);
}

/**
 * User checkout action handler
 * @param   {Immutable.Map} state
 * @returns {Immutable.Map} state
 */
function bundleCheckout(state) {
  let current = state.getIn(["promo", "price", "current"]);
  let amount = 0;

  // get amount of games to purchase
  state.getIn(["promo", "items"]).map(function(item){
    (item.getIn(["price", "promo"]) <= current) && (++amount);
  });

  // update totalSold property
  return state.updateIn(["promo", "totalSold"], (total) => {
    return total + amount;
  })
}

/**
 * Start / resume timer
 * @param   {Immutable.Map} state
 * @param   {Boolean}       toggle
 * @returns {Immutable.Map}
 */
function toggleTimer(state = Map(), toggle) {
  return state.setIn(["promo", "isTimerEnabled"], toggle);
}

/**
 * Promo reducer
 * @param   {Immutable.Map} state
 * @param   {Object}        action
 * @returns {Immutable.Map}
 */
export default (state = Map(), action = {}) => {
  switch(action.type){
    case promoActions.INIT_PROMO:
      return updateUnlockedItems(initPromo(state));
    case promoActions.SET_PROMO:
      return updateUnlockedItems(setPromo(state, action.promo));
    case promoActions.SET_PRICE_CURRENT:
      return updateUnlockedItems(setPriceCurrent(state, action.value));
    case promoActions.UPDATE_PROMO_ITEM:
      return updatePromoItem(state, action.index, action.item);
    case promoActions.TIMER_COUNTDOWN:
      return toggleTimer(state, true);
    case promoActions.TIMER_PAUSE:
      return toggleTimer(state, false);
    case promoActions.BUNDLE_CHECKOUT:
      return bundleCheckout(state);
    default:
      return state;
  }
}