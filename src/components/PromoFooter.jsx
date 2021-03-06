import React from "react";

import {PromoFooterGoodies} from "./PromoFooterGoodies";
import {PromoFooterGoals} from "./PromoFooterGoals";

export const PromoFooter = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    totalSold: React.PropTypes.number.isRequired,
    goalActiveSlider: React.PropTypes.number.isRequired,
    goals: React.PropTypes.arrayOf(React.PropTypes.shape({
      amount: React.PropTypes.number.isRequired,
      img: React.PropTypes.string.isRequired,
      description: React.PropTypes.string.isRequired
    })).isRequired,
    goodies: React.PropTypes.arrayOf(React.PropTypes.shape({
      icon: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      description: React.PropTypes.string.isRequired
    })).isRequired
  },
  render(){
    return <div className="footer">
      <div className="col-md-7">
        <PromoFooterGoodies {...this.props} />
      </div>
      <div className="col-md-5">
        <PromoFooterGoals {...this.props} />
      </div>
    </div>
  }
});