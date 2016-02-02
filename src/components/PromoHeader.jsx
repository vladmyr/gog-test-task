import React from "react";
import {connect} from "react-redux";

import {PromoHeaderTimer} from "./PromoHeaderTimer";

export const PromoHeader = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    features: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        icon: React.PropTypes.string.isRequired,
        text: React.PropTypes.string.isRequired
      }).isRequired
    ),
    price: React.PropTypes.shape({
      total: React.PropTypes.number.isRequired
    }).isRequired,
    endDateTime: React.PropTypes.number.isRequired,
    isTimerEnabled: React.PropTypes.bool.isRequired
  },
  render() {
    return <div className="header">
      <div className="header__in">
        <h3 className="header__title text-center font-light">Pay what you want for the <span className="font-normal">{this.props.title}</span> (${this.props.price.total} value!)</h3>
      </div>
      <div className="header-info">
        <PromoHeaderTimer {...this.props} />
        <ul className="header-info__feature list-unstyled list-inline">
          {this.props.features.map((item, key) => {
            return <li key={key}><i className={"font-light icons-feature icons-feature-" + item.icon}></i>{item.text}</li>
          })}
        </ul>
      </div>
    </div>
  }

  //<button onClick={() => {this.props.timerCountdown()}}>Timer countdown</button>
  //<button onClick={() => {this.props.timerPause()}}>Timer pause</button>
});