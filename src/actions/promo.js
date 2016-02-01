import {Map, List} from "immutable";

export const INIT_PROMO = "INIT_PROMO";
export const SET_PROMO = "SET_PROMO";
export const SET_PRICE_CURRENT = "SET_PRICE_CURRENT";
export const BUNDLE_CHECKOUT = "BUNDLE_CHECKOUT";
export const UPDATE_PROMO_ITEM = "UPDATE_PROMO_ITEM";
export const UPDATE_SOLD_AMOUNT = "UPDATE_SOLD_AMOUNT";
export const UI_SLIDER_BTN_CLICK = "UI_SLIDER_BTN_CLICK";
export const TIMER_SET_DURATION = "TIMER_SET_DURATION";
export const TIMER_COUNTDOWN = "TIMER_COUNTDOWN";
export const TIMER_PAUSE = "TIMER_PAUSE";

/**
 * Action creator. Initialize promo
 * @returns {Object}
 */
export function initPromo(){
  return {
    type: INIT_PROMO
  }
}

/**
 * Action creator. Update promo properties
 * @param   {Object|Immutable.Map} promo
 * @returns {Object}
 */
export function setPromo(promo) {
  return {
    type: SET_PROMO,
    promo: promo
  }
}

/**
 * Action creator. Update promo item state
 * @param   {Number}                index
 * @param   {Object|Immutable.Map}  item
 * @returns {Object}
 */
export function updatePromoItem(index, item) {
  return {
    type: UPDATE_PROMO_ITEM,
    index: index,
    item: item
  }
}

/**
 * Action creator. Set current price
 * @param   {Number} value
 * @returns {Object}
 */
export function setPriceCurrent(value = 0) {
  return {
    type: SET_PRICE_CURRENT,
    value: value
  }
}

/**
 * Action creator. Increase the amount of sold copies by delta value
 * @param   {Number} delta
 * @returns {Object}
 */
export function updateSoldAmount(delta = 0) {
  return {
    type: UPDATE_SOLD_AMOUNT,
    delta: delta
  }
}

/**
 * Action creator. Set active slider item
 * @param   {Number} index
 * @returns {Object}
 */
export function uiSliderBtnClick(index = 0) {
  return {
    type: UI_SLIDER_BTN_CLICK,
    index: index
  }
}

/**
 * Action creator. Set the time left
 * @param {Number} duration
 */
export function timerSetDuration(duration = 0) {
  return {
    type: TIMER_SET_DURATION,
    duration: duration
  }
}

/**
 * Action creator. Start timer countdown
 * @returns {Object}
 */
export function timerCountdown() {
  return {
    type: TIMER_COUNTDOWN
  }
}

/**
 * Action creator. Pause timer countdown
 * @returns {Object}
 */
export function timerPause() {
  return {
    type: TIMER_PAUSE
  }
}

/**
 * Action creator. Handle checkout action
 * @return {Object}
 */
export function bundleCheckout() {
  return {
    type: BUNDLE_CHECKOUT
  }
}