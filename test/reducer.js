import {List, Map, fromJS} from "immutable";
import moment from "moment";
import {expect} from "chai";
import * as _ from "underscore";

import promoReducer from "../src/reducers/promo";
import * as promoActions from "../src/actions/promo";

const INITIAL_STATE = {
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
};
const TEST_STATE = {
  promo: {
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
    goodies: [{
      icon: "",
      title: "",
      description: ""
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
  }
};
const INITIAL_STATE_IMMUTABLE = fromJS(INITIAL_STATE);
const TEST_STATE_IMMUTABLE = fromJS(TEST_STATE);

describe("promo reducer", () => {
  describe("initPromo", () => {
    it("initializes undefined state with default values", () => {
      const nextState = promoReducer(undefined, promoActions.initPromo());

      expect(nextState).to.equal(INITIAL_STATE_IMMUTABLE);
    });

    it("initializes empty state with default values", () => {
      const state = Map();
      const nextState = promoReducer(state, promoActions.initPromo());

      expect(nextState).to.equal(INITIAL_STATE_IMMUTABLE);
    });

    it("resets state to default values", () => {
      const nextState = promoReducer(TEST_STATE_IMMUTABLE, promoActions.initPromo());

      expect(nextState).to.equal(INITIAL_STATE_IMMUTABLE);
    });
  });

  describe("setPromo", () => {
    it("sets properties", () => {
      const promo = {
        title: "Divinity Bundle",
        timeLeft: 127
      };
      const nextState = promoReducer(INITIAL_STATE_IMMUTABLE, promoActions.setPromo(promo));

      expect(nextState).to.equal(fromJS({
        promo: {
          title: "Divinity Bundle",
          timeLeft: 127,
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
      }));
    });

    it("sets nested properties", () => {
      const promo = {
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
        }],
        price: {
          total: 32,
          min: 1.99,
          max: 39.99
        }
      };
      const nextState = promoReducer(INITIAL_STATE_IMMUTABLE, promoActions.setPromo(promo));

      expect(nextState).to.equal(fromJS({
        promo: {
          title: undefined,
          timeLeft: 0,
          totalSold: 0,
          goals: [],
          goalActiveSlider: 0,
          features: [],
          goodies: [],
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
          }],
          price: {
            total: 32,
            min: 1.99,
            max: 39.99,
            current: 0
          }
        }
      }));
    });
  });

  describe("updateItem", () => {
    it("does it's job", () => {
      const item = {
        title: "(*) Divine Divinity",
        url: "(*) ",
        img: {
          logo: {
            active: "",
            inactive: ""
          },
          bg: ""
        },
        price: {
          standard: 15.99,
          promo: 13.99
        },
        languagesAmount: 7,
        goodiesAmount: 8,
        isUnlocked: false
      };

      const newState = promoReducer(
        TEST_STATE_IMMUTABLE,
        promoActions.updatePromoItem(0, item));

      expect(newState).to.equal(fromJS({
        promo: {
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
            title: "(*) Divine Divinity",
            url: "(*) ",
            img: {
              logo: {
                active: "",
                inactive: ""
              },
              bg: ""
            },
            price: {
              standard: 15.99,
              promo: 13.99
            },
            languagesAmount: 7,
            goodiesAmount: 8,
            isUnlocked: false
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
        }
      }));
    });
  });
});