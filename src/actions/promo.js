import {Map, List} from "immutable";

export const INIT_PROMO = "INIT_PROMO";
export const SET_PROMO = "SET_PROMO";
export const SET_TIME_LEFT = "SET_TIME_LEFT";
export const SET_PRICE_CURRENT = "SET_PRICE_CURRENT";
export const UPDATE_PROMO_ITEM = "UPDATE_PROMO_ITEM";
export const UPDATE_SOLD_AMOUNT = "UPDATE_SOLD_AMOUNT";
export const UI_SLIDER_BTN_CLICK = "UI_SLIDER_BTN_CLICK";

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
 * Action creator. Set the time left
 * @param {Number} timeLeft
 */
export function setTimeLeft(timeLeft = 0) {
  return {
    type: SET_TIME_LEFT,
    timeLeft: timeLeft
  }
}

/**
 * Action creator. Update promo item state
 * @param   {Object|Immutable.Map} item
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