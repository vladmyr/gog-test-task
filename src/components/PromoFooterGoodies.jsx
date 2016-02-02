import React from "react";

export const PromoFooterGoodies = React.createClass({
  render(){
    return <div className="promo-goodies">
      <div className="text-center footer-title-preset">
        <div><span className="title-span">Goodies available for free with {this.props.title}</span></div>
      </div>
      <ul className="goodies-list list-unstyled">
        {this.props.goodies.map((item, key) => {
          return <li className="col-md-4 col-sm-6 col-xs-12 text-center" key={key}>
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