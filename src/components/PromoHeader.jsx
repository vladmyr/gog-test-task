import React from "react";

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
    timeLeft: React.PropTypes.number.isRequired
  },
  render() {
    return <div>
      <h3>Pay what you want for the <b>{this.props.title}</b> (${this.props.price.total} value!)</h3>
      <ul>
        {this.props.features.map((item, key) => {
          return <li key={key}><i className={item.icon}></i>{item.text}</li>
        })}
      </ul>
      <div>
        <i className="icon-time"></i><span>Only <b>{this.props.timeLeft}</b> left</span>
      </div>
    </div>
  }
});