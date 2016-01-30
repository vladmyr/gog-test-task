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
    return <div>
      <button onClick={() => {this.props.timerCountdown()}}>Timer countdown</button>
      <button onClick={() => {this.props.timerPause()}}>Timer pause</button>
      <h3>Pay what you want for the <b>{this.props.title}</b> (${this.props.price.total} value!)</h3>
      <ul>
        {this.props.features.map((item, key) => {
          return <li key={key}><i className={item.icon}></i>{item.text}</li>
        })}
      </ul>
      <PromoHeaderTimer {...this.props} />
    </div>
  }
});