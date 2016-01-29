import React from "react";

export const PromoFooterGoals = React.createClass({
  formatSoldAmount(amount) {
    return amount;
  },
  render() {
    return <div className="promo-goals">
      <div>Games sold so far</div>
      <div className="promo-goals-counter">{this.formatSoldAmount(this.props.totalSold)}</div>
      <ul>
        {this.props.goals.map((item, key) => {
          return <li key={key}>
            <strong>Reach {item.amount}...</strong>
            <span>{item.description}</span>
          </li>
        })}
      </ul>
    </div>
  }
});