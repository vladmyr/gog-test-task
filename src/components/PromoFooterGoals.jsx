import React from "react";

export const PromoFooterGoals = React.createClass({
  format(value) {
    let minChunks = 2;
    let chunkLength = 3;
    let digits = 0;
    let chunks = Math.ceil(String(value).length / chunkLength);
    let tmp;
    let formatted = [];

    chunks < 2 && (chunks = minChunks);
    digits = chunkLength * chunks;

    tmp = (Array(digits).join("0") + value).slice(-1 * digits);

    for(let i = 0; i < digits; i += chunkLength){
      formatted.push(tmp.slice(i, i + chunkLength));
    }

    return formatted.join(".");
  },
  render() {
    return <div className="promo-goals">
      <div className="text-center footer-title-preset">
        <span>Games sold so far</span>
      </div>
      <div className="promo-goals-counter">
        {this.format(this.props.totalSold).split("").map((i) => {
          return i === "."
            ? <div className="goal-counter-dot"></div>
            : <div className="goal-counter-digit"><span>{i}</span></div>
        })}
      </div>
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