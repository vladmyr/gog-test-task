import React from "react";

export const PromoFooterGoodies = React.createClass({
  render(){
    return <div className="promo-goodies">
      <div className="text-center footer-title-preset">
        <span>Goodies available for free with {this.props.title}</span>
      </div>
      <ul className="goodies-list list-unstyled list-inline">
        {this.props.goodies.map((item, key) => {
          return <li className="col-md-4 text-center" key={key}>
            <i className={"icons-goodie icons-goodie-" + item.icon}></i>
            <div>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </div>
          </li>
        })}
      </ul>
    </div>
  }
});