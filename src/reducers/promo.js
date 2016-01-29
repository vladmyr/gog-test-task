import {List, Map, fromJS} from "immutable";

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
      timeLeft: 0,
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

function log(state, action) {
  console.warn("#### ACTION ####\n", action);
  console.warn("#### STATE ####\n", state.toJS());
  return state;
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
      return log(initPromo(state), action);
    case promoActions.SET_PROMO:
      return log(setPromo(state, action.promo), action);
    case promoActions.UPDATE_PROMO_ITEM:
      return log(updatePromoItem(state, action.index, action.item), action);
    default:
      return log(state, action);
  }
}