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
      isUnlocked: React.PropTypes.bool.isRequired,
      unlock: React.PropTypes.shape({
        text: React.PropTypes.string.isRequired,
        includePrice: React.PropTypes.bool.isRequired
      }).isRequired
    }).isRequired,
    isFirst: React.PropTypes.bool.isRequired,
    isLast: React.PropTypes.bool.isRequired,
    isNextUnlocked: React.PropTypes.bool.isRequired
  },
  getProductBackground(){
    return {
      backgroundImage: "url(\"" + this.props.item.img.bg + "\")"
    }
  },
  render() {
    return <div className={"bundle__product-container " + (this.props.isFirst ? "" : "bundle__product-container--bg-shift-top")} style={this.getProductBackground()}>
      <div className="bundle__product-description">
        <div className="bundle__product-logo">
          <img src={this.props.item.isUnlocked
            ? this.props.item.img.logo.active
            : this.props.item.img.logo.inactive} />
        </div>
        <div className="bundle__product-details">
          <p className="text-center">
            <span className="font-light"><a className="product-details__link" href="#">{this.props.item.title}</a> (normal price ${this.props.item.price.standard})</span>
            <br/>
            <span className="font-normal">with {this.props.item.goodiesAmount} goodies and {this.props.item.languagesAmount} language versions</span>
          </p>
        </div>
        <div className="bundle__product-unlocked text-center">
          <i className={"icons-notification " + (this.props.item.isUnlocked ? "icons-notification-success" : "icons-notification-error") }></i>
          <span className={this.props.item.isUnlocked ? "bundle__product-unlocked--is-unlocked" : null}>
            <span className="font-light">{this.props.item.unlock.text}</span>&nbsp;
            {this.props.item.unlock.includePrice
              ? <span className="font-normal">(from ${this.props.item.price.promo})</span>
              : null}

          </span>
        </div>
      </div>
      {this.props.isLast
        ? null
        : <div className="bundle__product-plus">{this.props.isNextUnlocked
          ? <i className="icons-plus"></i>
          : null}</div>}
    </div>
  }
});