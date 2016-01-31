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
      <h3 className="header-title text-center font-light">Pay what you want for the <strong>{this.props.title}</strong> (${this.props.price.total} value!)</h3>
      <div className="header-info">
        <ul className="features-list list-unstyled list-inline">
          {this.props.features.map((item, key) => {
            return <li key={key}><i className={"icons-feature icons-feature-" + item.icon}></i>{item.text}</li>
          })}
        </ul>
        <PromoHeaderTimer {...this.props} />
      </div>
    </div>
  }

  //<button onClick={() => {this.props.timerCountdown()}}>Timer countdown</button>
  //<button onClick={() => {this.props.timerPause()}}>Timer pause</button>
});