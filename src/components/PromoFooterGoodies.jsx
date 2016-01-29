import React from "react";

export const PromoFooterGoodies = React.createClass({
  render(){
    return <div className="promo-goodies">
      <div>Goodies available for free with {this.props.title}</div>
      <ul>
        {this.props.goodies.map((item, key) => {
          return <li key={key}>
            <i className={item.icon}></i>
            <strong>{item.title}</strong>
            <p>{item.description}</p>
          </li>
        })}
      </ul>
    </div>
  }
});