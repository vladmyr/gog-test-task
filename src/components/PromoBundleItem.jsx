import React from "react";

export const PromoBundleItem = React.createClass({
  propTypes: {
    item: React.PropTypes.shape({
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
        promo: React.PropTypes.number.isRequired,
        promoText: React.PropTypes.string
      }),
      goodiesAmount: React.PropTypes.number.isRequired,
      languagesAmount: React.PropTypes.number.isRequired,
      isUnlocked: React.PropTypes.bool.isRequired
    }).isRequired
  },
  render() {
    return <div className="product">
      <div className="product-logo">

      </div>
      <div className="product-details">
        <div className="product-details">
          <a className="product-details__link" href="#">{this.props.item.title}</a> (normal price ${this.props.item.price.standard})
        </div>
        <strong>with {this.props.item.goodiesAmount} and {this.props.item.languagesAmount} language versions</strong>
        <div className="product-details">
          <i className="icon-checked"></i>
          <span>{this.props.item.price.promoText}<strong>(from ${this.props.item.price.promo})</strong></span>
        </div>
      </div>
    </div>
  }
});