import React from "react"

import {PromoBundleItem} from "./PromoBundleItem";
import {PromoBundleSlider} from "./PromoBundleSlider";

export const PromoBundle = React.createClass({
  propTypes: {
    items: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        title: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired,
        img: React.PropTypes.shape({
          logo: React.PropTypes.shape({
            active: React.PropTypes.string.isRequired,
            inactive: React.PropTypes.string.isRequired
          })
        }),
        price: React.PropTypes.shape({
          standard: React.PropTypes.number.isRequired,
          promo: React.PropTypes.number.isRequired
        }),
        goodiesAmount: React.PropTypes.number.isRequired,
        languagesAmount: React.PropTypes.number.isRequired,
        isUnlocked: React.PropTypes.bool.isRequired
      }).isRequired
    ),
    price: React.PropTypes.shape({
      current: React.PropTypes.number.isRequired,
      min: React.PropTypes.number.isRequired,
      max: React.PropTypes.number.isRequired
    }).isRequired
  },
  render() {
    return <div className="bundle-container">
      {this.props.items.map((item, key) => {
        return <PromoBundleItem item={item} key={key} />
      })}
      <PromoBundleSlider {...this.props} />
    </div>
  }
});